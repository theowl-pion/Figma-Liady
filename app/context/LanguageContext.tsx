'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Landing page
    'landing.greeting': "Hi, I'm Fouad.",
    'landing.intro1': 'I design product interfaces for complex systems, where clarity, responsibility, and behavior really matter.',
    'landing.intro2': 'With a background in front-end development, I focus on state-driven interfaces and decision-heavy workflows.',
    'landing.devWork': 'Development Work',

    // Project 1
    'project1.title': 'Regulated AI Decision Interface',
    'project1.description': 'A high-stakes AI decision interface where humans remain fully responsible. Designed to make uncertainty visible, enforce clear state transitions, and support correct decision-making in regulated environments.',

    // Project 2
    'project2.title': 'AI Insight Inbox',
    'project2.description': 'A calm, single-page interface for reviewing AI-generated insights. Designed to help users understand what changed and why, without forcing decisions or overwhelming them with data.',

    // Buttons
    'btn.caseStudy': 'Case Study',
    'btn.figma': 'Figma',
    'btn.openProject': 'Open Project',
    'btn.close': 'Close',
    'btn.openInNewTab': 'Open in new tab',

    // Case Study Modal
    'caseStudy.title': 'Case Study',

    // Case Study 1
    'cs1.title': 'Regulated AI Decision Interface',
    'cs1.overview.heading': 'Overview',
    'cs1.overview.content': 'This project explores how to design a regulated AI interface where AI supports decisions, but humans remain fully responsible. The focus is on clarity, accountability, and correct behavior under risk, rather than speed or automation.\n\nThe interface is designed for high-impact environments (e.g. finance, insurance, compliance), where a wrong decision can have legal or ethical consequences.',
    'cs1.problem.heading': 'The Problem',
    'cs1.problem.content': 'Many AI-powered tools present recommendations without clearly defining:\n\n• who is responsible for the final decision\n• how confident the AI actually is\n• what happens when uncertainty is high\n\nThis often leads to over-trust in AI, unclear accountability, and poorly designed "Approve / Reject" flows that hide risk instead of managing it.\n\nThe challenge was to design an interface where:\n\n• AI can explain itself\n• humans stay in control\n• responsibility is explicit\n• system behavior is predictable and auditable',
    'cs1.thinking.heading': 'The Thinking',
    'cs1.thinking.content': 'I approached this as a system design problem, not a UI problem.\n\nKey principles:\n\n• AI proposes, humans decide\n• Every decision must be traceable\n• Uncertainty must be visible, not hidden\n• The interface must slow users down when risk is high\n\nInstead of optimizing for speed, the design optimizes for correctness and trust calibration.',
    'cs1.solution.heading': 'The Solution',
    'cs1.solution.content': "I designed a single-case decision interface with clear structure:\n\n• An AI recommendation section explaining the model's output\n• A confidence indicator that frames how reliable the insight is\n• A detailed explanation area that can be expanded on demand\n• A decision section with explicit actions: Approve, Reject, Request review\n\nEach action follows a confirmation → loading → final state flow, making state transitions explicit and unambiguous.\n\nThe interface enforces rules through behavior:\n\n• actions are disabled during processing\n• final states lock further changes\n• responsibility is clearly tied to the human user",
    'cs1.notBuilt.heading': 'What I Intentionally Did Not Build',
    'cs1.notBuilt.content': 'To keep the system realistic and focused, I intentionally avoided:\n\n• dashboards or multi-case views\n• automation or auto-approval\n• alerts or nudges pushing users to act faster\n• backend logic or real model integration\n\nThe goal was to design and validate the decision experience, not to simulate a full product.',
    'cs1.validation.heading': 'Prototype Validation',
    'cs1.validation.content': 'To validate that the design logic actually works, I built a lightweight React prototype.\n\nThe prototype demonstrates:\n\n• real state transitions on the same page\n• loading and disabled states\n• confirmation flows\n• how UI enforces responsibility rules\n\nThis was done to validate behavior, not to showcase frontend complexity.',
    'cs1.demonstrates.heading': 'What This Project Demonstrates',
    'cs1.demonstrates.content': 'This project demonstrates my ability to:\n\n• design interfaces for high-risk, regulated systems\n• think in terms of states, roles, and responsibility\n• translate abstract AI behavior into understandable UX\n• collaborate naturally with engineers by designing systems, not just screens',
    'cs1.takeaway': 'This project shows how AI interfaces can be designed to support human judgment without replacing responsibility.',

    // Case Study 2
    'cs2.title': 'AI Insight Inbox',
    'cs2.overview.heading': 'Overview',
    'cs2.overview.content': 'This project explores how AI generated insights can be presented in a way that helps humans understand what changed and why, without forcing decisions or creating unnecessary urgency.\n\nThe focus is on sense making, information clarity, and everyday usage rather than automation or control.',
    'cs2.problem.heading': 'The Problem',
    'cs2.problem.content': 'AI systems generate large volumes of signals such as trends, anomalies, predictions, and summaries. In many products, these appear as dashboards or alerts that are difficult to prioritize and even harder to interpret.\n\nUsers are often left asking what actually matters today, why it matters, and how much they should trust the signal.\n\nThe challenge was to design an interface that reduces cognitive load while preserving the meaning behind AI outputs.',
    'cs2.thinking.heading': 'The Thinking',
    'cs2.thinking.content': 'I approached this as an information design problem rather than a data visualization problem.\n\nThe goal was to prioritize explanation before action, keep the experience calm rather than urgent, and favor context over raw metrics. Consistency and readability were treated as core design requirements so the interface could be used daily without friction.\n\nInstead of dashboards or alerts, I framed AI outputs as an inbox of insights that users can review, organize, and return to over time.',
    'cs2.solution.heading': 'The Solution',
    'cs2.solution.content': 'I designed a single page AI Insight Inbox with a clear reading flow.\n\nThe interface includes a lightweight header for time context, a vertical feed of insight cards, and a details modal that expands context without breaking the reading flow.\n\nEach insight card explains what changed, why it matters, and how confident the AI is, allowing users to scan quickly while still understanding the reasoning behind each insight.',
    'cs2.notBuilt.heading': 'What I Intentionally Did Not Build',
    'cs2.notBuilt.content': 'To keep the experience focused and calm, I intentionally avoided dashboards, charts, alerts, approval workflows, and automation that would force action.\n\nThese patterns would increase pressure and move the product away from its goal of everyday understanding.',
    'cs2.validation.heading': 'Prototype Validation',
    'cs2.validation.content': 'To validate interaction logic and information hierarchy, I built a lightweight React prototype.\n\nThe prototype demonstrates insight state changes, modal behavior, loading states, and empty states to ensure the design works in real usage and not only in static screens.',
    'cs2.demonstrates.heading': 'What This Project Demonstrates',
    'cs2.demonstrates.content': 'This project demonstrates my ability to design AI interfaces focused on understanding rather than control, structure information for repeated use, and balance clarity and density in data heavy products.',
    'cs2.takeaway': 'This project shows how AI insights can be designed as calm and readable signals that help humans stay informed without forcing decisions.',

    // Decision Review Page
    'dr.title': 'AI Decision Review',
    'dr.caseId': 'Case ID',
    'dr.submittedBy': 'Submitted by',
    'dr.status': 'Status',
    'dr.pending': 'Pending',
    'dr.approved': 'Approved',
    'dr.rejected': 'Rejected',
    'dr.underReview': 'Under Review',
    'dr.processing': 'Processing',
    'dr.awaitingDecision': 'Awaiting human decision',
    'dr.decisionRecorded': 'Decision recorded',
    'dr.escalatedForReview': 'Escalated for review',
    'dr.aiRecommendation': 'AI Recommendation',
    'dr.confidence': 'Confidence',
    'dr.confidenceNote': 'Based on historical patterns',
    'dr.risk': 'Risk:',
    'dr.riskText': 'High exposure identified',
    'dr.riskFactor1': 'Customer lifetime value exceeds threshold',
    'dr.riskFactor2': 'Recent policy changes may apply',
    'dr.riskFactor3': 'Similar cases had mixed outcomes',
    'dr.explanation': 'Explanation',
    'dr.explanationText': 'This recommendation is based on pattern analysis of similar historical cases and current risk indicators.',
    'dr.viewDetailed': 'View detailed breakdown',
    'dr.hideDetailed': 'Hide details',
    'dr.keyFactors': 'Key factors considered',
    'dr.factor1': 'Historical claim patterns for similar profiles',
    'dr.factor2': 'Current market risk indicators',
    'dr.factor3': 'Policy coverage alignment',
    'dr.factor4': 'Customer relationship duration',
    'dr.knownLimitations': 'Known limitations',
    'dr.limitationsText': 'This model has reduced accuracy for edge cases involving recent policy changes. Manual review is recommended when policy update dates fall within the last 30 days.',
    'dr.decisionSection': 'Decision',
    'dr.decisionDisclaimer': 'By taking action, you confirm that you have reviewed the AI recommendation and accept responsibility for this decision.',
    'dr.approve': 'Approve',
    'dr.reject': 'Reject',
    'dr.requestReview': 'Request Review',
    'dr.actionHint': 'Your action will be logged and attributed to your account',
    'dr.reset': 'Reset',
    'dr.confirmApprove': 'Approve recommendation',
    'dr.confirmReject': 'Reject recommendation',
    'dr.confirmReview': 'Request review',
    'dr.approveMessage': 'You are confirming this decision based on the AI recommendation and available information.',
    'dr.rejectMessage': 'This case will be escalated to a senior role. You will no longer be able to approve or reject it.',
    'dr.reviewMessage': 'This case will be escalated for review. You will no longer be able to approve or reject this recommendation.',
    'dr.selectReviewer': 'Select a senior to review this case',
    'dr.chooseReviewer': 'Choose reviewer...',
    'dr.approveBtn': 'Approve Recommendation',
    'dr.rejectBtn': 'Reject Recommendation',
    'dr.reviewBtn': 'Request review',

    // Insight Inbox Page
    'ii.title': 'Insight Inbox',
    'ii.subtitle': 'Insights for today',
    'ii.active': 'Active',
    'ii.dismissed': 'Dismissed',
    'ii.today': 'Today',
    'ii.last7days': 'Last 7 days',
    'ii.save': 'Save',
    'ii.dismiss': 'Dismiss',
    'ii.viewDetails': 'View Details',
    'ii.new': 'New',
    'ii.saved': 'Saved',
    'ii.confidenceScore': 'Confidence score',
    'ii.supportingSignals': 'Supporting signals',
    'ii.suggestedNextStep': 'Suggested next step',
    'ii.emptyActive': 'All caught up!',
    'ii.emptyActiveText': 'No new insights for this period. Check back later for updates.',
    'ii.emptyDismissed': 'No dismissed insights',
    'ii.emptyDismissedText': 'Insights you dismiss will appear here for reference.',

    // Mock data
    'ii.insight1.title': 'Increase in churn risk for Segment B',
    'ii.insight1.summary': 'Churn probability increased by 18% compared to last week. Some engagement signals show variation across users in Segment B.',
    'ii.insight1.explanation': 'Based on engagement patterns from the last 30 days.',
    'ii.insight1.signal1': 'Decrease in weekly activity',
    'ii.insight1.signal2': 'Lower feature engagement',
    'ii.insight1.signal3': 'Increased inactivity',
    'ii.insight1.nextStep': 'Consider reviewing onboarding changes.',

    'ii.insight2.title': 'Increase in churn risk for Segment B',
    'ii.insight2.summary': 'Churn probability increased by 18% compared to last week, driven by a consistent drop in weekly engagement across Segment B.',
    'ii.insight2.explanation': 'Strong correlation with historical churn patterns.',

    'ii.insight3.title': 'Increase in churn risk for Segment B',
    'ii.insight3.summary': 'Early indicators suggest a potential increase in churn risk, but recent user activity is inconsistent.',
    'ii.insight3.explanation': 'Limited data available for this segment.',
  },
  it: {
    // Landing page
    'landing.greeting': 'Ciao, sono Fouad.',
    'landing.intro1': 'Progetto interfacce per sistemi complessi, dove chiarezza, responsabilità e comportamento contano davvero.',
    'landing.intro2': 'Con un background nello sviluppo front-end, mi concentro su interfacce basate su stati e flussi decisionali complessi.',
    'landing.devWork': 'Progetti di Sviluppo',

    // Project 1
    'project1.title': 'Interfaccia Decisionale AI Regolamentata',
    'project1.description': "Un'interfaccia decisionale AI ad alto rischio dove l'uomo rimane pienamente responsabile. Progettata per rendere visibile l'incertezza, garantire transizioni di stato chiare e supportare decisioni corrette in ambienti regolamentati.",

    // Project 2
    'project2.title': 'AI Insight Inbox',
    'project2.description': "Un'interfaccia calma e a pagina singola per consultare insight generati dall'AI. Progettata per aiutare gli utenti a capire cosa è cambiato e perché, senza forzare decisioni o sovraccaricarli di dati.",

    // Buttons
    'btn.caseStudy': 'Case Study',
    'btn.figma': 'Figma',
    'btn.openProject': 'Apri Progetto',
    'btn.close': 'Chiudi',
    'btn.openInNewTab': 'Apri in nuova scheda',

    // Case Study Modal
    'caseStudy.title': 'Case Study',

    // Case Study 1
    'cs1.title': 'Interfaccia Decisionale AI Regolamentata',
    'cs1.overview.heading': 'Panoramica',
    'cs1.overview.content': "Questo progetto esplora come progettare un'interfaccia AI regolamentata dove l'AI supporta le decisioni, ma l'uomo rimane pienamente responsabile. L'attenzione è sulla chiarezza, la responsabilità e il comportamento corretto in situazioni di rischio, piuttosto che sulla velocità o l'automazione.\n\nL'interfaccia è pensata per ambienti ad alto impatto (es. finanza, assicurazioni, compliance), dove una decisione sbagliata può avere conseguenze legali o etiche.",
    'cs1.problem.heading': 'Il Problema',
    'cs1.problem.content': "Molti strumenti basati su AI presentano raccomandazioni senza definire chiaramente:\n\n• chi è responsabile della decisione finale\n• quanto l'AI sia effettivamente sicura\n• cosa succede quando l'incertezza è alta\n\nQuesto porta spesso a un'eccessiva fiducia nell'AI, responsabilità poco chiare e flussi \"Approva / Rifiuta\" mal progettati che nascondono il rischio invece di gestirlo.\n\nLa sfida era progettare un'interfaccia dove:\n\n• l'AI possa spiegarsi\n• l'uomo mantenga il controllo\n• la responsabilità sia esplicita\n• il comportamento del sistema sia prevedibile e verificabile",
    'cs1.thinking.heading': 'Il Ragionamento',
    'cs1.thinking.content': "Ho affrontato questo come un problema di progettazione di sistema, non di UI.\n\nPrincipi chiave:\n\n• l'AI propone, l'uomo decide\n• ogni decisione deve essere tracciabile\n• l'incertezza deve essere visibile, non nascosta\n• l'interfaccia deve rallentare l'utente quando il rischio è alto\n\nInvece di ottimizzare per la velocità, il design ottimizza per la correttezza e la calibrazione della fiducia.",
    'cs1.solution.heading': 'La Soluzione',
    'cs1.solution.content': "Ho progettato un'interfaccia decisionale per singolo caso con una struttura chiara:\n\n• una sezione di raccomandazione AI che spiega l'output del modello\n• un indicatore di confidenza che contestualizza l'affidabilità dell'insight\n• un'area di spiegazione dettagliata espandibile su richiesta\n• una sezione decisionale con azioni esplicite: Approva, Rifiuta, Richiedi revisione\n\nOgni azione segue un flusso conferma → caricamento → stato finale, rendendo le transizioni di stato esplicite e non ambigue.\n\nL'interfaccia impone regole attraverso il comportamento:\n\n• le azioni sono disabilitate durante l'elaborazione\n• gli stati finali bloccano ulteriori modifiche\n• la responsabilità è chiaramente attribuita all'utente",
    'cs1.notBuilt.heading': 'Cosa Ho Intenzionalmente Evitato',
    'cs1.notBuilt.content': "Per mantenere il sistema realistico e focalizzato, ho intenzionalmente evitato:\n\n• dashboard o viste multi-caso\n• automazione o approvazione automatica\n• alert o solleciti che spingono l'utente ad agire più velocemente\n• logica backend o integrazione con modelli reali\n\nL'obiettivo era progettare e validare l'esperienza decisionale, non simulare un prodotto completo.",
    'cs1.validation.heading': 'Validazione del Prototipo',
    'cs1.validation.content': "Per validare che la logica di design funzionasse davvero, ho costruito un prototipo leggero in React.\n\nIl prototipo dimostra:\n\n• transizioni di stato reali sulla stessa pagina\n• stati di caricamento e disabilitazione\n• flussi di conferma\n• come la UI impone le regole di responsabilità\n\nQuesto è stato fatto per validare il comportamento, non per mostrare complessità frontend.",
    'cs1.demonstrates.heading': 'Cosa Dimostra Questo Progetto',
    'cs1.demonstrates.content': 'Questo progetto dimostra la mia capacità di:\n\n• progettare interfacce per sistemi ad alto rischio e regolamentati\n• ragionare in termini di stati, ruoli e responsabilità\n• tradurre comportamenti AI astratti in UX comprensibile\n• collaborare naturalmente con gli sviluppatori progettando sistemi, non solo schermate',
    'cs1.takeaway': "Questo progetto mostra come le interfacce AI possano essere progettate per supportare il giudizio umano senza sostituire la responsabilità.",

    // Case Study 2
    'cs2.title': 'AI Insight Inbox',
    'cs2.overview.heading': 'Panoramica',
    'cs2.overview.content': "Questo progetto esplora come gli insight generati dall'AI possano essere presentati in modo da aiutare le persone a capire cosa è cambiato e perché, senza forzare decisioni o creare urgenza inutile.\n\nIl focus è sulla comprensione, la chiarezza informativa e l'uso quotidiano piuttosto che sull'automazione o il controllo.",
    'cs2.problem.heading': 'Il Problema',
    'cs2.problem.content': "I sistemi AI generano grandi volumi di segnali come trend, anomalie, previsioni e sintesi. In molti prodotti, questi appaiono come dashboard o alert difficili da prioritizzare e ancora più difficili da interpretare.\n\nGli utenti si ritrovano spesso a chiedersi cosa conti davvero oggi, perché sia importante e quanto possano fidarsi del segnale.\n\nLa sfida era progettare un'interfaccia che riduca il carico cognitivo preservando il significato degli output AI.",
    'cs2.thinking.heading': 'Il Ragionamento',
    'cs2.thinking.content': "Ho affrontato questo come un problema di design dell'informazione piuttosto che di visualizzazione dati.\n\nL'obiettivo era dare priorità alla spiegazione prima dell'azione, mantenere l'esperienza calma piuttosto che urgente, e favorire il contesto rispetto alle metriche grezze. Coerenza e leggibilità sono stati trattati come requisiti di design fondamentali, così che l'interfaccia potesse essere usata quotidianamente senza frizioni.\n\nInvece di dashboard o alert, ho inquadrato gli output AI come una inbox di insight che gli utenti possono consultare, organizzare e rivisitare nel tempo.",
    'cs2.solution.heading': 'La Soluzione',
    'cs2.solution.content': "Ho progettato una AI Insight Inbox a pagina singola con un flusso di lettura chiaro.\n\nL'interfaccia include un header leggero per il contesto temporale, un feed verticale di card insight e una modale dettagli che espande il contesto senza interrompere il flusso di lettura.\n\nOgni card insight spiega cosa è cambiato, perché è importante e quanto l'AI sia sicura, permettendo agli utenti di scorrere rapidamente pur comprendendo il ragionamento dietro ogni insight.",
    'cs2.notBuilt.heading': 'Cosa Ho Intenzionalmente Evitato',
    'cs2.notBuilt.content': "Per mantenere l'esperienza focalizzata e calma, ho intenzionalmente evitato dashboard, grafici, alert, workflow di approvazione e automazioni che forzerebbero l'azione.\n\nQuesti pattern aumenterebbero la pressione e allontanerebbero il prodotto dal suo obiettivo di comprensione quotidiana.",
    'cs2.validation.heading': 'Validazione del Prototipo',
    'cs2.validation.content': "Per validare la logica di interazione e la gerarchia informativa, ho costruito un prototipo leggero in React.\n\nIl prototipo dimostra i cambiamenti di stato degli insight, il comportamento delle modali, gli stati di caricamento e gli stati vuoti per assicurare che il design funzioni nell'uso reale e non solo in schermate statiche.",
    'cs2.demonstrates.heading': 'Cosa Dimostra Questo Progetto',
    'cs2.demonstrates.content': "Questo progetto dimostra la mia capacità di progettare interfacce AI focalizzate sulla comprensione piuttosto che sul controllo, strutturare informazioni per un uso ripetuto e bilanciare chiarezza e densità in prodotti ricchi di dati.",
    'cs2.takeaway': "Questo progetto mostra come gli insight AI possano essere progettati come segnali calmi e leggibili che aiutano le persone a rimanere informate senza forzare decisioni.",

    // Decision Review Page
    'dr.title': 'Revisione Decisioni AI',
    'dr.caseId': 'ID Caso',
    'dr.submittedBy': 'Inviato da',
    'dr.status': 'Stato',
    'dr.pending': 'In Attesa',
    'dr.approved': 'Approvato',
    'dr.rejected': 'Rifiutato',
    'dr.underReview': 'In Revisione',
    'dr.processing': 'Elaborazione',
    'dr.awaitingDecision': 'In attesa di decisione umana',
    'dr.decisionRecorded': 'Decisione registrata',
    'dr.escalatedForReview': 'Escalato per revisione',
    'dr.aiRecommendation': 'Raccomandazione AI',
    'dr.confidence': 'Confidenza',
    'dr.confidenceNote': 'Basata su pattern storici',
    'dr.risk': 'Rischio:',
    'dr.riskText': 'Esposizione elevata identificata',
    'dr.riskFactor1': 'Il valore del cliente supera la soglia',
    'dr.riskFactor2': 'Recenti modifiche alle policy potrebbero applicarsi',
    'dr.riskFactor3': 'Casi simili hanno avuto esiti misti',
    'dr.explanation': 'Spiegazione',
    'dr.explanationText': 'Questa raccomandazione si basa sull\'analisi di pattern di casi storici simili e indicatori di rischio attuali.',
    'dr.viewDetailed': 'Visualizza dettagli',
    'dr.hideDetailed': 'Nascondi dettagli',
    'dr.keyFactors': 'Fattori chiave considerati',
    'dr.factor1': 'Pattern storici di reclami per profili simili',
    'dr.factor2': 'Indicatori di rischio di mercato attuali',
    'dr.factor3': 'Allineamento della copertura della polizza',
    'dr.factor4': 'Durata della relazione con il cliente',
    'dr.knownLimitations': 'Limitazioni note',
    'dr.limitationsText': 'Questo modello ha accuratezza ridotta per casi limite che coinvolgono recenti modifiche alle policy. Si raccomanda la revisione manuale quando le date di aggiornamento delle policy rientrano negli ultimi 30 giorni.',
    'dr.decisionSection': 'Decisione',
    'dr.decisionDisclaimer': 'Procedendo, confermi di aver esaminato la raccomandazione AI e accetti la responsabilità per questa decisione.',
    'dr.approve': 'Approva',
    'dr.reject': 'Rifiuta',
    'dr.requestReview': 'Richiedi Revisione',
    'dr.actionHint': 'La tua azione sarà registrata e attribuita al tuo account',
    'dr.reset': 'Reimposta',
    'dr.confirmApprove': 'Approva raccomandazione',
    'dr.confirmReject': 'Rifiuta raccomandazione',
    'dr.confirmReview': 'Richiedi revisione',
    'dr.approveMessage': 'Stai confermando questa decisione basandoti sulla raccomandazione AI e sulle informazioni disponibili.',
    'dr.rejectMessage': 'Questo caso sarà escalato a un ruolo senior. Non potrai più approvarlo o rifiutarlo.',
    'dr.reviewMessage': 'Questo caso sarà escalato per revisione. Non potrai più approvare o rifiutare questa raccomandazione.',
    'dr.selectReviewer': 'Seleziona un senior per revisionare questo caso',
    'dr.chooseReviewer': 'Scegli revisore...',
    'dr.approveBtn': 'Approva Raccomandazione',
    'dr.rejectBtn': 'Rifiuta Raccomandazione',
    'dr.reviewBtn': 'Richiedi revisione',

    // Insight Inbox Page
    'ii.title': 'Insight Inbox',
    'ii.subtitle': 'Insight di oggi',
    'ii.active': 'Attivi',
    'ii.dismissed': 'Archiviati',
    'ii.today': 'Oggi',
    'ii.last7days': 'Ultimi 7 giorni',
    'ii.save': 'Salva',
    'ii.dismiss': 'Archivia',
    'ii.viewDetails': 'Dettagli',
    'ii.new': 'Nuovo',
    'ii.saved': 'Salvato',
    'ii.confidenceScore': 'Livello di confidenza',
    'ii.supportingSignals': 'Segnali a supporto',
    'ii.suggestedNextStep': 'Prossimo passo suggerito',
    'ii.emptyActive': 'Tutto in ordine!',
    'ii.emptyActiveText': 'Nessun nuovo insight per questo periodo. Torna più tardi per aggiornamenti.',
    'ii.emptyDismissed': 'Nessun insight archiviato',
    'ii.emptyDismissedText': 'Gli insight che archivi appariranno qui come riferimento.',

    // Mock data
    'ii.insight1.title': 'Aumento del rischio di churn per il Segmento B',
    'ii.insight1.summary': 'La probabilità di churn è aumentata del 18% rispetto alla settimana scorsa. Alcuni segnali di engagement mostrano variazioni tra gli utenti del Segmento B.',
    'ii.insight1.explanation': 'Basato sui pattern di engagement degli ultimi 30 giorni.',
    'ii.insight1.signal1': 'Diminuzione dell\'attività settimanale',
    'ii.insight1.signal2': 'Minor utilizzo delle funzionalità',
    'ii.insight1.signal3': 'Aumento dell\'inattività',
    'ii.insight1.nextStep': 'Considera di rivedere le modifiche all\'onboarding.',

    'ii.insight2.title': 'Aumento del rischio di churn per il Segmento B',
    'ii.insight2.summary': 'La probabilità di churn è aumentata del 18% rispetto alla settimana scorsa, causata da un calo costante dell\'engagement settimanale nel Segmento B.',
    'ii.insight2.explanation': 'Forte correlazione con i pattern storici di churn.',

    'ii.insight3.title': 'Aumento del rischio di churn per il Segmento B',
    'ii.insight3.summary': 'Indicatori preliminari suggeriscono un potenziale aumento del rischio di churn, ma l\'attività recente degli utenti è incoerente.',
    'ii.insight3.explanation': 'Dati limitati disponibili per questo segmento.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
