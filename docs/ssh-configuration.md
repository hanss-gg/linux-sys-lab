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

## Authorized Keys
- Lokasi: `~/.ssh/authorized_keys`
- Permission wajib: `600`
- Isi: public key dari setiap user yang diizinkan login
- Cara tambah akses user baru:
  1. User generate key pair di device mereka
  2. User kirim public key (.pub) ke sysadmin
  3. Sysadmin append public key ke authorized_keys di server

