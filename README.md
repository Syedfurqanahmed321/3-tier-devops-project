# 3-Tier DevOps Project on AWS

An end-to-end DevOps project demonstrating containerization, automated CI/CD, HTTPS configuration, and infrastructure monitoring using AWS EC2, Docker, Jenkins, Prometheus, and Grafana.

## Project Overview

This project deploys a 3-tier web application on an AWS EC2 Ubuntu server using Docker Compose.

It includes:
- Nginx reverse proxy for frontend and backend routing.
- Dockerized frontend, backend, and MongoDB services.
- HTTPS using a self-signed SSL certificate.
- Automated CI/CD using Jenkins, GitHub, and Docker Hub.
- Infrastructure and container monitoring using Prometheus and Grafana.

## Architecture

```text
                    Internet
                       |
                  AWS EC2
                       |
                Nginx Reverse Proxy
                  HTTP / HTTPS
                       |
              -------------------
              |                 |
           Frontend           Backend
          (Nginx)           (Node.js API)
                                |
                             MongoDB
                         (Internal Network)


                 CI/CD Pipeline
                 --------------
                 GitHub Repository
                        |
                     Jenkins
                        |
                  Docker Build
                        |
                   Docker Hub
                        |
                   Deployment
                        |
                     AWS EC2


                 Monitoring
                 ----------
              Node Exporter
                  cAdvisor
               Backend Metrics
                     |
                 Prometheus
                     |
                  Grafana
```

## Technology Stack

| Category | Technologies |
|---|---|
| Cloud | AWS EC2 |
| Operating System | Ubuntu Linux |
| Containers | Docker, Docker Compose |
| Reverse Proxy | Nginx |
| Frontend | HTML, Nginx |
| Backend | Node.js, Express |
| Database | MongoDB |
| CI/CD | Jenkins |
| Version Control | Git, GitHub |
| Container Registry | Docker Hub |
| Monitoring | Prometheus, Grafana |
| Metrics Exporters | Node Exporter, cAdvisor |
| Security | SSL/TLS, AWS Security Groups |

## Application Features

- Frontend accessible through Nginx.
- Backend API exposed through the `/api` route.
- Sample users endpoint: `/api/users`.
- MongoDB runs as a separate container.
- Backend and database are not published on host ports.
- Docker containers communicate through a shared bridge network.

## CI/CD Pipeline

The Jenkins pipeline automates application deployment.

1. Developer pushes code to GitHub.
2. Jenkins detects repository changes using Poll SCM.
3. Jenkins checks out the latest source code.
4. Frontend and backend Docker images are built.
5. Images are pushed to Docker Hub.
6. Updated images are pulled onto the EC2 deployment environment.
7. Docker Compose updates the application containers.

**Pipeline:** GitHub → Jenkins → Docker Build → Docker Hub → EC2 Deployment

## HTTPS Configuration

- Nginx listens on ports 80 and 443.
- HTTP requests are redirected to HTTPS.
- TLS 1.2 and TLS 1.3 are configured.
- A self-signed SSL certificate is used for demonstration.

Note: Browsers display a certificate warning because the certificate is not issued by a publicly trusted Certificate Authority.

## Monitoring and Observability

Prometheus collects metrics from four targets:

| Target | Purpose |
|---|---|
| Prometheus | Prometheus server monitoring |
| Node Exporter | Host system metrics |
| cAdvisor | Docker container metrics |
| Backend API | Application metrics |

Grafana dashboards:
- Node Exporter Full — Dashboard ID: 1860
- cAdvisor — Dashboard ID: 14282

## Security Configuration

- SSH access restricted to the administrator's IP.
- Jenkins, Grafana, and Prometheus access restricted to the administrator's IP.
- HTTP and HTTPS exposed through Nginx.
- Backend and MongoDB ports are not published on the EC2 host.
- SSL private key and sensitive credentials are excluded from Git.
- Docker containers communicate through a dedicated bridge network.

## Project Verification

The following tests have been completed:

- Application accessible through HTTPS.
- HTTP-to-HTTPS redirect verified.
- Backend API accessible through HTTPS.
- Jenkins pipeline build and deployment successful.
- Docker Hub image push successful.
- All nine containers running.
- All four Prometheus targets UP.
- Grafana dashboards displaying metrics.
- Application metrics successfully collected.
- Backend and database host ports not exposed.

## Repository Structure

```text
3-tier-devops-project/
├── app/
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── server.js
│   └── frontend/
│       ├── Dockerfile
│       └── index.html
├── monitoring/
│   └── prometheus.yml
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

SSL certificate and private key are stored separately on the EC2 server and are excluded from Git.

## Learning Outcomes

Through this project, I gained practical experience with:

- AWS EC2 infrastructure deployment.
- Linux server administration.
- Docker containerization and networking.
- Nginx reverse proxy and HTTPS.
- Jenkins CI/CD automation.
- GitHub source code management.
- Docker Hub image publishing.
- Prometheus metrics collection.
- Grafana monitoring and dashboards.
- Container and infrastructure security.

---

**Project:** 3-Tier DevOps Application  
**Author:** Syed Furqan Ahmed  
**Focus:** DevOps | AWS | Linux | Docker | Jenkins | Monitoring
