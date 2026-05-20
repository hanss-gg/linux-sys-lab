# Cloud Engineering Portfolio Lab

![CI](https://github.com/hanss-gg/linux-sys-lab/actions/workflows/ci.yml/badge.svg)

A hands-on cloud engineering learning lab built progressively from Linux fundamentals
to containerization, infrastructure as code, monitoring, and CI/CD pipelines.

Built entirely on local environment (WSL2 + Docker) — no cloud costs required.

---

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
- Dockerfile — non-root user, layer caching, multi-stage builds
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

### Phase 4 — CI/CD Pipeline + AWS Simulation
Automated testing and deployment pipeline with local AWS service simulation.

Topics covered:
- GitHub Actions — workflow, jobs, steps, triggers, fail fast principle
- CI/CD — pipeline as code, automated testing on every push
- LocalStack — local AWS emulation (S3, Lambda, SQS)
- AWS CLI v2 — S3 operations against local endpoint

📁 [phase-4/](./phase-4)

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
├── Ansible        → server provisioning
├── Prometheus     → metrics collection
├── Node Exporter  → system metrics
└── Grafana        → visualization dashboard
Phase 4: CI/CD + Cloud Simulation
├── GitHub Actions → automated test + build
├── LocalStack     → AWS S3, Lambda, SQS emulation
└── AWS CLI v2     → cloud operations

## Tech Stack

| Tool | Purpose |
|---|---|
| Ubuntu 22.04 (WSL2) | Local Linux environment |
| Docker + Docker Compose | Containerization |
| Nginx | Web server + reverse proxy |
| PostgreSQL | Database |
| Ansible | Configuration management |
| Prometheus + Grafana | Monitoring & visualization |
| GitHub Actions | CI/CD pipeline |
| LocalStack | AWS services emulation |
| AWS CLI v2 | Cloud operations |

## Environment

- OS: Windows 11 + WSL2 (Ubuntu 22.04)
- RAM: 8GB
- All tools: free and open-source

---

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
# Grafana:    http://localhost:3000 (admin / admin123)
# Prometheus: http://localhost:9090
```

### Phase 3 — Ansible provisioning
```bash
cd phase-3/ansible
ansible-playbook -i inventory.ini playbook.yml
```

### Phase 4 — LocalStack
```bash
cd phase-4
docker compose up -d
# S3 endpoint: http://localhost:4566
aws --endpoint-url=http://localhost:4566 s3 ls
```

---

## CI/CD Status

Every push to `main` triggers the pipeline automatically:
1. Run unit tests
2. Build Docker image
3. Verify build artifact

---

## What's Next
- Capstone: Full stack DevOps project combining all phases
- Kubernetes (k3s) — container orchestration
- Terraform — infrastructure provisioning as code
- AWS — deploy real infrastructure on cloud
