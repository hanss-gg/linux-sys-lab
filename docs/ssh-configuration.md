# SSH Configuration

## Key Files
- `/etc/ssh/sshd_config` — konfigurasi SSH server
- `~/.ssh/authorized_keys` — public key yang diizinkan login
- `~/.ssh/id_ed25519.pub` — public key milik user

## Hardening Checklist
- [ ] `PermitRootLogin no`
- [ ] `PasswordAuthentication no`
- [ ] `PubkeyAuthentication yes`

## Commands
| Command | Fungsi |
|---|---|
| `sudo service ssh start` | Start SSH server |
| `sudo service ssh status` | Cek status SSH server |
| `sudo service ssh restart` | Restart setelah ubah config |
| `ssh user@host` | Konek ke server |
