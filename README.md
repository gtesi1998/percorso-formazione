# Percorso di Crescita — Direzione di Produzione

App di formazione (5 pillar, quiz, riflessioni, piano d'azione) a cura di **SmartValue Management Consulting**.
Questo pacchetto è pronto per essere pubblicato come **sito statico** su DigitalOcean App Platform, collegato a GitHub.

I progressi vengono salvati nel **browser dell'utente** (localStorage): restano sul dispositivo su cui si usa l'app.

---

## A) Mettere il progetto su GitHub

Hai due strade.

**Strada veloce (sito web di GitHub, senza comandi):**
1. Crea un nuovo repository vuoto su GitHub, es. `percorso-formazione`.
2. Carica tutti i file di questa cartella (pulsante *Add file → Upload files*), poi *Commit*.

**Strada da terminale (se hai git installato):**
```bash
cd percorso-formazione
git init
git add .
git commit -m "Percorso formativo - versione iniziale"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/percorso-formazione.git
git push -u origin main
```

## B) Pubblicare su DigitalOcean App Platform

1. Vai su DigitalOcean → **Apps** → **Create App**.
2. Sorgente: **GitHub** → autorizza e scegli il repository `percorso-formazione`, branch `main`.
   (Lascia attivo *Autodeploy on push*: a ogni modifica caricata su GitHub, il sito si aggiorna da solo.)
3. DigitalOcean dovrebbe riconoscere un progetto **Vite/Node**. Verifica che il componente sia di tipo **Static Site** con:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Piano: scegli il **tier gratuito per siti statici** (Free).
5. **Create Resources** → attendi la prima build. Al termine ottieni un indirizzo `https://....ondigitalocean.app`.

> Il file `.do/app.yaml` contiene già questi valori: puoi anche importarlo, ricordandoti di sostituire `TUO-UTENTE-GITHUB`.

## C) (Facoltativo) Dominio personalizzato
In **Settings → Domains** puoi collegare un dominio tuo (es. `percorso.smartvalue.it`). DigitalOcean gestisce l'HTTPS automaticamente.

---

## Costi
- Sito statico su App Platform: **gratuito** (fino a 3 app statiche, 1 GiB/mese di traffico l'una — più che sufficiente per un singolo utente).
- Dominio personalizzato: facoltativo, costo del registrar (indicativamente ~10–15 €/anno, da verificare).

## Provare in locale (facoltativo)
Serve Node.js installato.
```bash
npm install
npm run dev      # apre l'app in sviluppo
npm run build    # genera la cartella dist/ (quella che DigitalOcean pubblica)
npm run preview  # anteprima della build
```

## Aggiornare i contenuti
Tutti i contenuti (pillar, lezioni, quiz, piani) sono nel file `src/App.jsx`, nella costante `PILLARS` in cima. Modifichi lì, fai *commit/push* su GitHub e DigitalOcean ripubblica da solo.
