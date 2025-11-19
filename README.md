CI Observability Workshop
Kompletní dokumentace k workshopovému projektu
Tento workshop vznikl jako praktické cvičení moderního CI/CD s využitím GitHub Actions, Dockeru a základního monitoringu.
Cílem je, aby si účastníci vyzkoušeli stavbu vlastních CI pipeline, pochopili strukturu workflow souborů, a dokázali pracovat s artefakty, buildy a metrikami.
Workshop je navržen tak, aby:
fungoval offline pouze s Dockerem,
vysvětlil dvě úrovně pipeline – jednoduchou a komplexnější,
obsahoval plnohodnotný demo projekt (Nest.js aplikace + metrics server),
umožnil vizualizaci metrik v Grafaně pro lepší pochopení observability.
Monitoring není hlavním tématem workshopu – slouží jako praktický podklad, na kterém lze demonstrovat CI výstupy.

Struktura
ci-observability-workshop/
 ├─ app/                  # Nest.js demo aplikace (s /metrics endpointem)
 ├─ metrics-server/       # jednoduchý TS server generující testovací metriky
 ├─ prometheus/           # základní konfigurace Promethea
 ├─ grafana/              # předpřipravená Grafana s dashboardem
 ├─ docker-compose.yml    # spuštění celého lokálního prostředí
 ├─ Makefile              # standardizované příkazy pro CI
 ├─ README_participant.md # návod pro účastníky
 ├─ 01-simple-pipeline-assignment.md
 ├─ 02-advanced-pipeline-assignment.md
 └─ (pipeline templates v .github/workflows)

2) Demo aplikace
Nest.js aplikace s jednoduchým REST API a endpointem:
/metrics → Prometheus metriky
/ → healthcheck
Slouží jako cílový objekt pipeline – účastníci ji buildí, lintují, testují a připravují výsledky pro report.

3) Metrics Server
Malý TypeScript server emitující simulované metriky.
Slouží jako další zdroj dat, aby Grafana a Prometheus nebyly prázdné.

4) Monitoring Stack
Připravený minimální stack:
Prometheus → sběr metrik
Grafana → vizualizace
Dashboard obsahuje:
počet requestů,
response time,
simulační metriky z metrics-serveru,
základní přehled.
Monitoring je zde hlavně proto, aby účastník viděl výstupy v reálném světě.

Účastnické úkoly
Workshop obsahuje dvě cvičení na tvorbu reálných CI pipeline:

Simple CI Pipeline
Zaměřeno na základy GitHub Actions
Bez pnpm, bez Dockeru, bez artefaktů
Účastník si vyzkouší:
checkout,
setup Node.js,
instalaci závislostí,
lint,
test,
build,
ruční spuštění workflow (workflow_dispatch).

Advanced CI Pipeline (bez Docker tar)
Realistická CI pipeline, která:
používá pnpm workspace,
využívá Makefile cíle,
provádí formátování, lint, testy, typecheck,
buildí aplikaci,
vytváří jednoduchý report ci-report.txt,
ukládá report jako artefakt,
lze spustit ručně workflow_dispatch.
Cílem je naučit se:
strukturovat reálnou CI pipeline,
pracovat s artefakty,
používat workspace nástroje,
rozšířit pipeline pomocí jednoduchého generátoru reportů.
👉 Zadání: 02-advanced-pipeline-assignment.md
Docker .tar artefakt je součástí finální ukázky, ale není součástí účastnické pipeline.

Makefile (pro workshop i CI)
Makefile standardizuje příkazy:
make i – instalace workspace závislostí
make fmt – formátování (prettier)
make lint – ESLint
make typecheck – TypeScript typecheck
make test – jest testy
make build – build celé aplikace i metrics serveru
Účastník vidí, jak může CI volat jednotný interface → zjednodušení pipeline.

Lokální spuštění (pro účastníky)
Pomocí Docker Compose:
docker compose up -d
Pak:
Služba	URL
App	http://localhost:3000
App metrics	http://localhost:3000/metrics
Metrics Server	http://localhost:9101/metrics
Prometheus	http://localhost:9090
Grafana	http://localhost:3001
Účastník má možnost sledovat živé metriky při běhu aplikace i pipeline.
