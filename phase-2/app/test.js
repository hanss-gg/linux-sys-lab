const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

// Test 1: Server responds with 200
const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode === 200) {
        console.log('✓ Test passed: Server returns 200');
        process.exit(0);
    } else {
        console.log('✗ Test failed: Expected 200');
        process.exit(1);
    }
});

req.on('error', (err) => {
    console.log('✗ Test failed: Server not running');
    process.exit(1);
});

req.end();
