# 🧠 CI Observability Workshop – Participant Guide

## 🎯 Cíl
Tento workshop ti umožní **lokálně spustit celé CI/Monitoring prostředí**, aniž bys musel cokoli buildit nebo konfigurovat.  
Stačí Docker a stažené soubory z GitHubu.

---

## 🧰 Co budeš potřebovat

| Nástroj | Verze | Poznámka |
|----------|--------|----------|
| **Docker Desktop / Docker Engine** | 20+ | nutný pro běh kontejnerů |
| **Webový prohlížeč** | libovolný | pro přístup na Grafanu |
| *(volitelné)* **VS Code / Editor** | – | pokud chceš zkoumat kód |

---

## 1️⃣ Stažení Docker image (`image.tar`)

1. Otevři repozitář **CI Observability Workshop** na GitHubu.  
2. Přejdi do záložky **Actions → CI → poslední úspěšný běh**.  
3. V sekci **Artifacts** klikni na `app-image-tar` a stáhni soubor.  
   - Výsledkem bude buď `app-image-tar.zip` nebo přímo `image.tar`.
4. Pokud máš `.zip`, rozbal ho → výsledkem musí být **`image.tar`**.

---

## 2️⃣ Načtení image do Dockeru

Otevři terminál (macOS/Linux) nebo PowerShell (Windows) ve složce s `image.tar` a spusť:

```bash
docker load -i image.tar
