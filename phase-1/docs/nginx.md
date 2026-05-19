# Nginx Web Server

## Struktur Direktori
- `/etc/nginx/nginx.conf` — config utama
- `/etc/nginx/sites-available/` — semua config site
- `/etc/nginx/sites-enabled/` — symlink ke site yang aktif

## Pattern Aktifasi Site
```bash
# Aktifkan site
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

# Nonaktifkan site
sudo rm /etc/nginx/sites-enabled/mysite

# Test config sebelum restart
sudo nginx -t

# Restart Nginx
sudo service nginx restart
```

## Server Block Minimal
```nginx
server {
    listen 80;
    server_name mysite.local;
    root /var/www/mysite;
    index index.html;
}
```

## Commands
| Command | Fungsi |
|---|---|
| `sudo service nginx start` | Start Nginx |
| `sudo service nginx restart` | Restart setelah ubah config |
| `sudo nginx -t` | Validasi config |
| `curl http://localhost` | Test response |
