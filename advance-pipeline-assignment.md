## 2️⃣ `02-advanced-pipeline-assignment.md`

```markdown
# Úkol 2 – Advanced CI pipeline s reportem

## Cíl

Navážeš na jednoduchou pipeline z Úkolu 1 a vytvoříš **pokročilejší CI workflow**, které:

1. používá **pnpm** a Makefile,
2. spouští formátování, lint, typecheck a testy,
3. buildí aplikaci,
4. generuje jednoduchý textový report `ci-report.txt`,
5. nahraje tento report jako artefakt (ke stažení z GitHub Actions),
6. lze spustit:
   - při `push` na `main`,
   - při vytvoření/změně PR,
   - ručně přes **workflow_dispatch**.

Docker image a `.tar` artefakt už necháváme stranou – to řešíme v „hotové“ pipeline, kterou projdeme spolu.

---

## Požadavky na workflow

- Workflow soubor: `.github/workflows/workshop-advanced-ci.yml`
- Název workflow: `Workshop Advanced CI`
- Triggery:
  - `workflow_dispatch`
  - `push` na `main` + tagy `v*.*.*`
  - `pull_request`
- Jeden job: `ci`
- Prostředí: `runs-on: ubuntu-latest`
- Použít:
  - `pnpm/action-setup@v4` – nejdřív (kvůli pnpm v PATH),
  - `actions/setup-node@v4` – potom, s `node-version: 20` a `cache: 'pnpm'`.
- Použij Makefile cíle:
  - `make i`
  - `make fmt && make lint && make typecheck`
  - `make test`
  - `make build`
- Vytvoř soubor `ci-report.txt`, který bude obsahovat:
  - timestamp,
  - hash commitu,
  - název branch,
  - verzi Node,
  - verzi pnpm,
  - velikost `app/dist`,
  - informaci, že testy proběhly (`Tests: OK`).
- Nahraj `ci-report.txt` jako artefakt názvem `ci-report`.

---

## Skeleton workflow – doplň TODO

Vytvoř soubor `.github/workflows/workshop-advanced-ci.yml` a doplň části označené `TODO`:

```yaml
name: Workshop Advanced CI

on:
  # TODO: přidej workflow_dispatch pro ruční spuštění
  workflow_dispatch: {}
  push:
    branches:
      - main
    tags:
      - "v*.*.*"
  pull_request: {}

jobs:
  ci:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # 1) Nejprve pnpm, aby existovalo v PATH
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
          run_install: false

      # 2) Pak Node + cache pro pnpm
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      # 3) Instalace závislostí přes Makefile
      - name: Install dependencies
        # TODO: zavolej make target pro instalaci (make i)
        run: make i

      # 4) Lint + Typecheck
      - name: Lint & Typecheck
        # TODO: zavolej fmt, lint a typecheck přes Makefile
        run: make fmt && make lint && make typecheck

      # 5) Testy
      - name: Run tests
        # TODO: zavolej make test
        run: make test

      # 6) Build
      - name: Build app
        # TODO: zavolej make build
        run: make build

      # 7) Generování jednoduchého reportu
      - name: Generate CI report
        run: |
          # TODO: vytvoř soubor ci-report.txt a zapiš do něj:
          # - timestamp (date)
          # - commit (GITHUB_SHA)
          # - branch (GITHUB_REF_NAME)
          # - Node verzi (node -v)
          # - pnpm verzi (pnpm -v)
          # - velikost app/dist (du -sh app/dist)
          # - text "Tests: OK"
          echo "CI REPORT" > ci-report.txt
          echo "Timestamp: $(date)" >> ci-report.txt
          echo "Commit: $GITHUB_SHA" >> ci-report.txt
          echo "Branch: $GITHUB_REF_NAME" >> ci-report.txt
          echo "" >> ci-report.txt
          echo "Node version:" >> ci-report.txt
          node -v >> ci-report.txt
          echo "" >> ci-report.txt
          echo "pnpm version:" >> ci-report.txt
          pnpm -v >> ci-report.txt
          echo "" >> ci-report.txt
          echo "App build size:" >> ci-report.txt
          du -sh app/dist >> ci-report.txt
          echo "" >> ci-report.txt
          echo "Tests: OK" >> ci-report.txt

      # 8) Upload artefaktu ci-report.txt
      - name: Upload CI report
        uses: actions/upload-artifact@v4
        with:
          # TODO: pojmenuj artefakt "ci-report"
          name: ci-report
          # TODO: nastav path na ci-report.txt
          path: ci-report.txt
          retention-days: 10

      # 9) (Volitelné) místo pro budoucí push Docker image
      - name: Push Docker image on tag
        if: startsWith(github.ref, 'refs/tags/')
        run: |
          echo "TODO: implementovat push Docker image na tag (mimo rámec tohoto cvičení)"
