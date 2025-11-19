# Úkol 1 – Simple CI pipeline

## Cíl

Vytvoř GitHub Actions workflow, které při každém:

- push na branch `main`,
- otevření / updatu pull requestu,
- nebo ručním spuštění přes **Run workflow**

automaticky:

1. checkoutne repozitář,
2. nastaví Node.js (verze 20),
3. v adresáři `./app` nainstaluje závislosti,
4. spustí `lint`,
5. spustí testy,
6. udělá build aplikace.

Pipeline bude jednoduchá, bez artefaktů a bez Dockeru. Cílem je pochopit základní building blocky CI.

---

## Požadavky na workflow

- Workflow soubor: `.github/workflows/simple-ci.yml`
- Název workflow: `Simple CI`
- Triggery:
  - `workflow_dispatch` (ruční spuštění)
  - `push` na `main`
  - `pull_request` (jakákoliv branch)
- Jeden job: `ci`
- Prostředí: `runs-on: ubuntu-latest`
- Steps (v tomto pořadí):

1. **Checkout** repozitáře (action `actions/checkout@v4`)
2. **Setup Node.js** (action `actions/setup-node@v4`, `node-version: 20`)
3. **Install deps** – `npm ci` v adresáři `./app`
4. **Lint** – `npm run lint` v `./app`
5. **Test** – `npm test` v `./app`
6. **Build** – `npm run build` v `./app`

---

## Skeleton workflow – doplň TODO

Vytvoř soubor `.github/workflows/simple-ci.yml` a doplň části označené `TODO`:

```yaml
name: Simple CI

on:
  # TODO: doplň ruční spuštění workflow (workflow_dispatch)
  workflow_dispatch: {}
  push:
    branches:
      - main
  pull_request: {}

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        # TODO: použij actions/checkout@v4
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        # TODO: použij actions/setup-node@v4 s node-version: 20
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install deps
        # TODO: spusť "npm ci" v adresáři ./app
        run: npm ci
        working-directory: ./app

      - name: Lint
        # TODO: spusť "npm run lint" v ./app
        run: npm run lint
        working-directory: ./app

      - name: Test
        # TODO: spusť "npm test" v ./app
        run: npm test
        working-directory: ./app

      - name: Build
        # TODO: spusť "npm run build" v ./app
        run: npm run build
        working-directory: ./app
