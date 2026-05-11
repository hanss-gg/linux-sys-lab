# User Management

## Commands

| Command | Fungsi |
|---|---|
| `adduser <name>` | Buat user baru |
| `groupadd <name>` | Buat group baru |
| `usermod -aG <group> <user>` | Tambah user ke group |
| `id <user>` | Cek user + group membership |
| `chmod <perm> <file>` | Ubah permission file |
| `chown <user>:<group> <file>` | Ubah owner file |

## Permission Notation
- `chmod 600` = rw------- (owner only)
- `chmod 644` = rw-r--r-- (owner rw, others read)
- `chmod 755` = rwxr-xr-x (owner full, others read+execute)
