const form = document.querySelector("#promptForm");
const output = document.querySelector("#promptOutput");
const analysisOutput = document.querySelector("#analysisOutput");
const copyButton = document.querySelector("#copyButton");
const analyzeButton = document.querySelector("#analyzeButton");
const exportPdfButton = document.querySelector("#exportPdfButton");
const copyStatus = document.querySelector("#copyStatus");
const analysisStatus = document.querySelector("#analysisStatus");
const charCount = document.querySelector("#charCount");
const pdfStatus = document.querySelector("#pdfStatus");

const translations = {
  de: {
    htmlLang: "de",
    title: "GaLaBau Vertragsanalyse CH",
    meta:
      "Prompt-Generator und KI-Analyse für Werkverträge im Garten- und Landschaftsbau Schweiz.",
    ui: {
      eyebrow: "Schweiz - Gartenbau - Landschaftsbau",
      headline: "Werkvertragsanalyse",
      intro:
        "Erstelle einen strukturierten Analyse-Prompt für Schweizer Gartenbau- und Landschaftsbauverträge.",
      project: "Projekt / Objekt",
      projectPlaceholder: "z.B. Umgestaltung Privatgarten Meilen",
      role: "Rolle",
      roles: {
        neutral: "Neutral analysieren",
        auftraggeber: "Fokus Auftraggeber",
        unternehmer: "Fokus Unternehmer",
      },
      worksLegend: "Arbeiten",
      normsLegend: "Normen & Schwerpunkte",
      sia118: "SIA 118 berücksichtigen, falls vereinbart",
      siaGaLa: "Garten- und landschaftsbauspezifische Normen prüfen",
      anwuchs: "Anwuchs- und Pflegegarantie vertiefen",
      neighbors: "Nachbarrechte, Grenzen und Dienstbarkeiten prüfen",
      risks: "Besondere Risiken oder Hinweise",
      risksPlaceholder:
        "z.B. Hanglage, alte Leitungen, bestehende Natursteinmauer, enger Zugang, Etappierung...",
      pdfUpload: "Vertrag als PDF hochladen",
      contractText: "Vertragstext",
      contractPlaceholder: "Hier den Werkvertrag oder die Offerte einfügen...",
      generatedPrompt: "Generierter Prompt",
      promptTask: "Analyseauftrag",
      copy: "Kopieren",
      analyze: "Analyse starten",
      aiAnalysis: "KI-Analyse",
      savePdf: "PDF speichern",
      analysisPlaceholder: "Die Analyse erscheint hier nach dem Start...",
    },
    workTypes: {
      earthworks: "Erdarbeiten",
      paving: "Belagsarbeiten",
      walls: "Mauern und Einfassungen",
      drainage: "Entwässerung und Drainage",
      planting: "Bepflanzung",
      lawn: "Rasen und Begrünung",
      irrigation: "Bewässerung",
      lighting: "Beleuchtung",
      maintenance: "Pflegeleistungen",
    },
    status: {
      chars: "Zeichen",
      copied: "Prompt kopiert",
      running: "Analyse läuft...",
      done: "Fertig",
      error: "Fehler",
      noAnalysis: "Keine fertige Analyse für PDF vorhanden.",
      pdfSaved: "PDF gespeichert",
      pdfLibraryMissing: "PDF-Bibliothek konnte nicht geladen werden.",
      pdfReading: "PDF wird gelesen...",
      pdfReadingPage: (page, total) => `Lese PDF-Seite ${page} von ${total}...`,
      choosePdf: "Bitte eine PDF-Datei auswählen.",
      scanNoOcr:
        "Aus dieser PDF konnte kein Text extrahiert werden. Möglicherweise ist es ein Scan ohne OCR.",
      noPdfText: "Kein lesbarer PDF-Text gefunden.",
      extracted: (pages, chars) => `${pages} Seite(n) extrahiert, ${chars} Zeichen.`,
      pdfReadError: "PDF konnte nicht gelesen werden.",
      analysisFailed: "Analyse fehlgeschlagen.",
      noAnalysisReceived: "Keine Analyse erhalten.",
    },
    report: {
      title: "Werkvertragsanalyse",
      subtitle: "Gartenbau und Landschaftsbau Schweiz",
      created: "Erstellt am",
      focus: "Analysefokus",
      works: "Arbeiten",
      notes: "Besondere Hinweise",
      analysis: "KI-Analyse",
      disclaimer: "Strukturierte Risikoanalyse - keine verbindliche Rechtsberatung.",
      fallbackFile: "werkvertragsanalyse",
      defaultProject: "Werkvertragsanalyse",
    },
    prompt: {
      project: "Projekt / Objekt",
      works: "Relevante Arbeiten",
      risks: "Besondere Hinweise / Risiken",
      roles: {
        neutral: "Analysiere ausgewogen aus Sicht beider Vertragsparteien.",
        auftraggeber:
          "Lege besonderes Gewicht auf Risiken, Kostenfolgen und Schutzmechanismen für den Auftraggeber.",
        unternehmer:
          "Lege besonderes Gewicht auf Zahlungsanspruch, Nachtragsfähigkeit, Mitwirkungspflichten und Haftungsbegrenzung für den Unternehmer.",
      },
      intro:
        "Analysiere den folgenden Werkvertrag für Gartenbau- und Landschaftsbauarbeiten in der Schweiz aus rechtlicher, technischer und wirtschaftlicher Sicht.",
      legal:
        "Berücksichtige Schweizer Recht und die einschlägige Praxis für Gartenbau und Landschaftsbau. Erstelle keine verbindliche Rechtsberatung, sondern eine strukturierte Risiko- und Vertragsanalyse. Weise klar darauf hin, welche Punkte durch eine Schweizer Fachperson juristisch oder technisch geprüft werden sollten.",
      normTitle: "Normen und besondere Prüfpunkte:",
      norms: {
        sia118:
          "Prüfe SIA 118 nur soweit sie vertraglich vereinbart oder sinnvoll als Branchenstandard relevant ist.",
        siaGaLa:
          "Berücksichtige garten- und landschaftsbauspezifische Schweizer Normen, technische Regeln und Branchenpraxis.",
        anwuchs:
          "Prüfe Anwuchs-, Pflege- und Entwicklungsgarantien für Pflanzen, Rasen und Begrünungen vertieft.",
        neighbors:
          "Prüfe Nachbarrechte, Grenzabstände, Dienstbarkeiten und öffentlich-rechtliche Vorgaben.",
        fallback: "Prüfe nur die im Vertrag ausdrücklich genannten Normen und Standards.",
      },
      checkTitle: "Prüfe insbesondere:",
      checks: [
        "Vertragsparteien, Grundstück, Projektort und Leistungsumfang",
        "Beschreibung der Gartenbau- und Landschaftsbauarbeiten",
        "Pläne, Leistungsverzeichnis, Offerten, technische Beilagen und Rangordnung der Vertragsunterlagen",
        "Bewilligungen, Nachbarrechte, Grenzabstände, Dienstbarkeiten und öffentlich-rechtliche Vorgaben",
        "Baugrund, Bodenbeschaffenheit, Altlasten, Werkleitungen, Drainage und Entwässerung",
        "Termine, Bauprogramm, Witterungsrisiken, saisonale Abhängigkeiten und Pflanzzeiten",
        "Vergütung, Zahlungsplan, Akontozahlungen, Regiearbeiten, Nachträge, Teuerung und Mehrwertsteuer",
        "Änderungsbestellungen, Mehr-/Minderleistungen, Nachtragspreise und Freigabeprozesse",
        "Mitwirkungspflichten des Auftraggebers, Baustellenzugang, Wasser/Strom, Planfreigaben und Schnittstellen zu Dritten",
        "Abnahme, Teilabnahmen, Mängelrüge, Garantie- und Gewährleistungsfristen",
        "Pflanzqualität, Pflegepflichten, Anwuchserfolg und Ersatzpflichten",
        "Haftung, Versicherung, Schäden an bestehenden Anlagen, Leitungen, Nachbargrundstücken und Gebäuden",
        "Schutz bestehender Bepflanzung, Beläge, Mauern, Einfassungen und Installationen",
        "Entsorgung, Aushub, Recycling, Umwelt-, Gewässer- und Bodenschutzvorgaben",
        "Kündigung, Sistierung, Verzug, Vertragsstrafen und Folgen bei Terminverschiebungen",
        "Dokumentations-, Prüf-, Mess- und Nachweispflichten",
        "Unklare, widersprüchliche, einseitige oder riskante Klauseln",
        "Fehlende Regelungen, die ergänzt werden sollten",
      ],
      outputTitle: "Gib die Analyse strukturiert aus mit:",
      outputs: [
        "Kurzfazit",
        "Wichtigste Risiken für den Auftraggeber",
        "Wichtigste Risiken für den Gartenbau-/Landschaftsbauunternehmer",
        "Technische und praktische Ausführungsrisiken",
        "Auffällige Klauseln mit Begründung",
        "Konkrete Änderungsvorschläge für faire und klare Vertragsklauseln",
        "Offene Fragen vor Unterzeichnung",
        "Empfohlene Beilagen, Nachweise und Kontrollen",
      ],
      emphasis:
        "Achte besonders auf klare Leistungsabgrenzung, Schnittstellen zu anderen Unternehmern, unvorhergesehene Boden- oder Leitungsverhältnisse, Witterungs- und Saisonrisiken, Pflanzqualität, Pflege, Anwuchserfolg, Abnahme und Mängelrügen nach Schweizer Praxis.",
      contract: "Hier ist der zu analysierende Werkvertrag:",
      contractPlaceholder: "[Vertragstext hier einfügen]",
      answerLanguage: "Antworte in Deutsch.",
    },
  },
  en: {
    htmlLang: "en",
    title: "Swiss Landscaping Contract Analysis",
    meta:
      "Prompt generator and AI analysis for Swiss garden and landscaping work contracts.",
    ui: {
      eyebrow: "Switzerland - Garden construction - Landscaping",
      headline: "Contract analysis",
      intro:
        "Create a structured analysis prompt for Swiss garden construction and landscaping contracts.",
      project: "Project / property",
      projectPlaceholder: "e.g. Private garden redesign in Meilen",
      role: "Role",
      roles: {
        neutral: "Balanced analysis",
        auftraggeber: "Client focus",
        unternehmer: "Contractor focus",
      },
      worksLegend: "Works",
      normsLegend: "Standards & focus areas",
      sia118: "Consider SIA 118 if agreed",
      siaGaLa: "Check garden and landscaping-specific standards",
      anwuchs: "Deepen plant establishment and maintenance guarantees",
      neighbors: "Check neighbour rights, boundaries and easements",
      risks: "Special risks or notes",
      risksPlaceholder:
        "e.g. sloping site, old utility lines, existing natural stone wall, narrow access, staged works...",
      pdfUpload: "Upload contract as PDF",
      contractText: "Contract text",
      contractPlaceholder: "Paste the work contract or quotation here...",
      generatedPrompt: "Generated prompt",
      promptTask: "Analysis task",
      copy: "Copy",
      analyze: "Start analysis",
      aiAnalysis: "AI analysis",
      savePdf: "Save PDF",
      analysisPlaceholder: "The analysis appears here after starting...",
    },
    workTypes: {
      earthworks: "Earthworks",
      paving: "Paving",
      walls: "Walls and edging",
      drainage: "Drainage",
      planting: "Planting",
      lawn: "Lawn and greening",
      irrigation: "Irrigation",
      lighting: "Lighting",
      maintenance: "Maintenance",
    },
    status: {
      chars: "characters",
      copied: "Prompt copied",
      running: "Analysis running...",
      done: "Done",
      error: "Error",
      noAnalysis: "No completed analysis available for PDF export.",
      pdfSaved: "PDF saved",
      pdfLibraryMissing: "PDF library could not be loaded.",
      pdfReading: "Reading PDF...",
      pdfReadingPage: (page, total) => `Reading PDF page ${page} of ${total}...`,
      choosePdf: "Please choose a PDF file.",
      scanNoOcr:
        "No text could be extracted from this PDF. It may be a scan without OCR.",
      noPdfText: "No readable PDF text found.",
      extracted: (pages, chars) => `${pages} page(s) extracted, ${chars} characters.`,
      pdfReadError: "PDF could not be read.",
      analysisFailed: "Analysis failed.",
      noAnalysisReceived: "No analysis received.",
    },
    report: {
      title: "Contract analysis",
      subtitle: "Garden construction and landscaping Switzerland",
      created: "Created on",
      focus: "Analysis focus",
      works: "Works",
      notes: "Special notes",
      analysis: "AI analysis",
      disclaimer: "Structured risk analysis - not binding legal advice.",
      fallbackFile: "contract-analysis",
      defaultProject: "Contract analysis",
    },
    prompt: {
      project: "Project / property",
      works: "Relevant works",
      risks: "Special notes / risks",
      roles: {
        neutral: "Analyse both parties' positions in a balanced way.",
        auftraggeber:
          "Place special emphasis on risks, cost consequences and protection mechanisms for the client.",
        unternehmer:
          "Place special emphasis on payment entitlement, variations, client cooperation duties and liability limits for the contractor.",
      },
      intro:
        "Analyse the following work contract for garden construction and landscaping works in Switzerland from a legal, technical and commercial perspective.",
      legal:
        "Consider Swiss law and relevant Swiss garden construction and landscaping practice. Do not provide binding legal advice; provide a structured risk and contract analysis. Clearly flag points that should be reviewed by a Swiss legal or technical specialist.",
      normTitle: "Standards and special review points:",
      norms: {
        sia118:
          "Review SIA 118 only where it is contractually agreed or reasonably relevant as an industry standard.",
        siaGaLa:
          "Consider Swiss garden and landscaping-specific standards, technical rules and industry practice.",
        anwuchs:
          "Review plant establishment, maintenance and development guarantees for plants, lawns and greening in depth.",
        neighbors:
          "Review neighbour rights, boundary distances, easements and public-law requirements.",
        fallback: "Review only the standards expressly named in the contract.",
      },
      checkTitle: "Review in particular:",
      checks: [
        "Contracting parties, property, project location and scope of work",
        "Description of garden construction and landscaping works",
        "Plans, bill of quantities, quotations, technical appendices and order of precedence",
        "Permits, neighbour rights, boundary distances, easements and public-law requirements",
        "Ground conditions, soil, contamination, utility lines, drainage and dewatering",
        "Deadlines, construction programme, weather risks, seasonal dependencies and planting periods",
        "Remuneration, payment schedule, instalments, daywork, variations, inflation and VAT",
        "Change orders, additional/reduced work, variation prices and approval processes",
        "Client cooperation duties, site access, water/power, plan approvals and interfaces with third parties",
        "Acceptance, partial acceptance, defect notices, guarantee and warranty periods",
        "Plant quality, maintenance duties, establishment success and replacement duties",
        "Liability, insurance, damage to existing assets, utility lines, neighbouring properties and buildings",
        "Protection of existing planting, paving, walls, edging and installations",
        "Disposal, excavation, recycling, environmental, water and soil protection requirements",
        "Termination, suspension, delay, contractual penalties and effects of schedule shifts",
        "Documentation, inspection, measurement and evidence duties",
        "Unclear, contradictory, one-sided or risky clauses",
        "Missing provisions that should be added",
      ],
      outputTitle: "Structure the analysis with:",
      outputs: [
        "Brief conclusion",
        "Key risks for the client",
        "Key risks for the garden/landscaping contractor",
        "Technical and practical execution risks",
        "Notable clauses with reasoning",
        "Concrete wording suggestions for fair and clear clauses",
        "Open questions before signing",
        "Recommended appendices, evidence and checks",
      ],
      emphasis:
        "Pay particular attention to clear scope boundaries, interfaces with other contractors, unforeseen soil or utility conditions, weather and seasonal risks, plant quality, maintenance, establishment success, acceptance and defect notices under Swiss practice.",
      contract: "Here is the contract to analyse:",
      contractPlaceholder: "[Paste contract text here]",
      answerLanguage: "Answer in English.",
    },
  },
  fr: {
    htmlLang: "fr",
    title: "Analyse de contrat paysager CH",
    meta:
      "Générateur de prompt et analyse IA pour contrats suisses de jardinage et d'aménagement paysager.",
    ui: {
      eyebrow: "Suisse - Jardinage - Aménagement paysager",
      headline: "Analyse du contrat d'entreprise",
      intro:
        "Crée un prompt structuré pour analyser les contrats suisses de jardinage et d'aménagement paysager.",
      project: "Projet / objet",
      projectPlaceholder: "p. ex. réaménagement d'un jardin privé à Meilen",
      role: "Rôle",
      roles: {
        neutral: "Analyse équilibrée",
        auftraggeber: "Focus maître d'ouvrage",
        unternehmer: "Focus entrepreneur",
      },
      worksLegend: "Travaux",
      normsLegend: "Normes & priorités",
      sia118: "Tenir compte de la SIA 118 si convenue",
      siaGaLa: "Vérifier les normes spécifiques au jardinage/paysage",
      anwuchs: "Approfondir la garantie de reprise et d'entretien",
      neighbors: "Vérifier voisins, limites et servitudes",
      risks: "Risques ou remarques particulières",
      risksPlaceholder:
        "p. ex. terrain en pente, anciennes conduites, mur en pierre existant, accès étroit, exécution par étapes...",
      pdfUpload: "Téléverser le contrat en PDF",
      contractText: "Texte du contrat",
      contractPlaceholder: "Coller ici le contrat d'entreprise ou l'offre...",
      generatedPrompt: "Prompt généré",
      promptTask: "Mandat d'analyse",
      copy: "Copier",
      analyze: "Lancer l'analyse",
      aiAnalysis: "Analyse IA",
      savePdf: "Enregistrer PDF",
      analysisPlaceholder: "L'analyse apparaît ici après le lancement...",
    },
    workTypes: {
      earthworks: "Terrassements",
      paving: "Revêtements",
      walls: "Murs et bordures",
      drainage: "Drainage et évacuation",
      planting: "Plantations",
      lawn: "Gazon et végétalisation",
      irrigation: "Arrosage",
      lighting: "Éclairage",
      maintenance: "Entretien",
    },
    status: {
      chars: "caractères",
      copied: "Prompt copié",
      running: "Analyse en cours...",
      done: "Terminé",
      error: "Erreur",
      noAnalysis: "Aucune analyse terminée disponible pour le PDF.",
      pdfSaved: "PDF enregistré",
      pdfLibraryMissing: "La bibliothèque PDF n'a pas pu être chargée.",
      pdfReading: "Lecture du PDF...",
      pdfReadingPage: (page, total) => `Lecture de la page PDF ${page} sur ${total}...`,
      choosePdf: "Veuillez choisir un fichier PDF.",
      scanNoOcr:
        "Aucun texte n'a pu être extrait de ce PDF. Il s'agit peut-être d'un scan sans OCR.",
      noPdfText: "Aucun texte PDF lisible trouvé.",
      extracted: (pages, chars) => `${pages} page(s) extraites, ${chars} caractères.`,
      pdfReadError: "Le PDF n'a pas pu être lu.",
      analysisFailed: "L'analyse a échoué.",
      noAnalysisReceived: "Aucune analyse reçue.",
    },
    report: {
      title: "Analyse du contrat",
      subtitle: "Jardinage et aménagement paysager Suisse",
      created: "Créé le",
      focus: "Focus de l'analyse",
      works: "Travaux",
      notes: "Remarques particulières",
      analysis: "Analyse IA",
      disclaimer: "Analyse structurée des risques - pas un avis juridique contraignant.",
      fallbackFile: "analyse-contrat",
      defaultProject: "Analyse du contrat",
    },
    prompt: null,
  },
  it: {
    htmlLang: "it",
    title: "Analisi contratto paesaggistica CH",
    meta:
      "Generatore di prompt e analisi IA per contratti svizzeri di giardinaggio e paesaggistica.",
    ui: {
      eyebrow: "Svizzera - Giardinaggio - Paesaggistica",
      headline: "Analisi del contratto d'appalto",
      intro:
        "Crea un prompt strutturato per analizzare contratti svizzeri di giardinaggio e paesaggistica.",
      project: "Progetto / oggetto",
      projectPlaceholder: "es. riqualificazione giardino privato a Meilen",
      role: "Ruolo",
      roles: {
        neutral: "Analisi equilibrata",
        auftraggeber: "Focus committente",
        unternehmer: "Focus appaltatore",
      },
      worksLegend: "Lavori",
      normsLegend: "Norme e priorità",
      sia118: "Considerare SIA 118 se concordata",
      siaGaLa: "Verificare norme specifiche giardinaggio/paesaggistica",
      anwuchs: "Approfondire garanzia di attecchimento e manutenzione",
      neighbors: "Verificare vicini, confini e servitù",
      risks: "Rischi o note particolari",
      risksPlaceholder:
        "es. terreno in pendenza, vecchie condotte, muro in pietra esistente, accesso stretto, fasi di lavoro...",
      pdfUpload: "Caricare contratto in PDF",
      contractText: "Testo del contratto",
      contractPlaceholder: "Inserire qui il contratto d'appalto o l'offerta...",
      generatedPrompt: "Prompt generato",
      promptTask: "Incarico di analisi",
      copy: "Copia",
      analyze: "Avvia analisi",
      aiAnalysis: "Analisi IA",
      savePdf: "Salva PDF",
      analysisPlaceholder: "L'analisi appare qui dopo l'avvio...",
    },
    workTypes: {
      earthworks: "Movimenti terra",
      paving: "Pavimentazioni",
      walls: "Muri e bordure",
      drainage: "Drenaggio e smaltimento acqua",
      planting: "Piantumazione",
      lawn: "Prato e rinverdimento",
      irrigation: "Irrigazione",
      lighting: "Illuminazione",
      maintenance: "Manutenzione",
    },
    status: {
      chars: "caratteri",
      copied: "Prompt copiato",
      running: "Analisi in corso...",
      done: "Completato",
      error: "Errore",
      noAnalysis: "Nessuna analisi completata disponibile per il PDF.",
      pdfSaved: "PDF salvato",
      pdfLibraryMissing: "Impossibile caricare la libreria PDF.",
      pdfReading: "Lettura PDF...",
      pdfReadingPage: (page, total) => `Lettura pagina PDF ${page} di ${total}...`,
      choosePdf: "Selezionare un file PDF.",
      scanNoOcr:
        "Non è stato possibile estrarre testo da questo PDF. Potrebbe essere una scansione senza OCR.",
      noPdfText: "Nessun testo PDF leggibile trovato.",
      extracted: (pages, chars) => `${pages} pagina/e estratte, ${chars} caratteri.`,
      pdfReadError: "Impossibile leggere il PDF.",
      analysisFailed: "Analisi non riuscita.",
      noAnalysisReceived: "Nessuna analisi ricevuta.",
    },
    report: {
      title: "Analisi del contratto",
      subtitle: "Giardinaggio e paesaggistica Svizzera",
      created: "Creato il",
      focus: "Focus analisi",
      works: "Lavori",
      notes: "Note particolari",
      analysis: "Analisi IA",
      disclaimer: "Analisi strutturata dei rischi - non consulenza legale vincolante.",
      fallbackFile: "analisi-contratto",
      defaultProject: "Analisi del contratto",
    },
    prompt: null,
  },
};

translations.fr.prompt = {
  ...translations.en.prompt,
  project: "Projet / objet",
  works: "Travaux pertinents",
  risks: "Remarques / risques particuliers",
  roles: {
    neutral: "Analyse les positions des deux parties de manière équilibrée.",
    auftraggeber:
      "Accorde une attention particulière aux risques, conséquences financières et mécanismes de protection pour le maître d'ouvrage.",
    unternehmer:
      "Accorde une attention particulière au droit au paiement, aux travaux supplémentaires, aux obligations de collaboration du maître d'ouvrage et aux limites de responsabilité de l'entrepreneur.",
  },
  intro:
    "Analyse le contrat d'entreprise suivant pour des travaux de jardinage et d'aménagement paysager en Suisse du point de vue juridique, technique et économique.",
  legal:
    "Tiens compte du droit suisse et de la pratique suisse pertinente en matière de jardinage et d'aménagement paysager. Ne fournis pas un avis juridique contraignant, mais une analyse structurée des risques et du contrat. Signale clairement les points qui devraient être vérifiés par un spécialiste juridique ou technique suisse.",
  normTitle: "Normes et points d'examen particuliers :",
  norms: {
    sia118:
      "Vérifie la SIA 118 uniquement lorsqu'elle est convenue contractuellement ou pertinente comme standard de branche.",
    siaGaLa:
      "Tiens compte des normes suisses spécifiques au jardinage et à l'aménagement paysager, des règles techniques et de la pratique de branche.",
    anwuchs:
      "Vérifie en détail les garanties de reprise, d'entretien et de développement pour les plantes, gazons et végétalisations.",
    neighbors:
      "Vérifie les droits des voisins, distances aux limites, servitudes et exigences de droit public.",
    fallback: "Vérifie uniquement les normes expressément mentionnées dans le contrat.",
  },
  checkTitle: "Vérifie notamment :",
  checks: [
    "Parties contractantes, parcelle, lieu du projet et étendue des prestations",
    "Description des travaux de jardinage et d'aménagement paysager",
    "Plans, descriptif des prestations, offres, annexes techniques et ordre de priorité des documents contractuels",
    "Autorisations, droits des voisins, distances aux limites, servitudes et exigences de droit public",
    "Terrain, nature du sol, pollutions, conduites, drainage et évacuation des eaux",
    "Délais, programme de construction, risques météorologiques, dépendances saisonnières et périodes de plantation",
    "Rémunération, plan de paiement, acomptes, travaux en régie, avenants, renchérissement et TVA",
    "Commandes de modification, plus-values/moins-values, prix des avenants et processus d'approbation",
    "Obligations de collaboration du maître d'ouvrage, accès au chantier, eau/électricité, validation des plans et interfaces avec des tiers",
    "Réception, réceptions partielles, avis de défauts, délais de garantie et de responsabilité pour défauts",
    "Qualité des plantes, obligations d'entretien, réussite de la reprise et obligations de remplacement",
    "Responsabilité, assurances, dommages aux installations existantes, conduites, fonds voisins et bâtiments",
    "Protection des plantations, revêtements, murs, bordures et installations existants",
    "Élimination, déblais, recyclage, exigences environnementales, protection des eaux et des sols",
    "Résiliation, suspension, retard, pénalités contractuelles et conséquences des reports de délais",
    "Obligations de documentation, contrôle, métrés et preuves",
    "Clauses peu claires, contradictoires, déséquilibrées ou risquées",
    "Dispositions manquantes à compléter",
  ],
  outputTitle: "Structure l'analyse avec :",
  outputs: [
    "Conclusion brève",
    "Principaux risques pour le maître d'ouvrage",
    "Principaux risques pour l'entrepreneur de jardinage/paysage",
    "Risques techniques et pratiques d'exécution",
    "Clauses remarquables avec justification",
    "Propositions concrètes de formulation pour des clauses claires et équitables",
    "Questions ouvertes avant signature",
    "Annexes, preuves et contrôles recommandés",
  ],
  emphasis:
    "Porte une attention particulière à la délimitation claire des prestations, aux interfaces avec d'autres entrepreneurs, aux conditions imprévues de sol ou de conduites, aux risques météorologiques et saisonniers, à la qualité des plantes, à l'entretien, à la réussite de la reprise, à la réception et aux avis de défauts selon la pratique suisse.",
  contract: "Voici le contrat à analyser :",
  contractPlaceholder: "[Insérer ici le texte du contrat]",
  answerLanguage: "Réponds en français.",
};

translations.it.prompt = {
  ...translations.en.prompt,
  project: "Progetto / oggetto",
  works: "Lavori rilevanti",
  risks: "Note / rischi particolari",
  roles: {
    neutral: "Analizza in modo equilibrato le posizioni di entrambe le parti.",
    auftraggeber:
      "Concentrati in particolare su rischi, conseguenze economiche e meccanismi di protezione per il committente.",
    unternehmer:
      "Concentrati in particolare sul diritto al pagamento, sulle varianti, sugli obblighi di collaborazione del committente e sui limiti di responsabilità dell'appaltatore.",
  },
  intro:
    "Analizza il seguente contratto d'appalto per lavori di giardinaggio e paesaggistica in Svizzera dal punto di vista giuridico, tecnico ed economico.",
  legal:
    "Considera il diritto svizzero e la prassi svizzera pertinente per giardinaggio e paesaggistica. Non fornire una consulenza legale vincolante, ma un'analisi strutturata dei rischi e del contratto. Indica chiaramente quali punti dovrebbero essere verificati da uno specialista legale o tecnico svizzero.",
  normTitle: "Norme e punti di verifica particolari:",
  norms: {
    sia118:
      "Verifica la SIA 118 solo se è stata concordata contrattualmente o se è ragionevolmente rilevante come standard di settore.",
    siaGaLa:
      "Considera norme svizzere specifiche per giardinaggio e paesaggistica, regole tecniche e prassi di settore.",
    anwuchs:
      "Verifica in modo approfondito le garanzie di attecchimento, manutenzione e sviluppo per piante, prati e rinverdimenti.",
    neighbors:
      "Verifica diritti dei vicini, distanze dai confini, servitù e requisiti di diritto pubblico.",
    fallback: "Verifica solo le norme espressamente indicate nel contratto.",
  },
  checkTitle: "Verifica in particolare:",
  checks: [
    "Parti contrattuali, fondo, luogo del progetto e ambito delle prestazioni",
    "Descrizione dei lavori di giardinaggio e paesaggistica",
    "Piani, elenco prestazioni, offerte, allegati tecnici e ordine di prevalenza dei documenti contrattuali",
    "Permessi, diritti dei vicini, distanze dai confini, servitù e requisiti di diritto pubblico",
    "Terreno, caratteristiche del suolo, contaminazioni, sottoservizi, drenaggio e smaltimento delle acque",
    "Scadenze, programma lavori, rischi meteo, dipendenze stagionali e periodi di piantumazione",
    "Compenso, piano pagamenti, acconti, lavori a regia, varianti, rincaro e IVA",
    "Ordini di modifica, maggiori/minori prestazioni, prezzi delle varianti e processi di approvazione",
    "Obblighi di collaborazione del committente, accesso al cantiere, acqua/elettricità, approvazione dei piani e interfacce con terzi",
    "Collaudo, collaudi parziali, denuncia dei difetti, termini di garanzia e responsabilità per difetti",
    "Qualità delle piante, obblighi di manutenzione, successo dell'attecchimento e obblighi di sostituzione",
    "Responsabilità, assicurazioni, danni a impianti esistenti, condotte, fondi vicini ed edifici",
    "Protezione di piantumazioni, pavimentazioni, muri, bordure e installazioni esistenti",
    "Smaltimento, scavi, riciclaggio, requisiti ambientali, protezione delle acque e del suolo",
    "Recesso, sospensione, ritardo, penali contrattuali e conseguenze degli spostamenti di termine",
    "Obblighi di documentazione, verifica, misurazione e prova",
    "Clausole poco chiare, contraddittorie, unilaterali o rischiose",
    "Regolamentazioni mancanti da integrare",
  ],
  outputTitle: "Struttura l'analisi con:",
  outputs: [
    "Conclusione breve",
    "Principali rischi per il committente",
    "Principali rischi per l'appaltatore di giardinaggio/paesaggistica",
    "Rischi tecnici e pratici di esecuzione",
    "Clausole rilevanti con motivazione",
    "Proposte concrete di formulazione per clausole chiare ed eque",
    "Domande aperte prima della firma",
    "Allegati, prove e controlli raccomandati",
  ],
  emphasis:
    "Presta particolare attenzione alla chiara delimitazione delle prestazioni, alle interfacce con altri imprenditori, a condizioni impreviste del suolo o dei sottoservizi, ai rischi meteo e stagionali, alla qualità delle piante, alla manutenzione, al successo dell'attecchimento, al collaudo e alla denuncia dei difetti secondo la prassi svizzera.",
  contract: "Ecco il contratto da analizzare:",
  contractPlaceholder: "[Inserire qui il testo del contratto]",
  answerLanguage: "Rispondi in italiano.",
};

function detectLanguage() {
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "de"];
  const supported = Object.keys(translations);

  for (const language of preferred) {
    const base = language.toLowerCase().split("-")[0];
    if (supported.includes(base)) {
      return base;
    }
  }

  return "de";
}

const currentLanguage = detectLanguage();
const i18n = translations[currentLanguage];

const fields = {
  projectName: document.querySelector("#projectName"),
  role: document.querySelector("#role"),
  specialRisks: document.querySelector("#specialRisks"),
  contractText: document.querySelector("#contractText"),
  pdfFile: document.querySelector("#pdfFile"),
  sia118: document.querySelector("#sia118"),
  siaGaLa: document.querySelector("#siaGaLa"),
  anwuchs: document.querySelector("#anwuchs"),
  neighbors: document.querySelector("#neighbors"),
};

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
}

function setLabelForControl(control, text) {
  const label = control.closest("label");
  const textNode = [...label.childNodes].find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
  );

  if (textNode) {
    textNode.textContent = control === label.firstElementChild ? ` ${text}` : `\n              ${text}\n              `;
  }
}

function setButtonText(button, text) {
  button.textContent = text;
  button.setAttribute("aria-label", text);
  button.setAttribute("title", text);
}

function applyTranslations() {
  document.documentElement.lang = i18n.htmlLang;
  document.title = i18n.title;
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", i18n.meta);

  document.querySelector(".panel-header .eyebrow").textContent = i18n.ui.eyebrow;
  document.querySelector(".panel-header h1").textContent = i18n.ui.headline;
  document.querySelector(".panel-header p:last-child").textContent = i18n.ui.intro;

  setLabelForControl(fields.projectName, i18n.ui.project);
  fields.projectName.placeholder = i18n.ui.projectPlaceholder;
  setLabelForControl(fields.role, i18n.ui.role);
  fields.role.querySelector("[value='neutral']").textContent = i18n.ui.roles.neutral;
  fields.role.querySelector("[value='auftraggeber']").textContent =
    i18n.ui.roles.auftraggeber;
  fields.role.querySelector("[value='unternehmer']").textContent =
    i18n.ui.roles.unternehmer;

  const fieldsets = document.querySelectorAll("fieldset");
  fieldsets[0].querySelector("legend").textContent = i18n.ui.worksLegend;
  fieldsets[1].querySelector("legend").textContent = i18n.ui.normsLegend;

  document.querySelectorAll("#workTypes input").forEach((input) => {
    const label = i18n.workTypes[input.dataset.workKey];
    input.value = label;
    setLabelForControl(input, label);
  });

  setLabelForControl(fields.sia118, i18n.ui.sia118);
  setLabelForControl(fields.siaGaLa, i18n.ui.siaGaLa);
  setLabelForControl(fields.anwuchs, i18n.ui.anwuchs);
  setLabelForControl(fields.neighbors, i18n.ui.neighbors);

  setLabelForControl(fields.specialRisks, i18n.ui.risks);
  fields.specialRisks.placeholder = i18n.ui.risksPlaceholder;
  setLabelForControl(fields.pdfFile, i18n.ui.pdfUpload);
  setLabelForControl(fields.contractText, i18n.ui.contractText);
  fields.contractText.placeholder = i18n.ui.contractPlaceholder;

  document.querySelector(".toolbar .eyebrow").textContent = i18n.ui.generatedPrompt;
  document.querySelector(".toolbar h2").textContent = i18n.ui.promptTask;
  setButtonText(copyButton, i18n.ui.copy);
  setButtonText(analyzeButton, i18n.ui.analyze);
  document.querySelector(".analysis-header .eyebrow").textContent = i18n.ui.aiAnalysis;
  setButtonText(exportPdfButton, i18n.ui.savePdf);
  analysisOutput.placeholder = i18n.ui.analysisPlaceholder;
}

function selectedWorkTypes() {
  return [...document.querySelectorAll("#workTypes input:checked")].map((input) => {
    const key = input.dataset.workKey;
    return i18n.workTypes[key] || input.value;
  });
}

function roleText(role) {
  return i18n.prompt.roles[role] || i18n.prompt.roles.neutral;
}

function checkedLine(condition, text) {
  return condition ? `- ${text}\n` : "";
}

function buildPrompt() {
  const project = fields.projectName.value.trim();
  const risks = fields.specialRisks.value.trim();
  const contract = fields.contractText.value.trim();
  const works = selectedWorkTypes();
  const prompt = i18n.prompt;

  const context = [
    project ? `${prompt.project}: ${project}` : "",
    works.length ? `${prompt.works}: ${works.join(", ")}` : "",
    risks ? `${prompt.risks}: ${risks}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const normBlock =
    checkedLine(
      fields.sia118.checked,
      prompt.norms.sia118,
    ) +
    checkedLine(
      fields.siaGaLa.checked,
      prompt.norms.siaGaLa,
    ) +
    checkedLine(
      fields.anwuchs.checked,
      prompt.norms.anwuchs,
    ) +
    checkedLine(
      fields.neighbors.checked,
      prompt.norms.neighbors,
    );

  const checks = prompt.checks.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const outputs = prompt.outputs.map((item) => `- ${item}`).join("\n");

  return `${prompt.intro}

${roleText(fields.role.value)}

${context ? `${context}\n` : ""}${prompt.legal}

${prompt.normTitle}
${normBlock || `- ${prompt.norms.fallback}\n`}
${prompt.checkTitle}
${checks}

${prompt.outputTitle}
${outputs}

${prompt.emphasis}

${prompt.answerLanguage}

${prompt.contract}
${contract || prompt.contractPlaceholder}`;
}

function renderPrompt() {
  output.value = buildPrompt();
  charCount.textContent = `${output.value.length.toLocaleString(i18n.htmlLang)} ${i18n.status.chars}`;
}

function updateExportAvailability() {
  exportPdfButton.disabled = !analysisOutput.value.trim();
}

async function copyPrompt() {
  await navigator.clipboard.writeText(output.value);
  copyStatus.textContent = i18n.status.copied;
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
}

async function runAnalysis() {
  analyzeButton.disabled = true;
  exportPdfButton.disabled = true;
  analysisStatus.textContent = i18n.status.running;
  analysisOutput.value = "";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: output.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || i18n.status.analysisFailed);
    }

    analysisOutput.value = data.analysis || i18n.status.noAnalysisReceived;
    analysisStatus.textContent = i18n.status.done;
    updateExportAvailability();
  } catch (error) {
    analysisOutput.value = error.message;
    analysisStatus.textContent = i18n.status.error;
  } finally {
    analyzeButton.disabled = false;
  }
}

function safeFileName(value) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || i18n.report.fallbackFile
  );
}

function addFooter(doc, pageNumber, totalPages) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setDrawColor(218, 224, 219);
  doc.line(16, pageHeight - 18, pageWidth - 16, pageHeight - 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(102, 115, 108);
  doc.text(
    i18n.report.disclaimer,
    16,
    pageHeight - 10,
  );
  doc.text(`${pageNumber} / ${totalPages}`, pageWidth - 16, pageHeight - 10, {
    align: "right",
  });
}

function ensurePageSpace(doc, cursor, neededHeight) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (cursor + neededHeight <= pageHeight - 26) {
    return cursor;
  }

  doc.addPage();
  return 22;
}

function writeWrappedText(doc, text, options) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = options.maxWidth || pageWidth - 32;
  const lineHeight = options.lineHeight || 6;
  let cursor = options.y;

  const paragraphs = text.split(/\n{2,}/);

  paragraphs.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph.trim() || " ", maxWidth);

    lines.forEach((line) => {
      cursor = ensurePageSpace(doc, cursor, lineHeight);
      doc.text(line, options.x, cursor);
      cursor += lineHeight;
    });

    cursor += options.paragraphGap || 3;
  });

  return cursor;
}

function exportAnalysisPdf() {
  const analysis = analysisOutput.value.trim();

  if (!analysis) {
    analysisStatus.textContent = i18n.status.noAnalysis;
    return;
  }

  if (!window.jspdf?.jsPDF) {
    analysisStatus.textContent = i18n.status.pdfLibraryMissing;
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const projectName = fields.projectName.value.trim() || i18n.report.defaultProject;
  const date = new Date().toLocaleDateString(i18n.htmlLang);
  const works = selectedWorkTypes();
  let y = 18;

  doc.setFillColor(47, 107, 79);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text(i18n.report.title, 16, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(i18n.report.subtitle, 16, 22);

  y = 42;
  doc.setTextColor(36, 48, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(projectName, 16, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(102, 115, 108);
  doc.text(`${i18n.report.created}: ${date}`, 16, y);
  y += 6;
  doc.text(`${i18n.report.focus}: ${fields.role.options[fields.role.selectedIndex].text}`, 16, y);

  if (works.length) {
    y += 6;
    doc.text(`${i18n.report.works}: ${works.join(", ")}`, 16, y, {
      maxWidth: pageWidth - 32,
    });
  }

  const risks = fields.specialRisks.value.trim();
  if (risks) {
    y += 11;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 48, 42);
    doc.text(i18n.report.notes, 16, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 61, 56);
    y = writeWrappedText(doc, risks, {
      x: 16,
      y,
      maxWidth: pageWidth - 32,
      lineHeight: 5.5,
      paragraphGap: 2,
    });
  }

  y = ensurePageSpace(doc, y + 4, 16);
  doc.setFillColor(248, 250, 247);
  doc.roundedRect(16, y, pageWidth - 32, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(47, 107, 79);
  doc.text(i18n.report.analysis, 20, y + 8);

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(31, 43, 37);
  y = writeWrappedText(doc, analysis, {
    x: 16,
    y,
    maxWidth: pageWidth - 32,
    lineHeight: 5.4,
    paragraphGap: 3,
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    addFooter(doc, page, totalPages);
  }

  doc.save(`${safeFileName(projectName)}-${date}.pdf`);
  analysisStatus.textContent = i18n.status.pdfSaved;
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    throw new Error(i18n.status.pdfLibraryMissing);
  }

  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  }).promise;

  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    pdfStatus.textContent = i18n.status.pdfReadingPage(pageNumber, pdf.numPages);

    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => item.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    pages.push(pageText);
  }

  return {
    text: pages.filter(Boolean).join("\n\n"),
    pages: pdf.numPages,
  };
}

async function handlePdfUpload(event) {
  const [file] = event.target.files;

  if (!file) {
    pdfStatus.textContent = "";
    return;
  }

  if (file.type && file.type !== "application/pdf") {
    pdfStatus.textContent = i18n.status.choosePdf;
    return;
  }

  pdfStatus.textContent = i18n.status.pdfReading;

  try {
    const result = await extractPdfText(file);

    if (!result.text) {
      fields.contractText.value =
        i18n.status.scanNoOcr;
      pdfStatus.textContent = i18n.status.noPdfText;
    } else {
      fields.contractText.value = result.text;
      pdfStatus.textContent = i18n.status.extracted(
        result.pages,
        result.text.length.toLocaleString(i18n.htmlLang),
      );
    }

    renderPrompt();
  } catch (error) {
    pdfStatus.textContent = error.message || i18n.status.pdfReadError;
  }
}

applyTranslations();
form.addEventListener("input", renderPrompt);
copyButton.addEventListener("click", copyPrompt);
analyzeButton.addEventListener("click", runAnalysis);
exportPdfButton.addEventListener("click", exportAnalysisPdf);
analysisOutput.addEventListener("input", updateExportAvailability);
fields.pdfFile.addEventListener("change", handlePdfUpload);
updateExportAvailability();
renderPrompt();
