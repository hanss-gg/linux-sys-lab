# UFW Firewall

## Konsep
- Default: deny semua traffic masuk
- Rules dibaca dari atas ke bawah, first match wins
- Selalu allow SSH sebelum enable UFW

## Commands
| Command | Fungsi |
|---|---|
| `sudo ufw status numbered` | Lihat rules dengan nomor |
| `sudo ufw allow 22` | Allow port 22 |
| `sudo ufw deny 80` | Deny port 80 |
| `sudo ufw delete 2` | Hapus rule nomor 2 |
| `sudo ufw enable` | Aktifkan firewall |
| `sudo ufw disable` | Nonaktifkan firewall |

## Production Checklist
- [ ] Allow SSH sebelum enable
- [ ] Allow 80 dan 443 untuk web server
- [ ] Deny semua port yang tidak dipakai
- [ ] Loopback traffic tidak diblok UFW

## Perbedaan dengan AWS Security Group
- UFW: first match wins, rules dieksekusi berurutan
- AWS Security Group: semua rules dievaluasi sekaligus
