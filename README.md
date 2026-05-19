# Cloud Engineering Portfolio Lab

A hands-on cloud engineering learning lab built progressively from Linux fundamentals
to containerization, infrastructure as code, and monitoring.

Built entirely on local environment (WSL2 + Docker) — no cloud costs required.

## Phases

### Phase 1 — Linux Sysadmin Lab
Simulates real-world server administration tasks on a fresh Ubuntu server.

Topics covered:
- User & permission management (adduser, chmod, chown)
- SSH hardening — key-based auth, disabled password login, authorized_keys
- Nginx web server — server blocks, sites-available/enabled pattern
- UFW firewall — default-deny policy, explicit allow rules
- Bash scripting — automated initial server setup script

📁 [phase-1/](./phase-1)

---

### Phase 2 — Containerized Web App
A multi-container web application simulating a production-grade deployment.

Stack: Node.js + Nginx (reverse proxy) + PostgreSQL

Topics covered:
- Dockerfile — multi-stage builds, non-root user, layer caching
- Docker CLI — build, run, exec, logs, container lifecycle
- Docker Compose — multi-container orchestration, depends_on, healthcheck
- Security — non-root containers, internal-only database, no unnecessary port exposure

📁 [phase-2/](./phase-2)

---

### Phase 3 — Infrastructure as Code + Monitoring
Automated server configuration and real-time infrastructure monitoring.

Topics covered:
- Ansible — inventory, playbooks, idempotent task execution
- IaC mindset — declarative configuration vs imperative scripting
- Prometheus — metrics scraping from Node Exporter
- Grafana — real-time dashboard for CPU, RAM, disk, and network metrics

📁 [phase-3/](./phase-3)

---

## Architecture Overview
Phase 1: Linux Server
├── Users & Permissions
├── SSH (key-based)
├── Nginx
└── UFW Firewall
Phase 2: Container Stack
├── Nginx (reverse proxy) → port 80
├── Node.js App          → internal only
└── PostgreSQL           → internal only
Phase 3: IaC + Monitoring
├── Ansible → target server provisioning
├── Prometheus → metrics collection
├── Node Exporter → system metrics
└── Grafana → visualization dashboard

## Tech Stack

| Tool | Purpose |
|---|---|
| Ubuntu 22.04 (WSL2) | Local Linux environment |
| Docker + Docker Compose | Containerization |
| Nginx | Web server + reverse proxy |
| PostgreSQL | Database |
| Ansible | Configuration management |
| Prometheus | Metrics collection |
| Grafana | Metrics visualization |

## Environment

- OS: Windows 11 + WSL2 (Ubuntu 22.04)
- RAM: 8GB
- All tools: free and open-source

## Running Each Phase

### Phase 1 — Server setup script
```bash
cd phase-1
sudo bash scripts/server-setup.sh
```

### Phase 2 — Multi-container app
```bash
cd phase-2
docker compose up -d
curl http://localhost
```

### Phase 3 — Monitoring stack
```bash
cd phase-3/monitoring
docker compose up -d
# Grafana: http://localhost:3000 (admin / admin123)
# Prometheus: http://localhost:9090
```

### Phase 3 — Ansible provisioning
```bash
cd phase-3/ansible
ansible-playbook -i inventory.ini playbook.yml
```

## What's Next
- Phase 4: CI/CD Pipeline + LocalStack (AWS simulation)
- Phase 5: Kubernetes (k3s)
