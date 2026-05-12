#!/bin/bash

if [ $EUID != 0 ]; then
	echo "[-] Script harus dijalankan sebagai root. Gunakan sudo."
	exit 1
fi

echo "[+] Update & Upgrade"
apt update && apt upgrade -y
echo "[+] Installing Nginx"
apt install nginx -y
echo "[+] Create user webadmin"
useradd -m webadmin

echo "[+] Allow UFW 22, 80, 443"
ufw allow 22
ufw allow 80
ufw allow 443

echo "[+] Enable UFW"
ufw enable


ufw status numbered
service nginx status
