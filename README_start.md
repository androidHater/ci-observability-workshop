# CI/Observability Workshop Starter

## Quick Start
1. Install Docker + Docker Compose.
2. Load the prebuilt image (if you have `image.tar`): `docker load -i image.tar` (optional).
3. Start local stack: `docker compose up -d --build`
4. Open:
   - App metrics: http://localhost:3000/metrics
   - Metrics server: http://localhost:9101/metrics
   - Prometheus: http://localhost:9090/
   - Grafana: http://localhost:3001/ (datasource auto-provisioned)

## Makefile
- `make i` – install deps via pnpm
- `make all` – fmt + lint + typecheck + test + build
- `make docker-up` / `make docker-down`
- `make docker-save` – build `app` image and save to `image.tar`

## CI
GitHub Actions pipeline runs lint/typecheck/tests, builds Docker image, saves `image.tar` as an artifact, and pushes to GHCR on tag.
