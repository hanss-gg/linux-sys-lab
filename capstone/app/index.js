const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Pool } = require('pg');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// S3 client pointing ke LocalStack
const s3 = new S3Client({
    region: 'us-east-1',
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    },
    forcePathStyle: true
});

// PostgreSQL connection
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    database: process.env.DB_NAME || 'fileuploader',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123'
});

const BUCKET = process.env.S3_BUCKET || 'uploads';

// Init: buat table kalau belum ada
async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) NOT NULL,
            original_name VARCHAR(255) NOT NULL,
            size INTEGER NOT NULL,
            uploaded_at TIMESTAMP DEFAULT NOW()
        )
    `);
    console.log('[+] Database initialized');
}

// Init: buat S3 bucket kalau belum ada
async function initS3() {
    try {
        const { CreateBucketCommand } = require('@aws-sdk/client-s3');
        await s3.send(new CreateBucketCommand({ Bucket: BUCKET }));
        console.log('[+] S3 bucket created');
    } catch (err) {
        if (err.name === 'BucketAlreadyOwnedByYou') {
            console.log('[+] S3 bucket already exists');
        }
    }
}

// Serve HTML frontend
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Uploader</title>
            <style>
                body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
                h1 { color: #333; }
                form { margin: 20px 0; }
                input[type=file] { margin: 10px 0; }
                button { background: #0070f3; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
                a { color: #0070f3; }
            </style>
        </head>
        <body>
            <h1>File Uploader</h1>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" required>
                <button type="submit">Upload</button>
            </form>
            <h2>Uploaded Files</h2>
            <div id="files">Loading...</div>
            <script>
                fetch('/files')
                    .then(r => r.json())
                    .then(files => {
                        if (files.length === 0) {
                            document.getElementById('files').innerHTML = '<p>No files yet.</p>';
                            return;
                        }
                        const rows = files.map(f => \`
                            <tr>
                                <td>\${f.original_name}</td>
                                <td>\${(f.size / 1024).toFixed(1)} KB</td>
                                <td>\${new Date(f.uploaded_at).toLocaleString()}</td>
                                <td><a href="/download/\${f.filename}">Download</a></td>
                            </tr>
                        \`).join('');
                        document.getElementById('files').innerHTML = \`
                            <table>
                                <tr><th>Name</th><th>Size</th><th>Uploaded</th><th>Action</th></tr>
                                \${rows}
                            </table>
                        \`;
                    });
            </script>
        </body>
        </html>
    `);
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const filename = `${Date.now()}-${file.originalname}`;

        // Upload ke S3
        await s3.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype
        }));

        // Simpan metadata ke PostgreSQL
        await pool.query(
            'INSERT INTO files (filename, original_name, size) VALUES ($1, $2, $3)',
            [filename, file.originalname, file.size]
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Upload failed: ' + err.message);
    }
});

// List files endpoint
app.get('/files', async (req, res) => {
    const result = await pool.query('SELECT * FROM files ORDER BY uploaded_at DESC');
    res.json(result.rows);
});

// Download endpoint
app.get('/download/:filename', async (req, res) => {
    try {
        const { GetObjectCommand } = require('@aws-sdk/client-s3');
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: req.params.filename
        });
        const response = await s3.send(command);
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
        response.Body.pipe(res);
    } catch (err) {
        res.status(404).send('File not found');
    }
});

// Start server
async function start() {
    await initDB();
    await initS3();
    app.listen(3000, () => console.log('[+] Server running on port 3000'));
}

start().catch(console.error);
