SHELL := /bin/bash

IMAGE ?= ghcr.io/$(shell echo $${GITHUB_REPOSITORY:-your/repo}):local
TAR   ?= image.tar

.PHONY: i dev test build docker-up docker-down fmt lint typecheck coverage docker-build docker-save docker-load all

i:
	pnpm i --filter ./app
	pnpm i --filter ./metrics-server

dev:
	pnpm --filter ./app start:dev

test:
	pnpm --filter ./app test -- --ci

typecheck:
	pnpm --filter ./app typecheck

lint:
	pnpm --filter ./app lint

fmt:
	pnpm prettier -w "app/**/*.ts" "metrics-server/**/*.ts"

build:
	pnpm --filter ./app build
	pnpm --filter ./metrics-server build

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down -v

coverage:
	open app/coverage/lcov-report/index.html || true

docker-build:
	docker build -t $(IMAGE) app

docker-save: docker-build
	docker save $(IMAGE) -o $(TAR)
	@echo "Saved to $(TAR)"

docker-load:
	docker load -i $(TAR)

all: fmt lint typecheck test build
