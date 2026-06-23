import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* Logo SmartValue Management Consulting (incorporato) */
const LOGO = "data:image/png;base64,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";

/* =========================================================================
   PERCORSO DI FORMAZIONE — Direttore di Produzione (serramenti in PVC)
   App di apprendimento ibrido: teoria + esercizi + piano d'azione.
   Salvataggio progressi via localStorage (browser dell'utente).
   ========================================================================= */

/* ----------------------------- CONTENUTI ------------------------------- */

const PILLARS = [
  {
    id: "p1",
    n: "01",
    title: "Gestione del Personale",
    tagline: "Motivare, comunicare, dare feedback, misurare le persone",
    color: "var(--petrol)",
    lessons: [
      {
        id: "p1l1",
        title: "Cosa motiva davvero le persone in reparto",
        minutes: 12,
        blocks: [
          { type: "p", heading: "Motivazione intrinseca ed estrinseca", text: "La motivazione estrinseca arriva dall'esterno: premi, bonus, evitare un rimprovero. È utile ma si esaurisce in fretta e funziona male sui comportamenti complessi. La motivazione intrinseca nasce dalla persona: il senso di padronanza del proprio mestiere, l'autonomia nel decidere come lavorare, lo scopo (sapere perché quel pezzo conta). In un reparto serramenti, l'operatore che capisce che un'anta fuori squadra genererà un reso e un cliente arrabbiato lavora diversamente da chi vede solo un pezzo da spostare." },
          { type: "list", heading: "Le tre leve che puoi attivare subito", items: ["Autonomia: lascia margini di scelta su come svolgere un compito, non solo ordini esecutivi.", "Padronanza: riconosci la competenza, affida compiti che fanno crescere, fai vedere i progressi.", "Scopo: collega ogni attività al risultato per il cliente e per l'azienda."] },
          { type: "example", heading: "Sul campo", text: "Due saldatori montano profili allo stesso ritmo, ma uno ha più scarti. Invece di limitarti a richiamarlo, gli mostri il dato di scarto del mese accanto a quello del collega e gli chiedi cosa pensa lo causi. Coinvolgerlo nella diagnosi attiva padronanza e autonomia: nella maggior parte dei casi la soluzione la propone lui." },
          { type: "callout", text: "Un errore frequente: pensare che 'pagare di più' risolva la demotivazione. Spesso il problema è mancanza di riconoscimento, obiettivi poco chiari o un capo che si fa sentire solo quando qualcosa va storto." },
          { type: "takeaways", items: ["I premi muovono i comportamenti semplici, non quelli che richiedono testa.", "Autonomia, padronanza e scopo sono leve gratuite e potenti.", "Riconoscere un buon lavoro costa poco e rende molto."] },
        ],
        quiz: [
          { q: "Un operatore esperto ha smesso di proporre miglioramenti. Qual è l'intervento più probabilmente efficace?", options: ["Aumentargli il premio di produzione", "Coinvolgerlo nella revisione di un processo e dargli autonomia su una parte", "Affiancargli un controllo più stretto", "Spostarlo a una mansione più semplice"], correct: 1, why: "Riattivare padronanza e autonomia agisce sulla motivazione intrinseca, la più duratura per chi è già competente." },
          { q: "La motivazione estrinseca è più adatta a:", options: ["Compiti creativi e complessi", "Compiti semplici e ripetitivi e obiettivi di breve", "Costruire fiducia di lungo periodo", "Sostituire del tutto il riconoscimento"], correct: 1, why: "I premi funzionano bene su compiti semplici e misurabili nel breve; sui compiti complessi possono persino peggiorare la prestazione." },
          { q: "Qual è il modo più economico per sostenere la motivazione?", options: ["Bonus annuale", "Riconoscere il buon lavoro nel momento in cui accade", "Riunioni più lunghe", "Più controlli a sorpresa"], correct: 1, why: "Il riconoscimento tempestivo è gratuito e ha un impatto immediato sul senso di valore della persona." },
        ],
        reflections: ["Pensa a una persona del tuo reparto che senti demotivata: quale delle tre leve (autonomia, padronanza, scopo) le manca di più, e perché?"],
      },
      {
        id: "p1l2",
        title: "Comunicare in modo che le persone capiscano e agiscano",
        minutes: 12,
        blocks: [
          { type: "p", heading: "Comunicare non è 'aver detto'", text: "Il messaggio esiste solo se è stato compreso. In reparto, con rumore, fretta e turni diversi, gran parte dei problemi nasce da comunicazioni date per scontate. La regola pratica: dire cosa va fatto, perché, entro quando e come capirò che è fatto. Un'istruzione senza il 'perché' viene eseguita male appena cambia il contesto." },
          { type: "list", heading: "Ascolto attivo: tre mosse", items: ["Riformula: 'Quindi mi stai dicendo che la pressa si ferma solo a turno avviato?' verifica di aver capito.", "Non interrompere per rispondere: lascia finire, anche quando pensi di sapere già.", "Chiedi prima di giudicare: 'Cosa ti ha portato a fare così?' spesso rivela un vincolo che non conoscevi."] },
          { type: "example", heading: "Sul campo", text: "Il briefing di inizio turno dura 3 minuti: priorità del giorno (quali commesse), un dato (scarto o resa di ieri), un problema aperto e chi lo segue. Standardizzato e breve, allinea il reparto meglio di una mail che nessuno apre tra una lavorazione e l'altra." },
          { type: "callout", text: "Adatta il canale al messaggio: una correzione o una cosa delicata si fa di persona, mai per messaggio scritto davanti a tutti. Lo scritto serve per ciò che deve restare (procedure, decisioni, numeri)." },
          { type: "takeaways", items: ["Comunicare = essere compresi, non aver parlato.", "Sempre il 'perché', non solo il 'cosa'.", "Ascolto attivo: riformula, non interrompere, chiedi.", "Il canale giusto dipende dal messaggio."] },
        ],
        quiz: [
          { q: "Hai dato un'istruzione chiara ma viene eseguita male appena cambia una variabile. La causa più probabile è:", options: ["La persona non è capace", "Hai dato il 'cosa' ma non il 'perché'", "Serviva una mail", "Va sostituita la persona"], correct: 1, why: "Senza capire lo scopo, la persona non sa come adattare l'esecuzione quando il contesto cambia." },
          { q: "Qual è un esempio di ascolto attivo?", options: ["Annuire mentre prepari la risposta", "Riformulare ciò che hai capito per verificarlo", "Concludere le frasi al posto dell'altro", "Rispondere prima che finisca"], correct: 1, why: "La riformulazione conferma la comprensione e fa sentire la persona ascoltata." },
          { q: "Una correzione personale a un operatore andrebbe data:", options: ["In gruppo, come esempio", "Per messaggio scritto", "Di persona e in privato", "Alla riunione mensile"], correct: 2, why: "Le correzioni si fanno di persona e in privato: in pubblico generano vergogna e difesa, non miglioramento." },
        ],
        reflections: ["Ripensa all'ultima volta che un tuo ordine è stato frainteso: cosa mancava nel messaggio (cosa, perché, quando, come verificare)?"],
      },
      {
        id: "p1l3",
        title: "Dare feedback con il metodo SBI",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Il problema del feedback generico", text: "'Bravo' e 'Devi impegnarti di più' non cambiano nulla: non dicono cosa, di preciso, va ripetuto o corretto. Il feedback utile è specifico, tempestivo e parla di comportamenti osservabili, non della persona ('sei distratto' è un'etichetta, 'oggi hai saltato il controllo squadra su tre ante' è un fatto)." },
          { type: "list", heading: "Il modello SBI", items: ["Situazione: quando e dove. 'Stamattina, sulla linea 2…'", "Comportamento (Behavior): cosa hai osservato, in modo fattuale. '…hai montato i profili senza verificare la diagonale.'", "Impatto: la conseguenza. '…così due telai sono arrivati fuori squadra al controllo finale e li abbiamo rilavorati.'"] },
          { type: "p", heading: "Feedback positivo e correttivo", text: "Usa SBI anche per il feedback positivo: rende il riconoscimento credibile e ripetibile ('hai fermato la linea appena hai sentito il rumore anomalo: hai evitato un fermo lungo'). Per il correttivo, dopo l'impatto apri al dialogo: 'come possiamo evitarlo la prossima volta?'." },
          { type: "callout", text: "Evita il 'sandwich' meccanico (lode-critica-lode): le persone lo riconoscono e svaluta entrambe. Meglio essere diretti e rispettosi: il rispetto sta nel come, non nell'addolcire il contenuto." },
          { type: "takeaways", items: ["Feedback su comportamenti osservabili, mai etichette sulla persona.", "SBI: Situazione, Comportamento, Impatto.", "Tempestivo: vicino al fatto, non al colloquio annuale.", "Anche il feedback positivo va reso specifico."] },
        ],
        quiz: [
          { q: "Quale frase è un buon feedback secondo SBI?", options: ["Sei sempre disordinato", "Devi fare meglio", "Ieri sul banco 3 hai lasciato gli scarti a terra e un collega è scivolato", "Bravo, continua così"], correct: 2, why: "Indica situazione, comportamento osservabile e impatto concreto, senza etichettare la persona." },
          { q: "Perché evitare le etichette ('sei pigro')?", options: ["Sono troppo gentili", "Attaccano l'identità e generano difesa, senza indicare cosa cambiare", "Sono troppo lunghe", "Vanno bene solo per iscritto"], correct: 1, why: "Le etichette mettono la persona sulla difensiva e non dicono quale comportamento correggere." },
          { q: "Quando va dato il feedback correttivo?", options: ["Al colloquio annuale", "Il prima possibile, vicino al fatto", "Solo se la persona lo chiede", "Mai, per non demotivare"], correct: 1, why: "La tempestività rende il feedback utile: a distanza di mesi il contesto è perso e l'effetto sul comportamento svanisce." },
        ],
        reflections: ["Scrivi un feedback correttivo reale usando lo schema SBI per una situazione capitata questa settimana nel tuo reparto."],
      },
      {
        id: "p1l4",
        title: "Conversazioni difficili e gestione dei conflitti",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Perché rimandiamo le conversazioni difficili", text: "Le rimandiamo per paura della reazione, e così il problema cresce. Una conversazione difficile gestita presto è quasi sempre più facile di quella rimandata. L'obiettivo non è 'vincere', ma capire e risolvere: chi entra per avere ragione esce con un conflitto, chi entra per capire esce con una soluzione." },
          { type: "list", heading: "Una struttura semplice", items: ["Parti dai fatti, non dalle intenzioni presunte ('hai fatto apposta').", "Esprimi l'impatto e come ti sei sentito, in prima persona ('quando succede X, il reparto si blocca e io devo rifare la pianificazione').", "Ascolta la versione dell'altro, davvero.", "Cercate insieme la soluzione e definite un impegno concreto e verificabile."] },
          { type: "example", heading: "Sul campo", text: "Due reparti si rimpallano la colpa dei ritardi (taglio vs assemblaggio). Convocali insieme, vieta il linguaggio accusatorio, metti sul tavolo solo i dati di consegna interna. Quasi sempre emerge un problema di processo (una scheda incompleta, un'attesa) e non di cattiva volontà." },
          { type: "callout", text: "Separa la persona dal problema. 'Tu sei il problema' chiude; 'abbiamo un problema da risolvere insieme' apre. Tieni alto il rispetto e alta l'esigenza: si può essere fermi sui risultati e gentili con le persone." },
          { type: "takeaways", items: ["Prima è più facile: non rimandare.", "Entra per capire, non per vincere.", "Fatti e impatto, non accuse di intenzioni.", "Chiudi sempre con un impegno concreto e una verifica."] },
        ],
        quiz: [
          { q: "Qual è l'obiettivo giusto di una conversazione difficile?", options: ["Avere ragione", "Capire e trovare una soluzione condivisa", "Far ammettere la colpa", "Evitare il confronto"], correct: 1, why: "Entrare per capire mantiene la relazione e porta a una soluzione; entrare per vincere alimenta il conflitto." },
          { q: "Due reparti si accusano a vicenda dei ritardi. La mossa migliore è:", options: ["Decidere chi ha torto", "Riunirli sui dati di consegna e cercare il problema di processo", "Mandare una circolare", "Aspettare che si risolva"], correct: 1, why: "Spostare il fuoco dai colpevoli ai dati e al processo fa emergere la causa reale, di solito organizzativa." },
          { q: "'Separare la persona dal problema' significa:", options: ["Ignorare i comportamenti", "Affrontare il problema senza attaccare l'identità della persona", "Parlare solo con i capi", "Evitare i fatti spiacevoli"], correct: 1, why: "Attaccare la persona genera difesa; affrontare il problema insieme mantiene collaborazione e dignità." },
        ],
        reflections: ["C'è una conversazione difficile che stai rimandando? Scrivi come la imposteresti partendo dai fatti e dall'impatto."],
      },
      {
        id: "p1l5",
        title: "Misurare la performance delle persone",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Misurare per migliorare, non per punire", text: "La misura serve a vedere se si sta andando nella direzione giusta e a parlare di fatti invece che di impressioni. Se la misura viene percepita solo come strumento per colpire, le persone imparano a manipolarla o a nasconderla. Misura ciò che conta davvero, non ciò che è facile contare." },
          { type: "list", heading: "Indicatori utili in produzione", items: ["Individuali: resa, tasso di scarto/rilavorazione, rispetto delle procedure di qualità e sicurezza.", "Di squadra: puntualità di consegna interna, OEE di linea, segnalazioni di miglioramento proposte.", "Comportamentali: collaborazione, affidabilità, autonomia (più difficili ma osservabili)."] },
          { type: "p", heading: "Obiettivi ben fatti (SMART)", text: "Un obiettivo deve essere Specifico, Misurabile, Achievable (raggiungibile), Rilevante e con una scadenza (Time-bound). 'Migliorare la qualità' non è un obiettivo; 'ridurre la rilavorazione delle ante della linea 2 dal 6% al 4% entro tre mesi' lo è." },
          { type: "callout", text: "Pochi indicatori, ben scelti. Tre numeri che le persone capiscono e influenzano valgono più di una dashboard con venti metriche che nessuno guarda. Rivedi gli obiettivi nei colloqui periodici, non solo a fine anno." },
          { type: "takeaways", items: ["La misura è uno strumento di dialogo, non un'arma.", "Misura ciò che conta, non ciò che è comodo.", "Obiettivi SMART, non desideri generici.", "Pochi indicatori chiari battono molte metriche ignorate."] },
        ],
        quiz: [
          { q: "Quale di questi è un obiettivo SMART?", options: ["Lavorare meglio", "Ridurre gli scarti", "Ridurre lo scarto della linea 2 dal 6% al 4% in 3 mesi", "Essere più veloci"], correct: 2, why: "È specifico, misurabile, ha un valore e una scadenza: gli altri sono desideri non misurabili." },
          { q: "Perché 'misurare ciò che è facile contare' è un rischio?", options: ["È sempre sbagliato misurare", "Si rischia di ottimizzare l'irrilevante e ignorare ciò che conta", "Costa troppo", "Le persone non capiscono i numeri"], correct: 1, why: "Ciò che è facile da contare non sempre è ciò che crea valore: si finisce per migliorare la metrica sbagliata." },
          { q: "Se la misura è percepita solo come strumento punitivo, le persone tendono a:", options: ["Migliorare di più", "Manipolare o nascondere i dati", "Proporre più idee", "Collaborare meglio"], correct: 1, why: "Una misura vissuta come minaccia spinge a difendersi dal numero anziché a usarlo per migliorare." },
        ],
        reflections: ["Scegli una persona del tuo team e definisci per lei un obiettivo SMART realistico per i prossimi 3 mesi."],
      },
    ],
    plan: {
      intro: "Trasforma la teoria del pillar in azioni concrete sul tuo reparto. Compila e porta questa scheda al consulente.",
      prompts: [
        { id: "p1q1", label: "Una persona da motivare", hint: "Chi, quale leva (autonomia/padronanza/scopo) e una mossa concreta che proverai." },
        { id: "p1q2", label: "Il mio briefing di turno", hint: "Come struttureresti 3 minuti di allineamento giornaliero in reparto." },
        { id: "p1q3", label: "Un feedback SBI che darò", hint: "Situazione, comportamento, impatto, e l'apertura al dialogo." },
        { id: "p1q4", label: "Una conversazione difficile da affrontare", hint: "Con chi, su cosa, e come la imposterai." },
        { id: "p1q5", label: "Un obiettivo SMART per un collaboratore", hint: "Il collaboratore e l'obiettivo misurabile con scadenza." },
      ],
    },
  },

  {
    id: "p2",
    n: "02",
    title: "Gestione della Produzione",
    tagline: "Metriche, qualità, manutenzione, marginalità, sprechi",
    color: "var(--petrol)",
    lessons: [
      {
        id: "p2l1",
        title: "Le metriche di produzione che contano",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Misurare per governare", text: "Senza numeri si governa a sensazione. Le metriche giuste rendono visibili i problemi prima che diventino reclami del cliente. L'importante è scegliere pochi indicatori chiave e guardarli con costanza." },
          { type: "list", heading: "Indicatori chiave in produzione serramenti", items: ["OEE (Overall Equipment Effectiveness): Disponibilità × Performance × Qualità. Dice quanto rende davvero un impianto rispetto al suo potenziale.", "Lead time: tempo dall'ordine alla consegna; il cliente lo percepisce direttamente.", "Throughput: pezzi/telai buoni prodotti per unità di tempo.", "Tasso di scarto e rilavorazione: percentuale di pezzi da buttare o rifare.", "Puntualità di consegna (OTD): % di ordini consegnati nei tempi promessi."] },
          { type: "example", heading: "Sul campo", text: "Una saldatrice di angoli lavora 8 ore ma: si ferma 1 ora per cambi e micro-fermi (Disponibilità), gira più lenta del nominale (Performance) e produce un 5% di saldature da rifare (Qualità). L'OEE può scendere ben sotto il 60% pur 'lavorando tutto il giorno'. L'OEE rivela il tempo nascosto che si perde." },
          { type: "callout", text: "Un buon indicatore è influenzabile da chi lo guarda, aggiornato spesso e comprensibile da tutti. Esponilo visivamente in reparto: ciò che è visibile migliora." },
          { type: "takeaways", items: ["L'OEE scompone la resa reale in Disponibilità, Performance, Qualità.", "Il lead time e la puntualità sono ciò che vede il cliente.", "Pochi indicatori, aggiornati e visibili.", "Lavorare tutto il giorno non vuol dire rendere."] },
        ],
        quiz: [
          { q: "L'OEE è il prodotto di:", options: ["Costo × Tempo × Qualità", "Disponibilità × Performance × Qualità", "Throughput × Scarto", "Lead time × Puntualità"], correct: 1, why: "L'OEE combina i tre fattori che erodono la resa: fermi (disponibilità), velocità (performance) e difetti (qualità)." },
          { q: "Quale metrica percepisce direttamente il cliente?", options: ["OEE", "Lead time e puntualità di consegna", "Tasso di micro-fermi", "Performance della saldatrice"], correct: 1, why: "Il cliente vive il tempo di consegna e il rispetto della data promessa; l'OEE è interno." },
          { q: "Una macchina 'lavora tutto il giorno' ma ha OEE del 55%. Significa che:", options: ["È efficiente", "Si perde quasi metà del potenziale tra fermi, lentezza e difetti", "I dati sono sbagliati", "Non serve misurare"], correct: 1, why: "Un OEE del 55% indica che gran parte del tempo nominale è eroso da micro-fermi, rallentamenti e scarti." },
        ],
        reflections: ["Quale singolo indicatore, se lo misurassi bene da domani, ti darebbe più visibilità sui problemi del tuo reparto? Perché?"],
      },
      {
        id: "p2l2",
        title: "Qualità di processo e di prodotto",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Qualità di prodotto vs di processo", text: "La qualità di prodotto è la conformità del serramento finito (squadra, tenuta, finitura). La qualità di processo è la capacità del processo di produrre conforme in modo ripetibile. Inseguire solo la qualità di prodotto col controllo finale è costoso: trovi il difetto quando hai già speso lavoro e materiale. Costruire qualità nel processo significa prevenire il difetto a monte." },
          { type: "list", heading: "Il costo della non qualità", items: ["Costi interni: scarti, rilavorazioni, fermi per rifare.", "Costi esterni: resi, interventi in cantiere, contestazioni, immagine.", "Regola pratica: un difetto costa circa 10 volte di più a ogni fase in cui sfugge (1 in reparto, 10 al controllo finale, 100 dal cliente)."] },
          { type: "example", heading: "Sul campo", text: "Anziché controllare solo l'anta finita, inserisci un autocontrollo della diagonale subito dopo la saldatura, con una dima. L'operatore scarta il pezzo fuori tolleranza prima di montarci ferramenta e vetro: il difetto costa un profilo, non un serramento completo." },
          { type: "callout", text: "Poka-yoke (a prova di errore): progetta il processo perché l'errore sia difficile o impossibile (sagome che entrano in un solo verso, sensori, checklist). Meglio rendere impossibile l'errore che chiedere più attenzione." },
          { type: "takeaways", items: ["Costruire qualità a monte costa meno che controllarla a valle.", "Il difetto costa 10× a ogni fase in cui sfugge.", "Autocontrollo + dime spostano la qualità sul processo.", "Poka-yoke: rendere l'errore impossibile, non solo sgridarlo."] },
        ],
        quiz: [
          { q: "Perché controllare solo il prodotto finito è costoso?", options: ["Il controllo finale è inutile", "Il difetto si scopre quando hai già investito lavoro e materiale", "I clienti non lo notano", "Rallenta poco"], correct: 1, why: "A valle il valore aggiunto è già stato speso: rilavorare o scartare un serramento completo costa molto più di un profilo." },
          { q: "Un 'poka-yoke' è:", options: ["Un premio di produzione", "Un accorgimento che rende l'errore difficile o impossibile", "Un indicatore di OEE", "Un tipo di reso"], correct: 1, why: "Il poka-yoke previene l'errore per progettazione del processo, senza affidarsi solo all'attenzione umana." },
          { q: "Spostare un controllo della diagonale subito dopo la saldatura serve a:", options: ["Aumentare i controlli finali", "Intercettare il difetto quando costa meno", "Rallentare la linea", "Eliminare la ferramenta"], correct: 1, why: "Intercettare il fuori squadra prima del montaggio evita di buttare un serramento completo: il difetto costa un profilo." },
        ],
        reflections: ["Individua un difetto ricorrente nei tuoi serramenti: dove potresti spostare il controllo più a monte, e con quale dima/poka-yoke?"],
      },
      {
        id: "p2l3",
        title: "Manutenzione preventiva degli impianti",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Reattiva vs preventiva vs predittiva", text: "La manutenzione reattiva (si ripara quando si rompe) sembra economica ma costa in fermi improvvisi, scarti e consegne saltate. La preventiva interviene a calendario o a soglie d'uso, prima del guasto. La predittiva usa dati e sensori per intervenire solo quando serve davvero. Per una PMI, passare dalla reattiva a una buona preventiva è già un salto enorme." },
          { type: "list", heading: "I pilastri della TPM (Total Productive Maintenance)", items: ["Manutenzione autonoma: l'operatore pulisce, ispeziona e segnala (non solo il manutentore).", "Piano di manutenzione preventiva: liste di controllo a frequenza definita per macchina.", "Registro guasti: cosa si è rotto, quando, perché, quanto è durato il fermo.", "Analisi delle cause dei fermi ricorrenti."] },
          { type: "example", heading: "Sul campo", text: "La fresa per le squadrette si imballa di trucioli e si surriscalda due volte a settimana. Una pulizia di fine turno di 5 minuti (manutenzione autonoma) e un controllo settimanale della lubrificazione eliminano la maggior parte dei fermi: il costo è qualche minuto, il risparmio sono ore di linea ferma e ordini in ritardo." },
          { type: "callout", text: "Misura il fermo macchina: senza un registro non sai quali macchine ti costano davvero. Spesso il 20% degli impianti causa l'80% dei fermi: lì concentri la preventiva." },
          { type: "takeaways", items: ["La manutenzione reattiva ha costi nascosti enormi (fermi, scarti, ritardi).", "La preventiva interviene prima del guasto, a calendario o soglia.", "Manutenzione autonoma: coinvolgi l'operatore.", "Senza registro guasti non sai dove intervenire."] },
        ],
        quiz: [
          { q: "La manutenzione preventiva si caratterizza per:", options: ["Intervenire dopo il guasto", "Intervenire a calendario o a soglia, prima del guasto", "Non intervenire mai", "Sostituire l'operatore"], correct: 1, why: "La preventiva pianifica gli interventi prima che il guasto fermi la produzione." },
          { q: "Cos'è la manutenzione autonoma nella TPM?", options: ["Macchine che si riparano da sole", "L'operatore pulisce, ispeziona e segnala anomalie", "Manutenzione affidata a un esterno", "Eliminare i manutentori"], correct: 1, why: "Coinvolgere l'operatore in pulizia e ispezioni di base intercetta i problemi prima che diventino guasti." },
          { q: "Perché tenere un registro dei fermi?", options: ["È un obbligo di legge", "Per sapere quali macchine costano di più e dove concentrare la preventiva", "Per riempire scartoffie", "Non serve"], correct: 1, why: "Il registro rivela i guasti ricorrenti e i pochi impianti che causano la maggior parte dei fermi." },
        ],
        reflections: ["Qual è l'impianto che ti causa più fermi imprevisti? Definisci un mini-piano di manutenzione autonoma di fine turno per ridurli."],
      },
      {
        id: "p2l4",
        title: "Verificare la marginalità della produzione",
        minutes: 15,
        blocks: [
          { type: "p", heading: "Fatturare non è guadagnare", text: "Un'azienda può crescere a fatturato e perdere marginalità: serramenti venduti a prezzi che non coprono i costi reali, commesse complesse sottostimate, sprechi che mangiano il margine. Il direttore di produzione incide direttamente sul margine attraverso resa materiali, ore di lavoro, scarti e rilavorazioni." },
          { type: "list", heading: "I concetti chiave", items: ["Costo del venduto: materiali (profili, vetri, ferramenta) + manodopera diretta + costi di trasformazione.", "Margine di contribuzione: prezzo di vendita − costi variabili. Dice quanto ogni serramento contribuisce a coprire i costi fissi e generare utile.", "Costi fissi: vanno coperti a prescindere (affitto, ammortamenti, struttura).", "Marginalità per tipologia: non tutti i prodotti rendono uguale; alcuni 'best seller' possono avere margini bassi."] },
          { type: "example", heading: "Sul campo", text: "Le finestre standard hanno margine basso ma alti volumi; gli scorrevoli su misura hanno margine alto ma assorbono molte ore e generano più scarti. Se non si misura il margine per tipologia, si rischia di spingere i volumi sbagliati. Una resa materiali migliorata dell'1% su grandi volumi può valere più di un aumento di prezzo." },
          { type: "callout", text: "Caccia agli sprechi che erodono il margine senza farsi vedere: scarti di taglio sui profili, rilavorazioni, tempi morti, ore extra non pianificate. Sono margine che esce dalla porta sul retro." },
          { type: "takeaways", items: ["Crescere a fatturato non significa guadagnare di più.", "Margine di contribuzione = prezzo − costi variabili.", "Misura il margine per tipologia di serramento.", "Resa materiali e scarti incidono direttamente sull'utile."] },
        ],
        quiz: [
          { q: "Il margine di contribuzione è:", options: ["Il fatturato totale", "Prezzo di vendita meno costi variabili", "L'utile netto", "Il costo dei materiali"], correct: 1, why: "È quanto resta dopo i costi variabili per coprire i costi fissi e generare utile." },
          { q: "Perché misurare il margine per tipologia di serramento?", options: ["Per fare più burocrazia", "Perché prodotti diversi rendono diversamente e si rischia di spingere i volumi sbagliati", "Per aumentare sempre i prezzi", "Non è utile in produzione"], correct: 1, why: "Senza il margine per tipologia si può spingere il prodotto ad alto volume ma basso margine, erodendo l'utile." },
          { q: "Su grandi volumi, migliorare dell'1% la resa materiali:", options: ["È irrilevante", "Può valere più di un aumento di prezzo", "Aumenta gli scarti", "Riguarda solo l'ufficio acquisti"], correct: 1, why: "Su alti volumi un piccolo miglioramento di resa si moltiplica e impatta molto sul margine complessivo." },
        ],
        reflections: ["Quale tipologia di serramento sospetti renda meno di quanto sembri? Quali costi nascosti (ore, scarti, rilavorazioni) andrebbero verificati?"],
      },
      {
        id: "p2l5",
        title: "Riduzione degli sprechi (Lean)",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Lo spreco è tutto ciò che il cliente non pagherebbe", text: "Nel pensiero Lean, valore è ciò per cui il cliente paga (un serramento conforme, consegnato in tempo). Tutto il resto è spreco (muda) da ridurre. Imparare a 'vedere' gli sprechi è il primo passo: una volta visti, non si possono più ignorare." },
          { type: "list", heading: "I 7+1 sprechi", items: ["Sovrapproduzione: produrre più o prima del necessario.", "Attese: materiale o persone ferme in attesa del passo successivo.", "Trasporti: movimentazioni inutili di materiale tra reparti.", "Sovra-processo: lavorazioni o controlli più del necessario.", "Scorte: magazzino eccessivo che immobilizza denaro e nasconde problemi.", "Movimenti: gesti inutili dell'operatore (cercare attrezzi, spostarsi).", "Difetti: scarti e rilavorazioni.", "(+1) Talento inutilizzato: idee e competenze delle persone non ascoltate."] },
          { type: "example", heading: "Sul campo", text: "Le 5S sul banco di assemblaggio (Separare, Sistemare, Splendere/pulire, Standardizzare, Sostenere) eliminano lo spreco di movimento: ogni attrezzo ha un posto, l'operatore non perde minuti a cercarli. Sembra banale, ma minuti × pezzi × giorni diventano ore di capacità ritrovata." },
          { type: "callout", text: "Mappa il flusso del valore (value stream): segui un ordine dall'entrata alla consegna e cronometra dove sta fermo. Quasi sempre il pezzo aspetta molto più di quanto venga lavorato: lì c'è il lead time da recuperare." },
          { type: "takeaways", items: ["Spreco = ciò che non aggiunge valore per il cliente.", "I 7+1 sprechi: una griglia per 'vedere' i problemi.", "Le 5S liberano capacità nascosta sui banchi.", "Il talento inutilizzato è lo spreco più caro."] },
        ],
        quiz: [
          { q: "Nel Lean, 'valore' è:", options: ["Tutto ciò che produci", "Ciò per cui il cliente è disposto a pagare", "Le scorte di magazzino", "Il numero di controlli"], correct: 1, why: "Il valore è definito dal cliente; tutto ciò che non lo crea è spreco da ridurre." },
          { q: "Quale di questi NON è uno dei 7 sprechi classici?", options: ["Attese", "Difetti", "Formazione delle persone", "Sovrapproduzione"], correct: 2, why: "La formazione crea valore; gli sprechi sono attese, difetti, sovrapproduzione, trasporti, scorte, movimenti, sovra-processo." },
          { q: "Le 5S servono soprattutto a ridurre lo spreco di:", options: ["Difetti", "Movimento e ricerca degli attrezzi", "Sovrapproduzione", "Scorte di vetro"], correct: 1, why: "Organizzando la postazione si eliminano i movimenti e i tempi di ricerca inutili." },
        ],
        reflections: ["Cammina mentalmente lungo una tua linea: dove vedi più chiaramente uno dei 7 sprechi? Quale elimineresti per primo e come?"],
      },
    ],
    plan: {
      intro: "Trasforma le metriche e i principi Lean in interventi concreti sul tuo reparto. Compila e porta al consulente.",
      prompts: [
        { id: "p2q1", label: "L'indicatore che inizierò a misurare", hint: "Quale KPI, come lo raccoglierai e dove lo esporrai in reparto." },
        { id: "p2q2", label: "Un controllo qualità da spostare a monte", hint: "Difetto, punto di controllo nuovo e dima/poka-yoke." },
        { id: "p2q3", label: "Mini-piano di manutenzione preventiva", hint: "Impianto critico e attività di manutenzione autonoma di fine turno." },
        { id: "p2q4", label: "Verifica di marginalità", hint: "Tipologia di serramento da analizzare e costi nascosti da verificare." },
        { id: "p2q5", label: "Uno spreco da eliminare", hint: "Quale dei 7 sprechi, dove, e la prima azione (es. 5S su un banco)." },
      ],
    },
  },

  {
    id: "p3",
    n: "03",
    title: "Leadership & Delega",
    tagline: "Da capo a leader: guidare e far crescere il team",
    color: "var(--petrol)",
    lessons: [
      {
        id: "p3l1",
        title: "Da capo a leader: autorità e autorevolezza",
        minutes: 12,
        blocks: [
          { type: "p", heading: "Due tipi di potere", text: "L'autorità è data dal ruolo: puoi dare ordini perché sei il direttore. L'autorevolezza la guadagni: le persone ti seguono perché si fidano della tua competenza e del tuo modo di trattarle. Chi ha solo autorità ottiene obbedienza in presenza; chi ha autorevolezza ottiene impegno anche quando non lo stai guardando." },
          { type: "list", heading: "Leadership situazionale", items: ["Non esiste uno stile giusto sempre: dipende dalla persona e dal compito.", "Con un neoassunto: più direttivo, istruzioni chiare e controllo.", "Con un esperto motivato: delega e autonomia.", "Con chi è capace ma demotivato: supporto e coinvolgimento, non controllo.", "L'errore è trattare tutti allo stesso modo."] },
          { type: "example", heading: "Sul campo", text: "Un direttore micro-gestisce anche il caposquadra ventennale: risultato, l'esperto si sente svalutato e smette di prendere iniziativa. Adattare lo stile (delegare all'esperto, guidare il neoassunto) libera tempo del direttore e responsabilizza chi può." },
          { type: "callout", text: "L'autorevolezza si costruisce con coerenza: fai quello che dici, sii prevedibile nei principi. La sicurezza, la qualità, il rispetto non sono negoziabili a seconda dell'umore." },
          { type: "takeaways", items: ["Autorità = ruolo; autorevolezza = fiducia guadagnata.", "Lo stile di leadership si adatta a persona e compito.", "Micro-gestire gli esperti li demotiva.", "La coerenza costruisce credibilità."] },
        ],
        quiz: [
          { q: "La differenza tra autorità e autorevolezza è:", options: ["Sono sinonimi", "L'autorità viene dal ruolo, l'autorevolezza si guadagna con fiducia e competenza", "L'autorevolezza viene dal contratto", "L'autorità si guadagna sul campo"], correct: 1, why: "L'autorità è formale; l'autorevolezza è il credito di fiducia che spinge le persone a seguirti volontariamente." },
          { q: "Con un collaboratore esperto e motivato lo stile migliore è:", options: ["Direttivo e di controllo", "Delega e autonomia", "Ignorarlo", "Più riunioni"], correct: 1, why: "Chi è competente e motivato dà il meglio con autonomia; il controllo eccessivo lo demotiva." },
          { q: "Trattare tutti i collaboratori allo stesso modo è:", options: ["Giusto, è equità", "Un errore: stile e supporto vanno adattati a persona e compito", "L'unico modo equo", "Indispensabile per legge"], correct: 1, why: "L'equità è dare a ciascuno ciò di cui ha bisogno per rendere, non lo stesso trattamento indipendentemente dal livello." },
        ],
        reflections: ["Pensa a due collaboratori molto diversi: come dovresti adattare il tuo stile con ciascuno?"],
      },
      {
        id: "p3l2",
        title: "L'arte della delega",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Perché non deleghiamo", text: "'Faccio prima io', 'nessuno lo fa come me', 'non mi fido'. Sono le frasi che intrappolano il direttore nell'operativo e gli impediscono di fare il suo vero lavoro: guidare, migliorare, decidere. Non delegare significa essere il collo di bottiglia della propria azienda e non far crescere nessuno." },
          { type: "list", heading: "I livelli di delega", items: ["Livello 1: 'Fai esattamente questo e riferisci.' (poca autonomia)", "Livello 2: 'Studia il problema e proponimi le opzioni, decido io.'", "Livello 3: 'Decidi tu, ma avvisami prima di agire.'", "Livello 4: 'Decidi e agisci, riferisci dopo.'", "Livello 5: 'Gestisci tu, mi fido.' (piena autonomia)"] },
          { type: "p", heading: "Delegare bene", text: "Delega il risultato e i confini (vincoli, budget, scadenza, livello di autonomia), non i singoli passi. Spiega il perché, verifica che sia chiaro, accordati su come e quando ti aggiornerà. Poi resisti alla tentazione di rifarlo: se intervieni a ogni piccolo scostamento, hai delegato solo a parole." },
          { type: "callout", text: "Delegare non è scaricare il lavoro brutto: è affidare compiti che fanno crescere. E delegare l'autorità senza la responsabilità (o viceversa) non funziona: vanno insieme." },
          { type: "takeaways", items: ["Non delegare = essere il collo di bottiglia.", "Esistono livelli di delega: scegli quello adatto alla persona.", "Delega il risultato e i confini, non ogni passo.", "Autorità e responsabilità vanno delegate insieme."] },
        ],
        quiz: [
          { q: "Delegare bene significa soprattutto:", options: ["Spiegare ogni singolo passo da eseguire", "Definire il risultato atteso, i confini e il livello di autonomia", "Scaricare i compiti sgradevoli", "Controllare a ogni minimo scostamento"], correct: 1, why: "Si delega un risultato con confini chiari, lasciando alla persona il 'come', adattando l'autonomia al suo livello." },
          { q: "Il rischio di non delegare mai è:", options: ["Crescere troppo in fretta", "Diventare il collo di bottiglia e non far crescere il team", "Spendere troppo", "Avere troppa autonomia"], correct: 1, why: "Tenendo tutto per sé il capo rallenta tutto e impedisce lo sviluppo dei collaboratori." },
          { q: "Cosa NON si dovrebbe fare dopo aver delegato?", options: ["Concordare i punti di aggiornamento", "Rifare il lavoro al primo piccolo scostamento", "Spiegare il perché", "Definire la scadenza"], correct: 1, why: "Riprendersi il compito al primo scostamento annulla la delega e demotiva la persona." },
        ],
        reflections: ["Scegli un compito che fai tu ma che potresti delegare: a chi, a quale livello di delega, e con quali confini?"],
      },
      {
        id: "p3l3",
        title: "Fiducia, responsabilizzazione e accountability",
        minutes: 13,
        blocks: [
          { type: "p", heading: "La fiducia è la valuta del team", text: "Dove c'è fiducia, le informazioni circolano, i problemi emergono presto, le persone osano. Dove non c'è, si nascondono gli errori e si lavora per coprirsi. La fiducia si costruisce con coerenza, trasparenza e dando per primo: chi vuole essere informato deve informare, chi vuole iniziativa deve concederla." },
          { type: "list", heading: "Accountability sana", items: ["Aspettative chiare: ognuno sa di cosa è responsabile e cosa significa 'fatto bene'.", "Si risponde dei risultati, non si cercano colpevoli: 'cosa è successo e come lo sistemiamo' batte 'di chi è la colpa'.", "Gli impegni sono pubblici e verificati: chi prende un impegno lo onora o avvisa per tempo.", "L'errore onesto è occasione di apprendimento; ciò che non si tollera è nasconderlo."] },
          { type: "example", heading: "Sul campo", text: "Un caposquadra ammette di aver sbagliato una programmazione e lo segnala subito: il direttore lo ringrazia per la trasparenza e affrontano insieme il recupero. Se invece l'avesse punito davanti a tutti, la volta dopo l'errore sarebbe stato nascosto fino a diventare un reso del cliente." },
          { type: "callout", text: "Punire la trasparenza è il modo più rapido per smettere di sapere cosa succede nel tuo reparto. Premia chi porta i problemi alla luce." },
          { type: "takeaways", items: ["La fiducia fa emergere i problemi presto.", "Accountability = rispondere dei risultati, non caccia ai colpevoli.", "Aspettative chiare e impegni verificati.", "Non punire la trasparenza, premiala."] },
        ],
        quiz: [
          { q: "L'accountability sana si concentra su:", options: ["Trovare il colpevole", "Cosa è successo e come si sistema, con aspettative chiare", "Punire pubblicamente", "Evitare i numeri"], correct: 1, why: "Si risponde dei risultati e si impara dagli errori, anziché cercare colpevoli." },
          { q: "Cosa succede se punisci chi segnala un proprio errore?", options: ["Migliora la disciplina", "Le persone inizieranno a nascondere i problemi", "Aumenta la fiducia", "Si riducono i resi"], correct: 1, why: "Punire la trasparenza spinge a nascondere gli errori, che esplodono più avanti e più costosi." },
          { q: "La fiducia in un team si costruisce soprattutto con:", options: ["Più controlli", "Coerenza, trasparenza e dare per primo", "Bonus economici", "Regole più rigide"], correct: 1, why: "La fiducia nasce dalla coerenza tra parole e fatti e dal concedere per primi apertura e iniziativa." },
        ],
        reflections: ["Nel tuo reparto le persone segnalano gli errori o tendono a coprirli? Cosa potresti cambiare nel tuo modo di reagire?"],
      },
      {
        id: "p3l4",
        title: "Sviluppare le persone: coaching di base",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Il capo che fa crescere", text: "Un buon leader non risolve tutti i problemi al posto degli altri: aiuta gli altri a diventare capaci di risolverli. Dare sempre la soluzione crea dipendenza; fare le domande giuste crea autonomia. Significa a volte accettare che una persona impieghi più tempo o sbagli, per imparare." },
          { type: "list", heading: "Il modello GROW per una conversazione di crescita", items: ["Goal: qual è l'obiettivo? Cosa vuoi ottenere?", "Reality: qual è la situazione attuale, i fatti?", "Options: quali strade possibili? (falle proporre alla persona)", "Will / Way forward: cosa farai concretamente e quando?"] },
          { type: "example", heading: "Sul campo", text: "Un operatore ti chiede come risolvere un problema sul fissaggio. Invece di dargli la risposta, chiedi: 'tu come lo affronteresti? Cosa hai già provato? Quali rischi vedi?'. Spesso arriva da solo alla soluzione e la prossima volta non avrà bisogno di te. Tu ci metti più tempo oggi, ne risparmi molto domani." },
          { type: "callout", text: "Investi tempo nello sviluppo dei collaboratori chiave: è il moltiplicatore più potente del tuo tempo. Ogni persona resa autonoma è capacità che si libera per te." },
          { type: "takeaways", items: ["Far crescere = aiutare a diventare capaci, non risolvere al posto loro.", "Le domande creano autonomia; le risposte creano dipendenza.", "GROW: Goal, Reality, Options, Will.", "Sviluppare le persone moltiplica il tuo tempo."] },
        ],
        quiz: [
          { q: "Un collaboratore ti chiede la soluzione a un problema che potrebbe risolvere. La risposta più 'da leader' è:", options: ["Dargli subito la soluzione", "Fargli domande per portarlo a trovarla da solo", "Risolverlo tu in silenzio", "Dirgli di arrangiarsi"], correct: 1, why: "Le domande sviluppano autonomia; dare sempre la soluzione crea dipendenza e ti tiene nell'operativo." },
          { q: "Nel modello GROW, la 'O' sta per:", options: ["Obbligo", "Options (opzioni, possibili strade)", "Ordine", "Obiettivo"], correct: 1, why: "GROW = Goal, Reality, Options, Will: la O è la fase di esplorazione delle opzioni." },
          { q: "Perché vale la pena investire tempo nello sviluppo dei collaboratori chiave?", options: ["Per riempire la giornata", "Perché ogni persona resa autonoma libera tempo e capacità", "Per delegare il lavoro brutto", "Non vale la pena"], correct: 1, why: "Sviluppare le persone è un moltiplicatore: l'investimento iniziale di tempo ritorna in autonomia e capacità." },
        ],
        reflections: ["Chi nel tuo team ha più potenziale di crescita? Pensa a una conversazione GROW concreta che potresti fare con lui."],
      },
    ],
    plan: {
      intro: "Trasforma i principi di leadership e delega in scelte concrete sul tuo team. Compila e porta al consulente.",
      prompts: [
        { id: "p3q1", label: "Come adatterò il mio stile", hint: "Due collaboratori diversi e lo stile (direttivo/delega/supporto) per ciascuno." },
        { id: "p3q2", label: "Una delega che attiverò", hint: "Compito, persona, livello di delega e confini." },
        { id: "p3q3", label: "Come premio la trasparenza", hint: "Una cosa concreta che cambierai nel modo di reagire agli errori." },
        { id: "p3q4", label: "Una conversazione di crescita (GROW)", hint: "Con chi, su quale obiettivo." },
      ],
    },
  },

  {
    id: "p4",
    n: "04",
    title: "Tempo & Priorità",
    tagline: "Governare il tempo invece di subirlo",
    color: "var(--petrol)",
    lessons: [
      {
        id: "p4l1",
        title: "Dove va davvero il tuo tempo",
        minutes: 11,
        blocks: [
          { type: "p", heading: "Non si gestisce ciò che non si misura", text: "La maggior parte dei capi reparto pensa di sapere come usa il proprio tempo, ma sbaglia. Per una settimana, annota a grandi blocchi cosa fai ogni ora. Quasi sempre emerge una sproporzione: tanto tempo a spegnere incendi e poco sulle attività che fanno davvero la differenza (migliorare processi, sviluppare persone, pianificare)." },
          { type: "list", heading: "I ladri di tempo tipici in produzione", items: ["Interruzioni continue: 'capo, un attimo…' che frammentano la giornata.", "Riunioni senza scopo o senza decisioni.", "Rifare il lavoro degli altri invece di delegare.", "Emergenze ricorrenti che sono in realtà problemi mai risolti alla radice.", "Mancanza di pianificazione: la giornata la decidono gli altri."] },
          { type: "example", heading: "Sul campo", text: "Un direttore scopre, dopo una settimana di tracciamento, di passare quasi due ore al giorno a rispondere a micro-richieste che il caposquadra potrebbe gestire. Definendo cosa può decidere il caposquadra da solo, recupera tempo per il lavoro che solo lui può fare." },
          { type: "callout", text: "Distingui tra essere occupato ed essere efficace. Correre tutto il giorno non significa lavorare sulle cose giuste. La domanda chiave: 'questa attività la sto facendo perché conta o perché è arrivata per prima?'" },
          { type: "takeaways", items: ["Traccia il tempo per una settimana: scoprirai sorprese.", "Le emergenze ricorrenti sono problemi non risolti alla radice.", "Occupato ≠ efficace.", "Se non pianifichi la giornata, la pianificano gli altri."] },
        ],
        quiz: [
          { q: "Le 'emergenze ricorrenti' spesso sono in realtà:", options: ["Sfortuna", "Problemi mai risolti alla radice", "Colpa dei clienti", "Inevitabili"], correct: 1, why: "Ciò che si ripete come emergenza è quasi sempre un problema di processo da affrontare alla causa." },
          { q: "Qual è il primo passo per gestire meglio il tempo?", options: ["Comprare un'agenda nuova", "Tracciare per una settimana come lo usi davvero", "Fare più riunioni", "Lavorare più ore"], correct: 1, why: "Senza misurare l'uso reale del tempo non si sa dove intervenire." },
          { q: "Essere occupati e essere efficaci:", options: ["Sono la stessa cosa", "Sono cose diverse: si può correre tutto il giorno sulle cose sbagliate", "Si escludono a vicenda", "Dipendono dal fatturato"], correct: 1, why: "L'efficacia riguarda fare le cose giuste, non semplicemente fare tante cose." },
        ],
        reflections: ["Senza tracciare nulla, quale attività sospetti ti rubi più tempo di quanto meriti? Come potresti verificarlo questa settimana?"],
      },
      {
        id: "p4l2",
        title: "Prioritizzare: urgente vs importante",
        minutes: 12,
        blocks: [
          { type: "p", heading: "La trappola dell'urgenza", text: "L'urgente grida, l'importante aspetta in silenzio. Per questo tendiamo a riempire la giornata di cose urgenti (spesso poco importanti) e a rimandare ciò che è importante ma non urgente: pianificare, migliorare, formare. Ma è proprio quel quadrante che, se trascurato, genera le emergenze di domani." },
          { type: "list", heading: "La matrice di Eisenhower", items: ["Urgente + Importante: gestisci subito (crisi vere, scadenze imminenti).", "Importante + non urgente: pianifica e proteggi (qui c'è la crescita: prevenzione, formazione, miglioramento).", "Urgente + non importante: delega (interruzioni, richieste altrui che altri possono gestire).", "Né urgente né importante: elimina (perdite di tempo)."] },
          { type: "example", heading: "Sul campo", text: "Sistemare il piano di manutenzione preventiva è importante ma non urgente: rimandato per settimane, finché una macchina si ferma in piena commessa e diventa urgentissimo e costoso. Dedicare due ore a settimana al quadrante importante-non urgente riduce le emergenze future." },
          { type: "callout", text: "Ogni mattina (o sera prima) scegli le 1-3 cose che, se le fai, rendono la giornata un successo. Falle prima che arrivino le interruzioni. È la differenza tra guidare e farsi trascinare." },
          { type: "takeaways", items: ["L'urgente scaccia l'importante: difendi l'importante.", "Il quadrante importante-non urgente previene le emergenze.", "Delega l'urgente-non importante.", "Scegli ogni giorno 1-3 priorità reali."] },
        ],
        quiz: [
          { q: "Nella matrice di Eisenhower, le attività importanti ma non urgenti vanno:", options: ["Eliminate", "Pianificate e protette", "Delegate sempre", "Ignorate"], correct: 1, why: "È il quadrante della crescita e della prevenzione: va pianificato, altrimenti genera le emergenze future." },
          { q: "Le attività urgenti ma non importanti andrebbero:", options: ["Fatte subito da te", "Delegate", "Eliminate sempre", "Pianificate per dopo"], correct: 1, why: "Sono urgenti per qualcun altro o gestibili da altri: delegarle libera il tuo tempo." },
          { q: "Perché l'importante tende a essere rimandato?", options: ["Perché è facile", "Perché non grida: non ha l'urgenza che attira l'attenzione", "Perché è poco utile", "Perché lo fanno gli altri"], correct: 1, why: "L'importante-non urgente non ha pressione immediata, quindi cede il passo alle urgenze rumorose." },
        ],
        reflections: ["Quale attività importante-non urgente stai rimandando da troppo tempo? Quando, di preciso, le dedicherai tempo questa settimana?"],
      },
      {
        id: "p4l3",
        title: "Pianificare e gestire le interruzioni",
        minutes: 12,
        blocks: [
          { type: "p", heading: "Il costo nascosto delle interruzioni", text: "Ogni interruzione non costa solo il minuto della richiesta: costa anche il tempo per rientrare in concentrazione su ciò che stavi facendo. Una giornata fatta di continui 'attimi' produce molto meno di una con blocchi protetti di lavoro. In un reparto le interruzioni sono inevitabili, ma si possono incanalare." },
          { type: "list", heading: "Tecniche pratiche", items: ["Time blocking: assegna blocchi di tempo a categorie di attività (es. mattina presto per pianificare, fasce dedicate al reparto).", "Finestre per le domande: definisci momenti in cui sei disponibile per le richieste non urgenti, così non ti frammentano la giornata.", "Distingui vera emergenza da falsa urgenza: insegna al team cosa giustifica un'interruzione immediata.", "Batch: raggruppa attività simili (firme, controlli, telefonate) invece di farle sparse."] },
          { type: "example", heading: "Sul campo", text: "Il direttore comunica al team: 'per le cose non urgenti, passate tra le 11 e le 11:30; se è un fermo linea o sicurezza, sempre subito'. Le interruzioni casuali calano, e le persone imparano anche a distinguere cosa è davvero urgente." },
          { type: "callout", text: "Non puoi (e non devi) eliminare tutte le interruzioni in produzione: l'obiettivo è ridurre quelle evitabili e proteggere almeno una fascia al giorno per il lavoro che richiede testa." },
          { type: "takeaways", items: ["L'interruzione costa anche il rientro in concentrazione.", "Time blocking: proteggi fasce per il lavoro importante.", "Definisci finestre per le richieste non urgenti.", "Insegna al team a distinguere emergenza vera da falsa urgenza."] },
        ],
        quiz: [
          { q: "Perché un'interruzione costa più del minuto che dura?", options: ["Non costa di più", "Aggiunge il tempo per rientrare in concentrazione", "Perché va verbalizzata", "Per il rumore"], correct: 1, why: "Dopo un'interruzione serve tempo per riprendere il filo: è il costo nascosto della frammentazione." },
          { q: "Cos'è il 'time blocking'?", options: ["Bloccare il telefono", "Assegnare blocchi di tempo a categorie di attività", "Vietare le riunioni", "Lavorare di notte"], correct: 1, why: "Il time blocking protegge fasce dedicate, riducendo la dispersione tra mille attività diverse." },
          { q: "Una 'finestra per le domande' serve a:", options: ["Evitare di parlare col team", "Incanalare le richieste non urgenti in momenti definiti", "Eliminare le emergenze", "Fare più riunioni"], correct: 1, why: "Concentra le richieste non urgenti, riducendo le interruzioni sparse senza chiudersi alle vere emergenze." },
        ],
        reflections: ["Qual è la fascia oraria in cui rendi di più? Come potresti proteggerla dalle interruzioni evitabili?"],
      },
      {
        id: "p4l4",
        title: "Riunioni e comunicazioni che non rubano tempo",
        minutes: 11,
        blocks: [
          { type: "p", heading: "La riunione come costo", text: "Una riunione di un'ora con sei persone costa sei ore-uomo. Va trattata come un investimento: deve produrre un risultato che vale quel costo. Troppe riunioni esistono per abitudine, non per necessità, e finiscono senza decisioni." },
          { type: "list", heading: "Regole per riunioni efficaci", items: ["Obiettivo chiaro: a cosa serve questa riunione? Se non sai rispondere, non farla.", "Solo chi serve: meno persone, più efficacia.", "Ordine del giorno e durata definita.", "Si chiude con decisioni, responsabili e scadenze (chi fa cosa entro quando).", "Molte cose si risolvono con un messaggio o un briefing breve, non con una riunione."] },
          { type: "example", heading: "Sul campo", text: "Il giro di reparto quotidiano di 10 minuti in piedi, davanti ai dati, sostituisce la lunga riunione settimanale seduti: si vedono i problemi, si decide sul posto, e nessuno perde mezza giornata. In piedi, si tende anche a essere più sintetici." },
          { type: "callout", text: "Anche per email e messaggi vale la stessa disciplina: scrivi chiaro cosa chiedi e entro quando. Una comunicazione confusa genera tre scambi inutili e altrettante interruzioni." },
          { type: "takeaways", items: ["Una riunione costa la somma del tempo di tutti i presenti.", "Senza obiettivo, niente riunione.", "Si chiude con decisioni: chi fa cosa entro quando.", "Spesso un briefing breve batte una riunione lunga."] },
        ],
        quiz: [
          { q: "Una riunione efficace si chiude con:", options: ["Un buon clima", "Decisioni chiare: chi fa cosa entro quando", "Un caffè", "La promessa di rivedersi"], correct: 1, why: "Senza decisioni e responsabilità assegnate, la riunione non ha prodotto valore rispetto al suo costo." },
          { q: "Perché molte riunioni sono uno spreco?", options: ["Durano poco", "Si fanno per abitudine, senza obiettivo né decisioni", "Ci sono troppe poche persone", "Costano poco"], correct: 1, why: "Molte riunioni esistono per consuetudine e non producono decisioni, sprecando ore-uomo." },
          { q: "Il 'giro di reparto in piedi' quotidiano serve a:", options: ["Sostituire la pausa", "Vedere i problemi e decidere sul posto in pochi minuti", "Allungare la giornata", "Evitare i dati"], correct: 1, why: "Breve, davanti ai dati e in piedi, favorisce sintesi e decisioni immediate." },
        ],
        reflections: ["Quale riunione ricorrente potresti accorciare, eliminare o sostituire con un briefing breve? Come la ridisegneresti?"],
      },
    ],
    plan: {
      intro: "Trasforma la gestione del tempo in abitudini concrete. Compila e porta al consulente.",
      prompts: [
        { id: "p4q1", label: "Cosa emerge dal tracciamento del tempo", hint: "Dopo aver osservato la tua settimana: dove va il tempo davvero." },
        { id: "p4q2", label: "Le mie priorità con Eisenhower", hint: "Un'attività per ciascun quadrante e cosa farai (fare/pianificare/delegare/eliminare)." },
        { id: "p4q3", label: "La fascia che proteggerò", hint: "Quale blocco di tempo difenderai e come gestirai le interruzioni." },
        { id: "p4q4", label: "Una riunione da ridisegnare", hint: "Quale, e come la renderai più efficace o la sostituirai." },
      ],
    },
  },

  {
    id: "p5",
    n: "05",
    title: "Problem Solving & Decisioni",
    tagline: "Affrontare i problemi alla radice e decidere meglio",
    color: "var(--petrol)",
    lessons: [
      {
        id: "p5l1",
        title: "Definire bene il problema",
        minutes: 12,
        blocks: [
          { type: "p", heading: "Un problema ben definito è mezzo risolto", text: "La fretta di risolvere porta ad agire sul sintomo. Prima di cercare soluzioni, fermati a definire bene il problema: cosa succede esattamente, dove, da quando, con quale frequenza, quanto costa. Un problema vago ('la qualità non va') porta a soluzioni vaghe; un problema definito ('il 7% delle ante della linea 2 esce fuori squadra dal lunedì') indica già dove guardare." },
          { type: "list", heading: "Domande per inquadrare il problema", items: ["Cosa, esattamente? (fatti, non opinioni)", "Dove e quando accade, e dove no?", "Da quando? È cambiato qualcosa in quel momento?", "Quanto è grande? (frequenza, costo, impatto)", "Qual è la differenza tra la situazione attuale e quella desiderata?"] },
          { type: "example", heading: "Sul campo", text: "'Abbiamo troppi resi' è un sintomo. Definendo meglio: 'i resi riguardano per l'80% gli scorrevoli, per problemi di scorrevolezza, comparsi dopo il cambio fornitore di ferramenta'. Ora il problema è circoscritto e indica già la pista da seguire." },
          { type: "callout", text: "Diffida del salto immediato alla soluzione ('compriamo una macchina nuova'). Spesso la soluzione costosa risolve il problema sbagliato. Investi tempo nella definizione: è il momento più redditizio." },
          { type: "takeaways", items: ["Definire bene il problema è metà del lavoro.", "Distingui sintomo da problema.", "Usa i fatti: cosa, dove, quando, quanto.", "Diffida delle soluzioni rapide a problemi mal definiti."] },
        ],
        quiz: [
          { q: "Qual è la formulazione migliore di un problema?", options: ["La qualità non va", "Abbiamo troppi resi", "Il 7% delle ante della linea 2 esce fuori squadra dal lunedì", "Le persone sbagliano"], correct: 2, why: "È specifico nei fatti (cosa, dove, quanto, quando): indica già dove indagare." },
          { q: "Perché è rischioso saltare subito alla soluzione?", options: ["È sempre meglio agire", "Si rischia di risolvere il sintomo o il problema sbagliato", "Le soluzioni costano poco", "Non è rischioso"], correct: 1, why: "Senza definire il problema si agisce sul sintomo, magari con una soluzione costosa e inefficace." },
          { q: "Definire 'dove il problema NON accade' serve a:", options: ["Niente", "Restringere il campo e individuare cosa è diverso dove funziona", "Allungare l'analisi", "Trovare colpevoli"], correct: 1, why: "Confrontare dove accade e dove no aiuta a isolare la causa, evidenziando le differenze rilevanti." },
        ],
        reflections: ["Prendi un problema ricorrente del tuo reparto e riscrivilo in modo specifico (cosa, dove, da quando, quanto)."],
      },
      {
        id: "p5l2",
        title: "Trovare le cause radice",
        minutes: 14,
        blocks: [
          { type: "p", heading: "Curare la causa, non il sintomo", text: "Se tratti solo il sintomo, il problema torna. Il fuori squadra rilavorato torna la settimana dopo se non capisci perché succede. L'analisi delle cause radice serve a scendere dal 'cosa è successo' al 'perché, davvero'." },
          { type: "list", heading: "Due strumenti semplici", items: ["I 5 Perché: chiedi 'perché?' in sequenza finché arrivi a una causa su cui puoi agire. Esempio: l'anta è fuori squadra → perché la saldatura è storta → perché la dima è usurata → perché non è prevista la sua sostituzione → perché manca un piano di controllo delle attrezzature.", "Diagramma di Ishikawa (a lisca di pesce): cerca le cause possibili per categorie — Macchine, Metodi, Materiali, Manodopera, Misure, Ambiente. Aiuta a non fissarsi sulla prima ipotesi."] },
          { type: "example", heading: "Sul campo", text: "Difetto di tenuta all'acqua su una serie di finestre. Con i 5 Perché si arriva non al 'montatore distratto', ma a una guarnizione di lotto difettoso accettata senza controllo in ingresso: la vera azione non è sgridare il montatore ma introdurre un controllo accettazione materiali." },
          { type: "callout", text: "Attenzione a fermarti troppo presto (la prima causa comoda) o a cercare un colpevole invece di una causa di processo. La domanda guida: 'cosa nel sistema ha permesso che accadesse?'." },
          { type: "takeaways", items: ["Il sintomo curato torna: cerca la causa radice.", "5 Perché: scendi finché trovi una causa su cui agire.", "Ishikawa: esplora le cause per categorie (le 5-6 M).", "Cerca cause di processo, non colpevoli."] },
        ],
        quiz: [
          { q: "La tecnica dei '5 Perché' serve a:", options: ["Contare i difetti", "Risalire dalla manifestazione del problema alla sua causa radice", "Assegnare colpe", "Misurare l'OEE"], correct: 1, why: "Chiedendo ripetutamente 'perché' si scende dal sintomo alla causa profonda su cui agire." },
          { q: "Il diagramma di Ishikawa organizza le cause per:", options: ["Ordine alfabetico", "Categorie (Macchine, Metodi, Materiali, Manodopera, Misure, Ambiente)", "Costo", "Reparto"], correct: 1, why: "Le categorie (le 'M') aiutano a esplorare tutte le possibili cause senza fissarsi sulla prima." },
          { q: "Qual è l'errore tipico nell'analisi delle cause?", options: ["Usare i dati", "Fermarsi alla prima causa comoda o cercare un colpevole", "Fare troppe domande", "Coinvolgere il team"], correct: 1, why: "Fermarsi presto o personalizzare la colpa impedisce di trovare la causa di processo che fa tornare il problema." },
        ],
        reflections: ["Applica i 5 Perché al problema che hai definito nella lezione precedente: dove arrivi come causa radice?"],
      },
      {
        id: "p5l3",
        title: "Generare soluzioni e il ciclo PDCA",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Più opzioni prima di scegliere", text: "La prima soluzione che viene in mente raramente è la migliore. Genera più opzioni prima di decidere, anche coinvolgendo chi lavora sul problema ogni giorno: spesso ha le idee più pratiche. Poi valuta con criteri espliciti, non a sensazione." },
          { type: "list", heading: "Valutare le soluzioni", items: ["Efficacia: quanto risolve davvero la causa radice?", "Costo e fattibilità: tempo, denaro, complessità.", "Effetti collaterali: crea problemi altrove?", "Reversibilità: se non funziona, posso tornare indietro facilmente?"] },
          { type: "p", heading: "Il ciclo PDCA (Plan-Do-Check-Act)", text: "Plan: pianifica l'intervento e cosa ti aspetti. Do: provalo, possibilmente in piccolo (un turno, una linea). Check: misura se ha funzionato rispetto all'atteso. Act: se funziona, standardizzalo ed estendilo; se no, correggi e riprova. È un ciclo, non un colpo solo: il miglioramento è iterativo." },
          { type: "example", heading: "Sul campo", text: "Per ridurre il fuori squadra introduci una dima di controllo dopo la saldatura, ma solo su una linea per due settimane (Do in piccolo). Misuri il calo dei difetti (Check). Se conferma, lo estendi alle altre linee come standard (Act). Hai imparato a basso rischio prima di cambiare tutto." },
          { type: "callout", text: "Prova in piccolo prima di cambiare tutto: un test su una linea costa poco e ti evita di estendere un errore a tutto il reparto. Standardizza solo ciò che hai verificato." },
          { type: "takeaways", items: ["Genera più opzioni; coinvolgi chi conosce il problema.", "Valuta con criteri espliciti (efficacia, costo, effetti, reversibilità).", "PDCA: pianifica, prova, verifica, standardizza.", "Sperimenta in piccolo prima di estendere."] },
        ],
        quiz: [
          { q: "Nel ciclo PDCA, la fase 'Check' consiste nel:", options: ["Pianificare l'intervento", "Misurare se la soluzione ha funzionato rispetto all'atteso", "Standardizzare subito", "Cercare nuove idee"], correct: 1, why: "Check verifica con i dati l'effetto del test prima di estenderlo (Act)." },
          { q: "Perché provare una soluzione 'in piccolo'?", options: ["Per perdere tempo", "Per imparare a basso rischio prima di estendere un eventuale errore", "Per evitare di misurare", "Perché è obbligatorio"], correct: 1, why: "Un test su scala ridotta limita i danni se la soluzione non funziona e fornisce dati reali." },
          { q: "Coinvolgere chi lavora sul problema nel generare soluzioni:", options: ["Fa perdere autorevolezza", "Porta spesso le idee più pratiche e aumenta l'adesione", "Rallenta sempre", "Non serve"], correct: 1, why: "Chi vive il problema ogni giorno ha conoscenze pratiche e si impegna di più nelle soluzioni che ha contribuito a creare." },
        ],
        reflections: ["Per la causa radice individuata, genera almeno due soluzioni alternative e definisci un test 'in piccolo' (PDCA) per una di esse."],
      },
      {
        id: "p5l4",
        title: "Decidere bene sotto incertezza",
        minutes: 13,
        blocks: [
          { type: "p", heading: "Decidere è scegliere con informazioni incomplete", text: "Aspettare la certezza assoluta significa non decidere mai e lasciare che le cose decidano per te. Decidere bene non vuol dire avere sempre ragione, ma seguire un buon processo con le informazioni disponibili e accettare un margine di rischio gestito." },
          { type: "list", heading: "Trappole cognitive da conoscere", items: ["Conferma: cerchiamo dati che confermano ciò che già pensiamo e ignoriamo il resto.", "Ancoraggio: ci fissiamo sul primo numero o sulla prima ipotesi sentita.", "Costi affondati: insistiamo su una scelta sbagliata 'perché ci abbiamo già investito'.", "Eccesso di sicurezza: sottostimiamo i rischi e i tempi."] },
          { type: "p", heading: "Decisioni reversibili vs irreversibili", text: "Per le decisioni facilmente reversibili, decidi in fretta e correggi se serve: l'analisi eccessiva costa più dell'errore. Per quelle irreversibili o molto costose (un investimento importante, un'assunzione chiave), prenditi più tempo, raccogli più dati e confrontati. Adatta la cura alla posta in gioco." },
          { type: "callout", text: "Chiediti: 'questa decisione è reversibile?'. Se sì, la velocità vale più della perfezione. Se no, rallenta. E annota perché hai deciso così: rivedere le decisioni passate ti insegna a decidere meglio." },
          { type: "takeaways", items: ["Decidere = scegliere con informazioni incomplete e rischio gestito.", "Conosci le trappole: conferma, ancoraggio, costi affondati, eccesso di sicurezza.", "Reversibile → decidi veloce; irreversibile → rallenta.", "Annota il perché delle decisioni per imparare."] },
        ],
        quiz: [
          { q: "La 'trappola dei costi affondati' porta a:", options: ["Decidere troppo in fretta", "Insistere su una scelta sbagliata perché ci si è già investito", "Cercare troppi dati", "Delegare le decisioni"], correct: 1, why: "Si continua a investire in una strada perdente per non 'sprecare' quanto già speso, peggiorando la situazione." },
          { q: "Per una decisione facilmente reversibile conviene:", options: ["Analizzare per settimane", "Decidere in fretta e correggere se serve", "Non decidere", "Aspettare la certezza"], correct: 1, why: "Se l'errore è facilmente correggibile, la velocità vale più di un'analisi lunga e costosa." },
          { q: "Il bias di conferma consiste nel:", options: ["Confermare gli ordini", "Cercare solo i dati che confermano ciò che già si pensa", "Decidere a caso", "Chiedere conferma agli altri"], correct: 1, why: "Si dà peso alle informazioni che confermano la propria ipotesi, ignorando quelle contrarie." },
        ],
        reflections: ["Pensa a una decisione importante che devi prendere: è reversibile o no? Quale trappola cognitiva rischia di influenzarti di più?"],
      },
    ],
    plan: {
      intro: "Trasforma il metodo di problem solving in un caso reale del tuo reparto. Compila e porta al consulente.",
      prompts: [
        { id: "p5q1", label: "Il problema, definito bene", hint: "Cosa, dove, da quando, quanto costa." },
        { id: "p5q2", label: "La causa radice", hint: "Risultato dei 5 Perché o dell'Ishikawa." },
        { id: "p5q3", label: "Le soluzioni e il test PDCA", hint: "Opzioni considerate e il test 'in piccolo' che lancerai." },
        { id: "p5q4", label: "La decisione e i suoi rischi", hint: "La scelta, se è reversibile, e i rischi/bias da tenere d'occhio." },
      ],
    },
  },
];

/* --------------------------- PERSISTENZA -------------------------------- */
/* Versione per il deploy: salva i progressi nel browser dell'utente (localStorage). */
const STORE_KEY = "formazione-serramenti:stato:v1";
const hasStore = typeof window !== "undefined" && !!window.localStorage;

async function loadState() {
  if (!hasStore) return null;
  try {
    const v = window.localStorage.getItem(STORE_KEY);
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}
async function persistState(state) {
  if (!hasStore) return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    /* fail silently, l'app continua in memoria */
  }
}

const EMPTY = { completed: {}, quiz: {}, reflections: {}, plans: {}, last: null };

/* ----------------------------- UTILITY ---------------------------------- */
const allLessons = PILLARS.flatMap((p) => p.lessons);
const TOTAL_LESSONS = allLessons.length;
const findPillar = (id) => PILLARS.find((p) => p.id === id);
const findLesson = (pid, lid) => findPillar(pid)?.lessons.find((l) => l.id === lid);
function pillarProgress(pillar, completed) {
  const done = pillar.lessons.filter((l) => completed[l.id]).length;
  return { done, total: pillar.lessons.length, pct: pillar.lessons.length ? done / pillar.lessons.length : 0 };
}

/* ============================== ROOT APP ================================= */
export default function App() {
  const [state, setState] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState({ name: "home" });
  const [printData, setPrintData] = useState(null);
  const saveTimer = useRef(null);

  // carica all'avvio
  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await loadState();
      if (mounted) {
        if (s) {
          setState({ ...EMPTY, ...s });
          if (s.last) setView({ name: "pillar", pid: s.last.pid });
        }
        setLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // salva con debounce
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persistState(state), 500);
    return () => saveTimer.current && clearTimeout(saveTimer.current);
  }, [state, loaded]);

  // stampa
  useEffect(() => {
    if (printData && typeof window !== "undefined") {
      const t = setTimeout(() => {
        window.print();
        setPrintData(null);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [printData]);

  const update = useCallback((fn) => setState((prev) => fn({ ...prev })), []);

  const completeLesson = (lid, pid) =>
    update((s) => {
      s.completed = { ...s.completed, [lid]: true };
      s.last = { pid, lid };
      return s;
    });
  const setQuiz = (lid, payload) =>
    update((s) => {
      s.quiz = { ...s.quiz, [lid]: { ...(s.quiz[lid] || {}), ...payload } };
      return s;
    });
  const setReflection = (key, text) =>
    update((s) => {
      s.reflections = { ...s.reflections, [key]: text };
      return s;
    });
  const setPlan = (pid, promptId, text) =>
    update((s) => {
      const cur = s.plans[pid] || {};
      s.plans = { ...s.plans, [pid]: { ...cur, [promptId]: text } };
      return s;
    });
  const resetAll = () => {
    setState(EMPTY);
    setView({ name: "home" });
  };

  const overall = useMemo(() => {
    const done = allLessons.filter((l) => state.completed[l.id]).length;
    return { done, total: TOTAL_LESSONS, pct: done / TOTAL_LESSONS };
  }, [state.completed]);

  const goPillar = (pid) => { update((s) => ({ ...s, last: { ...(s.last || {}), pid } })); setView({ name: "pillar", pid }); };
  const goLesson = (pid, lid) => setView({ name: "lesson", pid, lid });
  const goPlan = (pid) => setView({ name: "plan", pid });
  const goHome = () => setView({ name: "home" });

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        <Header overall={overall} onHome={goHome} onReset={resetAll} loaded={loaded} />

        <main className="content">
          {view.name === "home" && (
            <Home completed={state.completed} overall={overall} onOpen={goPillar} />
          )}
          {view.name === "pillar" && (
            <PillarPage
              pillar={findPillar(view.pid)}
              completed={state.completed}
              onLesson={goLesson}
              onPlan={goPlan}
              onBack={goHome}
            />
          )}
          {view.name === "lesson" && (
            <LessonPage
              pillar={findPillar(view.pid)}
              lesson={findLesson(view.pid, view.lid)}
              state={state}
              setQuiz={setQuiz}
              setReflection={setReflection}
              completeLesson={completeLesson}
              onBack={() => goPillar(view.pid)}
              onLesson={goLesson}
            />
          )}
          {view.name === "plan" && (
            <PlanPage
              pillar={findPillar(view.pid)}
              answers={state.plans[view.pid] || {}}
              onChange={(promptId, text) => setPlan(view.pid, promptId, text)}
              onBack={() => goPillar(view.pid)}
              onPrint={(pillar, answers) => setPrintData({ pillar, answers })}
            />
          )}
        </main>

        <footer className="foot">
          <div className="foot-brand">
            <span className="foot-by mono">Percorso a cura di</span>
            <span className="foot-logo"><img src={LOGO} alt="SmartValue Management Consulting" /></span>
          </div>
          <span className="mono">Percorso ibrido · app + incontri quindicinali col consulente</span>
          {!hasStore && <span className="foot-warn">Il tuo browser non consente il salvataggio: i progressi restano solo per questa sessione.</span>}
        </footer>
      </div>

      {printData && <PrintSheet pillar={printData.pillar} answers={printData.answers} />}
    </>
  );
}

/* ============================== HEADER =================================== */
function Header({ overall, onHome, onReset, loaded }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <header className="head">
      <button className="brand" onClick={onHome} aria-label="Vai alla home">
        <WindowMark />
        <span className="brand-txt">
          <span className="brand-kicker mono">Percorso di crescita</span>
          <span className="brand-title">Direzione di Produzione</span>
        </span>
      </button>
      <div className="head-right">
        <div className="head-prog">
          <span className="mono head-prog-label">{overall.done}/{overall.total} lezioni</span>
          <div className="bar bar-sm"><span style={{ width: `${overall.pct * 100}%` }} /></div>
        </div>
        {confirm ? (
          <span className="reset-confirm">
            <span className="mono">Azzerare tutto?</span>
            <button className="btn-ghost danger" onClick={() => { onReset(); setConfirm(false); }}>Sì</button>
            <button className="btn-ghost" onClick={() => setConfirm(false)}>No</button>
          </span>
        ) : (
          <button className="btn-ghost" onClick={() => setConfirm(true)} title="Azzera i progressi">Azzera</button>
        )}
      </div>
    </header>
  );
}

/* =============================== HOME =================================== */
function Home({ completed, overall, onOpen }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow mono">5 pillar · 2 settimane ciascuno</p>
          <h1 className="hero-h1">Costruisci le competenze<br />che fanno girare il reparto.</h1>
          <p className="hero-sub">
            Teoria essenziale, esercizi e casi calati sul mondo dei serramenti in PVC. Ogni anta della finestra qui sotto è un pillar: si vetra man mano che completi le lezioni. Apri una sezione per iniziare.
          </p>
          <div className="hero-meta mono">
            <span><b>{overall.done}</b> di {overall.total} lezioni completate</span>
            <span className="dot">·</span>
            <span>{Math.round(overall.pct * 100)}% del percorso</span>
          </div>
          <div className="hero-by">
            <span className="mono">In collaborazione con</span>
            <span className="hero-logo"><img src={LOGO} alt="SmartValue Management Consulting" /></span>
          </div>
        </div>
        <WindowHero completed={completed} onOpen={onOpen} />
      </section>

      <section className="grid-pillars">
        {PILLARS.map((p) => {
          const pr = pillarProgress(p, completed);
          return (
            <button key={p.id} className="pcard" onClick={() => onOpen(p.id)}>
              <div className="pcard-top">
                <span className="pcard-n mono">{p.n}</span>
                {pr.done === pr.total ? (
                  <span className="pill done mono">Completato</span>
                ) : (
                  <span className="pill mono">{pr.done}/{pr.total}</span>
                )}
              </div>
              <h3 className="pcard-title">{p.title}</h3>
              <p className="pcard-tag">{p.tagline}</p>
              <div className="bar"><span style={{ width: `${pr.pct * 100}%` }} /></div>
              <span className="pcard-go mono">Apri →</span>
            </button>
          );
        })}
      </section>
    </div>
  );
}

/* ===== Finestra-eroe: 1 transom + 2x2 ante, una per pillar (5) ===== */
function WindowHero({ completed, onOpen }) {
  // layout finestra: frame esterno, transom in alto (p1), 2x2 sotto (p2..p5)
  const W = 360, H = 300, fr = 14; // frame
  const innerX = fr, innerY = fr, innerW = W - fr * 2, innerH = H - fr * 2;
  const transomH = 64;
  const mull = 8; // montante
  const colW = (innerW - mull) / 2;
  const rowY = innerY + transomH + mull;
  const rowH = (innerH - transomH - mull - mull) / 2;

  const panes = [
    { p: PILLARS[0], x: innerX, y: innerY, w: innerW, h: transomH },
    { p: PILLARS[1], x: innerX, y: rowY, w: colW, h: rowH },
    { p: PILLARS[2], x: innerX + colW + mull, y: rowY, w: colW, h: rowH },
    { p: PILLARS[3], x: innerX, y: rowY + rowH + mull, w: colW, h: rowH },
    { p: PILLARS[4], x: innerX + colW + mull, y: rowY + rowH + mull, w: colW, h: rowH },
  ];

  return (
    <div className="hero-window">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Finestra dei pillar">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbe6e6" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#eef3f2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#cdd9d8" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* telaio esterno PVC */}
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="var(--petrol)" />
        <rect x="6" y="6" width={W - 12} height={H - 12} rx="7" fill="var(--petrol-deep)" />
        {panes.map(({ p, x, y, w, h }) => {
          const pr = pillarProgress(p, completed);
          const tint = 0.1 + pr.pct * 0.78;
          return (
            <g key={p.id} className="pane" onClick={() => onOpen(p.id)} role="button" tabIndex={0}
               onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(p.id)}>
              <rect x={x} y={y} width={w} height={h} rx="3" fill="url(#glass)" />
              <rect x={x} y={y} width={w} height={h} rx="3" fill="var(--petrol)" opacity={tint} />
              <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke="var(--petrol-deep)" strokeWidth="1.5" />
              <text x={x + 9} y={y + 20} className="pane-n">{p.n}</text>
              {h > 50 && (
                <text x={x + 9} y={y + h - 10} className="pane-pct">{Math.round(pr.pct * 100)}%</text>
              )}
            </g>
          );
        })}
        {/* maniglia */}
        <rect x={W / 2 - 3} y={rowY + 6} width="6" height="40" rx="3" fill="var(--amber)" />
      </svg>
      <p className="hero-window-cap mono">Clicca un'anta per aprire il pillar</p>
    </div>
  );
}

function WindowMark() {
  return (
    <svg className="wmark" viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
      <rect x="1.5" y="1.5" width="25" height="25" rx="3" fill="var(--petrol)" />
      <rect x="4" y="4" width="20" height="20" rx="1.5" fill="var(--paper)" />
      <rect x="13" y="4" width="2" height="20" fill="var(--petrol)" />
      <rect x="4" y="13" width="20" height="2" fill="var(--petrol)" />
    </svg>
  );
}

/* ============================ PILLAR PAGE =============================== */
function PillarPage({ pillar, completed, onLesson, onPlan, onBack }) {
  if (!pillar) return null;
  const pr = pillarProgress(pillar, completed);
  return (
    <div className="page">
      <button className="back mono" onClick={onBack}>← Tutti i pillar</button>
      <div className="page-head">
        <span className="page-n mono">Pillar {pillar.n}</span>
        <h2 className="page-title">{pillar.title}</h2>
        <p className="page-tag">{pillar.tagline}</p>
        <div className="page-progress">
          <div className="bar"><span style={{ width: `${pr.pct * 100}%` }} /></div>
          <span className="mono">{pr.done}/{pr.total} lezioni · stimato 2 settimane</span>
        </div>
      </div>

      <ol className="lesson-list">
        {pillar.lessons.map((l, i) => {
          const done = completed[l.id];
          return (
            <li key={l.id}>
              <button className={`lrow ${done ? "is-done" : ""}`} onClick={() => onLesson(pillar.id, l.id)}>
                <span className={`lcheck ${done ? "on" : ""}`}>{done ? "✓" : i + 1}</span>
                <span className="lrow-body">
                  <span className="lrow-title">{l.title}</span>
                  <span className="lrow-meta mono">{l.minutes} min · {l.quiz.length} domande</span>
                </span>
                <span className="lrow-go mono">{done ? "Rivedi" : "Inizia"} →</span>
              </button>
            </li>
          );
        })}
      </ol>

      <button className="plan-cta" onClick={() => onPlan(pillar.id)}>
        <span className="plan-cta-ico">▣</span>
        <span className="plan-cta-body">
          <span className="plan-cta-title">Piano d'azione del pillar</span>
          <span className="plan-cta-sub">Compila gli impegni concreti da portare e discutere col consulente · stampa o scarica</span>
        </span>
        <span className="mono">Apri →</span>
      </button>
    </div>
  );
}

/* ============================ LESSON PAGE ============================== */
function LessonPage({ pillar, lesson, state, setQuiz, setReflection, completeLesson, onBack, onLesson }) {
  if (!pillar || !lesson) return null;
  const idx = pillar.lessons.findIndex((l) => l.id === lesson.id);
  const next = pillar.lessons[idx + 1];
  const qstate = state.quiz[lesson.id] || { selected: {}, checked: false };
  const done = !!state.completed[lesson.id];

  const select = (qi, oi) => {
    if (qstate.checked) return;
    setQuiz(lesson.id, { selected: { ...qstate.selected, [qi]: oi } });
  };
  const allAnswered = lesson.quiz.every((_, i) => qstate.selected[i] !== undefined);
  const score = lesson.quiz.reduce((acc, q, i) => acc + (qstate.selected[i] === q.correct ? 1 : 0), 0);

  const check = () => {
    setQuiz(lesson.id, { checked: true });
    completeLesson(lesson.id, pillar.id);
  };
  const retry = () => setQuiz(lesson.id, { selected: {}, checked: false });

  return (
    <div className="page lesson">
      <button className="back mono" onClick={onBack}>← {pillar.title}</button>
      <span className="page-n mono">Pillar {pillar.n} · Lezione {idx + 1} di {pillar.lessons.length}</span>
      <h2 className="lesson-h">{lesson.title}</h2>

      <article className="prose">
        {lesson.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </article>

      {/* QUIZ */}
      <section className="quiz">
        <div className="section-label mono"><span>Verifica</span><i /></div>
        <h3 className="quiz-h">Metti alla prova ciò che hai letto</h3>
        {lesson.quiz.map((q, qi) => {
          const sel = qstate.selected[qi];
          return (
            <div key={qi} className="qblock">
              <p className="qtext"><span className="mono qn">{qi + 1}</span>{q.q}</p>
              <div className="opts">
                {q.options.map((opt, oi) => {
                  let cls = "opt";
                  if (qstate.checked) {
                    if (oi === q.correct) cls += " correct";
                    else if (sel === oi) cls += " wrong";
                  } else if (sel === oi) cls += " picked";
                  return (
                    <button key={oi} className={cls} onClick={() => select(qi, oi)} disabled={qstate.checked}>
                      <span className="opt-mark">{qstate.checked && oi === q.correct ? "✓" : qstate.checked && sel === oi ? "✕" : String.fromCharCode(65 + oi)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {qstate.checked && (
                <p className={`why ${sel === q.correct ? "ok" : "no"}`}>{sel === q.correct ? "Esatto. " : "Da rivedere. "}{q.why}</p>
              )}
            </div>
          );
        })}

        {!qstate.checked ? (
          <button className="btn-primary" disabled={!allAnswered} onClick={check}>
            {allAnswered ? "Verifica risposte" : `Rispondi a tutte (${Object.keys(qstate.selected).length}/${lesson.quiz.length})`}
          </button>
        ) : (
          <div className="quiz-result">
            <span className="score mono">Punteggio: {score}/{lesson.quiz.length}</span>
            <button className="btn-ghost" onClick={retry}>Riprova</button>
          </div>
        )}
      </section>

      {/* RIFLESSIONE */}
      <section className="reflect">
        <div className="section-label mono"><span>Applica al tuo reparto</span><i /></div>
        {lesson.reflections.map((r, ri) => {
          const key = `${lesson.id}:${ri}`;
          return (
            <div key={ri} className="rblock">
              <label className="rprompt">{r}</label>
              <textarea
                className="ta"
                rows={3}
                placeholder="Scrivi qui la tua riflessione… (si salva da sola)"
                value={state.reflections[key] || ""}
                onChange={(e) => setReflection(key, e.target.value)}
              />
            </div>
          );
        })}
      </section>

      <div className="lesson-nav">
        {done && <span className="done-badge mono">✓ Lezione completata</span>}
        {next ? (
          <button className="btn-primary" onClick={() => onLesson(pillar.id, next.id)}>Lezione successiva →</button>
        ) : (
          <button className="btn-primary" onClick={onBack}>Torna al pillar →</button>
        )}
      </div>
    </div>
  );
}

function Block({ b }) {
  if (b.type === "p")
    return (
      <div className="blk">
        {b.heading && <h4 className="blk-h">{b.heading}</h4>}
        <p>{b.text}</p>
      </div>
    );
  if (b.type === "list")
    return (
      <div className="blk">
        {b.heading && <h4 className="blk-h">{b.heading}</h4>}
        <ul className="blk-list">
          {b.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      </div>
    );
  if (b.type === "example")
    return (
      <div className="blk example">
        <span className="example-tag mono">{b.heading || "Esempio"}</span>
        <p>{b.text}</p>
      </div>
    );
  if (b.type === "callout")
    return (
      <div className="blk callout"><p>{b.text}</p></div>
    );
  if (b.type === "takeaways")
    return (
      <div className="blk takeaways">
        <span className="tk-tag mono">Da ricordare</span>
        <ul>
          {b.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      </div>
    );
  return null;
}

/* ============================== PLAN PAGE ============================== */
function PlanPage({ pillar, answers, onChange, onBack, onPrint }) {
  if (!pillar) return null;
  const [msg, setMsg] = useState("");
  const filled = pillar.plan.prompts.filter((p) => (answers[p.id] || "").trim().length > 0).length;

  const buildMd = () => {
    let md = `# Piano d'Azione — ${pillar.title}\n\n`;
    md += `_${pillar.plan.intro}_\n\n`;
    pillar.plan.prompts.forEach((p, i) => {
      md += `## ${i + 1}. ${p.label}\n${(answers[p.id] || "").trim() || "(da compilare)"}\n\n`;
    });
    md += `\n---\nData: ${new Date().toLocaleDateString("it-IT")}\n`;
    return md;
  };

  const flash = (t) => { setMsg(t); window.setTimeout(() => setMsg(""), 5000); };

  const copyText = async () => {
    const md = buildMd();
    try {
      await navigator.clipboard.writeText(md);
      flash("Piano copiato negli appunti: incollalo dove vuoi (mail, Word, Note).");
      return;
    } catch (e) { /* fallback sotto */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = md;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash("Piano copiato negli appunti.");
    } catch (e2) {
      flash("Copia non riuscita: usa 'Stampa / PDF'.");
    }
  };

  const download = () => {
    const md = buildMd();
    try {
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `piano-azione-${pillar.id}.md`;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1500);
      flash("Se il download non parte (succede nell'anteprima), usa 'Copia testo' o 'Stampa / PDF'.");
    } catch (e) {
      flash("Download non disponibile qui: usa 'Copia testo' o 'Stampa / PDF'.");
    }
  };

  return (
    <div className="page plan">
      <button className="back mono" onClick={onBack}>← {pillar.title}</button>
      <span className="page-n mono">Pillar {pillar.n} · Piano d'azione</span>
      <h2 className="page-title">Dalla teoria agli impegni concreti</h2>
      <p className="plan-intro">{pillar.plan.intro}</p>

      {pillar.plan.prompts.map((p, i) => (
        <div key={p.id} className="plan-field">
          <label className="plan-label"><span className="mono plan-num">{i + 1}</span>{p.label}</label>
          <p className="plan-hint">{p.hint}</p>
          <textarea
            className="ta"
            rows={4}
            placeholder="Scrivi qui il tuo impegno concreto…"
            value={answers[p.id] || ""}
            onChange={(e) => onChange(p.id, e.target.value)}
          />
        </div>
      ))}

      <div className="plan-actions">
        <span className="mono plan-count">{filled}/{pillar.plan.prompts.length} compilati</span>
        <div className="plan-btns">
          <button className="btn-ghost" onClick={copyText}>Copia testo</button>
          <button className="btn-ghost" onClick={download}>Scarica (.md)</button>
          <button className="btn-primary" onClick={() => onPrint(pillar, answers)}>Stampa / salva PDF</button>
        </div>
      </div>
      {msg && <p className="plan-msg mono">{msg}</p>}
    </div>
  );
}

function PrintSheet({ pillar, answers }) {
  return (
    <div className="print-sheet">
      <h1>Piano d'Azione — {pillar.title}</h1>
      <p className="ps-intro">{pillar.plan.intro}</p>
      {pillar.plan.prompts.map((p, i) => (
        <div key={p.id} className="ps-item">
          <h2>{i + 1}. {p.label}</h2>
          <p className="ps-hint">{p.hint}</p>
          <div className="ps-answer">{(answers[p.id] || "").trim() || "____________________________________________"}</div>
        </div>
      ))}
      <p className="ps-foot">Data: {new Date().toLocaleDateString("it-IT")} · Da discutere con il consulente</p>
    </div>
  );
}

/* =============================== STILE ================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root{
  --paper:#EFEDE6; --surface:#FFFFFF; --ink:#15242A; --petrol:#1E4E5C;
  --petrol-deep:#143840; --petrol-tint:#DCE7E8; --amber:#C56A22; --amber-tint:#F4E7D7;
  --line:#DBD8CF; --muted:#6C736E; --ok:#2F7A57; --err:#AD4327;
}
*{box-sizing:border-box}
.app-shell{
  font-family:'IBM Plex Sans',system-ui,sans-serif; color:var(--ink);
  background:var(--paper); min-height:100vh; line-height:1.55;
  -webkit-font-smoothing:antialiased;
}
.mono{font-family:'IBM Plex Mono',ui-monospace,monospace}
.content{max-width:1080px; margin:0 auto; padding:28px 22px 60px}

/* HEADER */
.head{
  position:sticky; top:0; z-index:20; background:rgba(239,237,230,.92);
  backdrop-filter:blur(8px); border-bottom:1px solid var(--line);
  display:flex; align-items:center; justify-content:space-between; gap:16px;
  padding:12px 22px; max-width:1080px; margin:0 auto;
}
.brand{display:flex; align-items:center; gap:11px; background:none; border:none; cursor:pointer; padding:0; text-align:left}
.wmark{flex:none; display:block}
.brand-txt{display:flex; flex-direction:column; line-height:1.1}
.brand-kicker{font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted)}
.brand-title{font-family:'Archivo',sans-serif; font-weight:700; font-size:17px; letter-spacing:-.01em; color:var(--ink)}
.head-right{display:flex; align-items:center; gap:14px}
.head-prog{display:flex; flex-direction:column; gap:4px; min-width:120px}
.head-prog-label{font-size:11px; color:var(--muted)}
.reset-confirm{display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted)}

.bar{height:6px; background:var(--petrol-tint); border-radius:99px; overflow:hidden; width:100%}
.bar.bar-sm{height:5px}
.bar > span{display:block; height:100%; background:var(--petrol); border-radius:99px; transition:width .4s ease}

.btn-primary{
  font-family:'IBM Plex Sans'; font-weight:600; font-size:14px; color:#fff;
  background:var(--petrol); border:none; border-radius:8px; padding:11px 18px; cursor:pointer;
  transition:background .15s, transform .05s;
}
.btn-primary:hover{background:var(--petrol-deep)}
.btn-primary:active{transform:translateY(1px)}
.btn-primary:disabled{background:#9fb1b2; cursor:not-allowed}
.btn-ghost{
  font-family:'IBM Plex Sans'; font-weight:600; font-size:13px; color:var(--petrol);
  background:none; border:1px solid var(--line); border-radius:7px; padding:7px 12px; cursor:pointer;
}
.btn-ghost:hover{border-color:var(--petrol); background:var(--surface)}
.btn-ghost.danger{color:var(--err); border-color:var(--err)}

/* HOME / HERO */
.hero{display:grid; grid-template-columns:1.15fr .85fr; gap:40px; align-items:center; padding:24px 0 36px}
.eyebrow{font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--amber); margin:0 0 14px}
.hero-h1{font-family:'Archivo',sans-serif; font-weight:800; font-size:clamp(28px,4.4vw,46px); line-height:1.04; letter-spacing:-.025em; margin:0 0 16px}
.hero-sub{font-size:15.5px; color:#41494a; max-width:46ch; margin:0 0 18px}
.hero-meta{font-size:12.5px; color:var(--muted); display:flex; gap:8px; align-items:center}
.hero-meta b{color:var(--ink)}
.hero-meta .dot{color:var(--line)}
.hero-window{display:flex; flex-direction:column; align-items:center; gap:10px}
.hero-window svg{filter:drop-shadow(0 12px 28px rgba(20,56,64,.18))}
.pane{cursor:pointer; transition:opacity .15s}
.pane:hover{opacity:.86}
.pane-n{font-family:'IBM Plex Mono',monospace; font-size:11px; fill:#fff; font-weight:600; opacity:.92}
.pane-pct{font-family:'IBM Plex Mono',monospace; font-size:12px; fill:#fff; font-weight:600}
.hero-window-cap{font-size:11px; color:var(--muted)}

.grid-pillars{display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-top:8px}
.pcard{
  text-align:left; background:var(--surface); border:1px solid var(--line); border-radius:14px;
  padding:18px 18px 16px; cursor:pointer; display:flex; flex-direction:column; gap:9px;
  transition:transform .12s, box-shadow .12s, border-color .12s;
}
.pcard:hover{transform:translateY(-3px); box-shadow:0 10px 26px rgba(20,56,64,.1); border-color:var(--petrol-tint)}
.pcard-top{display:flex; justify-content:space-between; align-items:center}
.pcard-n{font-size:13px; color:var(--amber); font-weight:600}
.pill{font-size:10.5px; color:var(--muted); border:1px solid var(--line); border-radius:99px; padding:2px 9px}
.pill.done{color:var(--ok); border-color:var(--ok)}
.pcard-title{font-family:'Archivo',sans-serif; font-weight:700; font-size:18px; letter-spacing:-.01em; margin:2px 0 0}
.pcard-tag{font-size:13px; color:var(--muted); margin:0; min-height:34px}
.pcard-go{font-size:11.5px; color:var(--petrol); font-weight:600; margin-top:2px}

/* PAGE */
.page{max-width:760px; margin:0 auto}
.back{background:none; border:none; color:var(--muted); cursor:pointer; font-size:12px; padding:0; margin-bottom:18px}
.back:hover{color:var(--petrol)}
.page-head{margin-bottom:26px}
.page-n{display:block; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--amber); margin-bottom:8px}
.page-title{font-family:'Archivo',sans-serif; font-weight:800; font-size:32px; letter-spacing:-.02em; margin:0 0 6px; line-height:1.08}
.page-tag{color:var(--muted); font-size:15px; margin:0 0 16px}
.page-progress{display:flex; flex-direction:column; gap:7px; max-width:380px}
.page-progress .mono{font-size:11.5px; color:var(--muted)}

/* LESSON LIST */
.lesson-list{list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px}
.lrow{
  width:100%; display:flex; align-items:center; gap:15px; text-align:left;
  background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:15px 16px; cursor:pointer;
  transition:border-color .12s, transform .1s;
}
.lrow:hover{border-color:var(--petrol); transform:translateX(2px)}
.lrow.is-done{background:#f6f5f0}
.lcheck{flex:none; width:30px; height:30px; border-radius:50%; border:1.5px solid var(--line); display:grid; place-items:center; font-family:'IBM Plex Mono'; font-size:13px; color:var(--muted)}
.lcheck.on{background:var(--petrol); border-color:var(--petrol); color:#fff}
.lrow-body{flex:1; display:flex; flex-direction:column; gap:3px}
.lrow-title{font-weight:600; font-size:15.5px; color:var(--ink)}
.lrow-meta{font-size:11px; color:var(--muted)}
.lrow-go{flex:none; font-size:12px; color:var(--petrol); font-weight:600}

.plan-cta{
  width:100%; display:flex; align-items:center; gap:16px; text-align:left; margin-top:24px;
  background:var(--petrol); color:#fff; border:none; border-radius:14px; padding:18px 20px; cursor:pointer;
  transition:background .15s;
}
.plan-cta:hover{background:var(--petrol-deep)}
.plan-cta-ico{font-size:24px; opacity:.85}
.plan-cta-body{flex:1; display:flex; flex-direction:column; gap:3px}
.plan-cta-title{font-family:'Archivo'; font-weight:700; font-size:16px}
.plan-cta-sub{font-size:12.5px; opacity:.82}
.plan-cta .mono{font-size:12px}

/* LESSON PROSE */
.lesson-h{font-family:'Archivo',sans-serif; font-weight:800; font-size:30px; letter-spacing:-.02em; line-height:1.1; margin:8px 0 24px}
.prose{display:flex; flex-direction:column; gap:18px}
.blk-h{font-family:'Archivo',sans-serif; font-weight:700; font-size:17px; margin:0 0 7px; color:var(--ink)}
.blk p{margin:0; font-size:15.5px; color:#2c3537}
.blk-list{margin:0; padding-left:20px; display:flex; flex-direction:column; gap:7px}
.blk-list li{font-size:15px; color:#2c3537}
.blk.example{background:var(--amber-tint); border-left:3px solid var(--amber); border-radius:0 10px 10px 0; padding:15px 18px}
.example-tag{display:block; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--amber); margin-bottom:6px; font-weight:600}
.blk.example p{color:#4a3a28}
.blk.callout{background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:15px 18px; position:relative}
.blk.callout p{font-size:14.5px; color:#3a4244; font-style:italic}
.blk.takeaways{background:var(--petrol); border-radius:12px; padding:18px 20px}
.tk-tag{display:block; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:var(--petrol-tint); margin-bottom:9px; font-weight:600}
.blk.takeaways ul{margin:0; padding-left:18px; display:flex; flex-direction:column; gap:6px}
.blk.takeaways li{color:#eaf1f0; font-size:14.5px}

/* SECTION LABEL */
.section-label{display:flex; align-items:center; gap:14px; margin:34px 0 16px; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted)}
.section-label i{flex:1; height:1px; background:var(--line)}

/* QUIZ */
.quiz-h{font-family:'Archivo'; font-weight:700; font-size:19px; margin:0 0 18px}
.qblock{margin-bottom:22px}
.qtext{font-size:15.5px; font-weight:600; margin:0 0 11px; display:flex; gap:10px}
.qn{color:var(--amber); flex:none}
.opts{display:flex; flex-direction:column; gap:8px}
.opt{
  display:flex; align-items:center; gap:11px; text-align:left; width:100%;
  background:var(--surface); border:1px solid var(--line); border-radius:9px; padding:11px 13px; cursor:pointer;
  font-size:14.5px; color:var(--ink); transition:border-color .1s, background .1s;
}
.opt:hover:not(:disabled){border-color:var(--petrol)}
.opt:disabled{cursor:default}
.opt-mark{flex:none; width:22px; height:22px; border-radius:6px; background:var(--paper); display:grid; place-items:center; font-family:'IBM Plex Mono'; font-size:12px; font-weight:600; color:var(--muted)}
.opt.picked{border-color:var(--petrol); background:var(--petrol-tint)}
.opt.picked .opt-mark{background:var(--petrol); color:#fff}
.opt.correct{border-color:var(--ok); background:#e7f3ec}
.opt.correct .opt-mark{background:var(--ok); color:#fff}
.opt.wrong{border-color:var(--err); background:#f7e8e3}
.opt.wrong .opt-mark{background:var(--err); color:#fff}
.why{font-size:13.5px; margin:9px 0 0; padding-left:13px; border-left:2px solid var(--line)}
.why.ok{color:var(--ok); border-color:var(--ok)}
.why.no{color:var(--err); border-color:var(--err)}
.quiz-result{display:flex; align-items:center; gap:14px}
.score{font-size:14px; font-weight:600; color:var(--ink)}

/* REFLECT + TEXTAREA */
.rblock{margin-bottom:16px}
.rprompt{display:block; font-size:15px; font-weight:600; margin-bottom:8px; color:var(--ink)}
.ta{
  width:100%; font-family:'IBM Plex Sans'; font-size:14.5px; color:var(--ink); line-height:1.5;
  background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:12px 14px; resize:vertical;
}
.ta:focus{outline:none; border-color:var(--petrol); box-shadow:0 0 0 3px var(--petrol-tint)}
.ta::placeholder{color:#a7ada8}

.lesson-nav{display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:32px; padding-top:22px; border-top:1px solid var(--line)}
.done-badge{font-size:12px; color:var(--ok); font-weight:600}

/* PLAN */
.plan-intro{font-size:15px; color:#41494a; margin:0 0 26px; max-width:60ch}
.plan-field{margin-bottom:22px}
.plan-label{display:flex; gap:11px; align-items:baseline; font-family:'Archivo'; font-weight:700; font-size:16.5px; margin-bottom:4px}
.plan-num{color:var(--amber); font-size:13px; flex:none}
.plan-hint{font-size:13px; color:var(--muted); margin:0 0 9px 27px}
.plan-actions{display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:28px; padding-top:20px; border-top:1px solid var(--line)}
.plan-msg{margin:12px 0 0; font-size:12px; color:var(--ok); background:#eef5f0; border:1px solid #cfe4d8; border-radius:8px; padding:9px 12px}
.plan-count{font-size:12px; color:var(--muted)}
.plan-btns{display:flex; gap:10px}

/* FOOT */
.foot{max-width:1080px; margin:0 auto; padding:20px 22px 40px; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:10px}
.foot .mono{font-size:11px; color:var(--muted)}
.foot-warn{font-size:11px; color:var(--amber)}
.foot-brand{display:flex; align-items:center; gap:12px}
.foot-by{font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted)}
.foot-logo{display:inline-flex; background:#0B0B0D; border-radius:8px; padding:8px 12px; border:1px solid var(--line)}
.foot-logo img{height:30px; display:block}

/* firma SmartValue nella hero */
.hero-by{display:flex; align-items:center; gap:11px; margin-top:20px}
.hero-by .mono{font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted)}
.hero-logo{display:inline-flex; background:#0B0B0D; border-radius:9px; padding:8px 13px; border:1px solid var(--line)}
.hero-logo img{height:30px; display:block}

/* PRINT */
.print-sheet{display:none}
@media print{
  .app-shell{display:none !important}
  .print-sheet{display:block !important; padding:24px; color:#000; font-family:'IBM Plex Sans',sans-serif}
  .print-sheet h1{font-size:22px; margin:0 0 6px}
  .ps-intro{font-style:italic; color:#444; margin:0 0 18px}
  .ps-item{margin-bottom:18px; page-break-inside:avoid}
  .ps-item h2{font-size:15px; margin:0 0 3px}
  .ps-hint{font-size:12px; color:#666; margin:0 0 6px}
  .ps-answer{white-space:pre-wrap; border:1px solid #ccc; border-radius:6px; padding:10px; min-height:48px; font-size:13px}
  .ps-foot{margin-top:24px; font-size:11px; color:#555; border-top:1px solid #ccc; padding-top:8px}
}

@media (max-width:780px){
  .hero{grid-template-columns:1fr; gap:24px}
  .hero-window{order:-1; max-width:320px; margin:0 auto}
  .page-title,.lesson-h{font-size:25px}
  .head-prog{display:none}
}
@media (prefers-reduced-motion:reduce){
  *{transition:none !important}
}
`;

