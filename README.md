# Quiz — Struttura della Materia

Quiz a crocette in stile appello: 530 domande su fisica atomica, meccanica
statistica, trasporto, stato solido e magnetismo, con simulazioni d'esame,
memoria degli errori e schede di ripasso.

È una pagina web singola, senza dipendenze esterne: una volta aperta funziona
anche senza connessione.

## Come pubblicarlo (GitHub Pages)

1. Crea un nuovo repository su GitHub (per esempio `quiz-struttura`).
2. Carica **tutti** i file di questa cartella nella radice del repository:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-180.png`, `icon-512.png`.
3. Vai in **Settings → Pages**, alla voce *Source* scegli **Deploy from a branch**,
   poi branch `main` e cartella `/ (root)`. Salva.
4. Dopo circa un minuto il quiz è online all'indirizzo
   `https://<tuo-utente>.github.io/quiz-struttura/`.

## Come installarlo su iPhone

1. Apri quell'indirizzo con **Safari**.
2. Tocca **Condividi** → **Aggiungi alla schermata Home**.
3. Apri l'app dall'icona almeno una volta con la rete attiva: da quel momento
   si avvia anche in modalità aereo.

Su Android la procedura è la stessa da Chrome ("Installa app").

## Aggiornare le domande

1. Sostituisci `index.html` con la nuova versione.
2. In `sw.js` incrementa il numero di versione della cache
   (`const CACHE = "quiz-sdm-v1"` → `"quiz-sdm-v2"`).

Senza il passaggio 2 i dispositivi che hanno già l'app installata continuano a
vedere la versione vecchia, perché la caricano dalla cache locale.

## Perché non compare su Google

`index.html` contiene i meta tag `noindex, nofollow`: i motori di ricerca
leggono la pagina, capiscono che non va elencata e la escludono dai risultati.
Il sito resta raggiungibile da chi ha il link diretto.

Non c'è un `robots.txt`, ed è voluto, per due motivi:

- per un sito di progetto (`utente.github.io/nome-repo/`) i crawler leggono solo
  il `robots.txt` alla radice del dominio, che appartiene a un altro repository:
  quello messo qui dentro verrebbe semplicemente ignorato;
- bloccare la scansione impedirebbe ai motori di *leggere* il `noindex`, con il
  risultato opposto a quello voluto (l'indirizzo può restare elencato se scoperto
  altrove).

**Attenzione:** questo nasconde il sito, non il repository. Su GitHub il
repository resta pubblico e i suoi file sono consultabili e ricercabili. Per
ridurre la visibilità conviene dargli un nome neutro, lasciare vuota la
descrizione e non aggiungere argomenti (*topics*). Se serve tenere nascosto
anche il codice, la strada è pubblicare da un repository privato con Cloudflare
Pages.

## Note

- I progressi (errori, statistiche, storico) sono salvati nel browser del
  singolo dispositivo: telefono e computer hanno archivi separati e non si
  sincronizzano.
- Attenzione: con un account GitHub gratuito il sito pubblicato è **pubblico**
  e raggiungibile da chiunque conosca l'indirizzo.
