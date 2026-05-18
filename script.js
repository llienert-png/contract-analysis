const form = document.querySelector("#promptForm");
const output = document.querySelector("#promptOutput");
const overviewOutput = document.querySelector("#panel-overview");
const riskOutput = document.querySelector("#riskOutput");
const clauseOutput = document.querySelector("#clauseOutput");
const questionOutput = document.querySelector("#questionOutput");
const reportOutput = document.querySelector("#reportOutput");
const synthesisOutput = document.querySelector("#synthesisOutput");
const analysisOutput = document.querySelector("#analysisOutput");
const copyButton = document.querySelector("#copyButton");
const analyzeButton = document.querySelector("#analyzeButton");
const synthesizeButton = document.querySelector("#synthesizeButton");
const exportPdfButton = document.querySelector("#exportPdfButton");
const copyStatus = document.querySelector("#copyStatus");
const analysisStatus = document.querySelector("#analysisStatus");
const charCount = document.querySelector("#charCount");
const pdfStatus = document.querySelector("#pdfStatus");
const tabButtons = [...document.querySelectorAll(".tab-button")];
const tabPanels = [...document.querySelectorAll(".tab-panel")];

const translations = {
  de: {
    htmlLang: "de",
    title: "Analyse-Prompt für Schweizer Gartenbau- und Landschaftsbauverträge.",
    meta:
      "Analyse-Prompt für Schweizer Gartenbau- und Landschaftsbauverträge.",
    ui: {
      eyebrow: "Schweiz - Gartenbau - Landschaftsbau",
      headline: "Analyse-Prompt für Schweizer Gartenbau- und Landschaftsbauverträge.",
      intro:
        "Prüfe Schweizer Gartenbau- und Landschaftsbauverträge aus Unternehmersicht: Risiken, Klauseln, Fragen und Bericht.",
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
      neighbors: "SIA-Nachweise, Rapporte und Abnahmeunterlagen prüfen",
      risks: "Besondere Risiken oder Hinweise",
      risksPlaceholder:
        "z.B. Hanglage, alte Leitungen, bestehende Natursteinmauer, enger Zugang, Etappierung...",
      pdfUpload: "Vertrag als PDF hochladen",
      contractText: "Vertragstext",
      contractPlaceholder: "Hier den Werkvertrag oder die Offerte einfügen...",
      generatedPrompt: "Unternehmer-Cockpit",
      promptTask: "Analysezentrum",
      copy: "Kopieren",
      analyze: "Analyse starten",
      aiAnalysis: "KI-Analyse",
      savePdf: "PDF speichern",
      analysisPlaceholder: "Die Analyse erscheint hier nach dem Start...",
      synthesize: "Synthese erstellen",
      tabs: {
        overview: "Cockpit",
        risks: "Risiken",
        clauses: "Klauseln",
        questions: "Fragen",
        report: "Bericht",
        synthesis: "Synthese",
        prompt: "Prompt",
      },
      synthesisPlaceholder: "Die Synthese erscheint hier nach der Detailanalyse...",
      workspaceLabel: "Analyse-Prompt für Schweizer Gartenbau- und Landschaftsbauverträge",
      tabsLabel: "Arbeitsbereich Vertragsanalyse",
      tabListLabel: "Ansichten",
    },
    cockpit: {
      high: "Hoch",
      medium: "Mittel",
      noContractText: "Kein Vertragstext",
      noWorkTypes: "Keine Arbeiten ausgewählt",
      noSpecialRisks: "Keine besonderen Risiken erfasst.",
      toBeConfirmed: "Noch zu bestätigen",
      project: "Projekt",
      works: "Arbeiten",
      contractText: "Vertragstext",
      riskAreas: "Risikobereiche",
      clauseChecks: "Klauselprüfungen",
      openQuestions: "Offene Fragen",
      contractorFocus: "Unternehmer-Fokus",
      siaChecked: "SIA 118 geprüft",
      siaOff: "SIA 118 aus",
      plantChecked: "Anwuchs geprüft",
      plantOff: "Anwuchs aus",
      cockpitTitle: "Unternehmer-Cockpit",
      clauseReviewTitle: "Klauselprüfung Unternehmer",
      riskDashboardTitle: "Risikodashboard Unternehmer",
      highestRisks: "Wichtigste Risiken aus Unternehmersicht",
      relevantWorks: "Relevante Arbeiten",
      specialNotes: "Besondere Hinweise",
      followUpTitle: "Follow-up-Fragen Unternehmer",
      followUpIntro: "Vor Unterzeichnung oder vor juristischer Prüfung verwenden.",
      reportTitle: "Berichtsentwurf Unternehmer",
      contractorConclusion: "Fazit aus Unternehmersicht",
      negotiationPriorities: "Verhandlungsprioritäten",
      evidenceChecklist: "Nachweis- und Beilagencheckliste",
      reportConclusion:
        "Der Vertrag sollte vor allem auf Zahlungssicherheit, Durchsetzbarkeit von Nachträgen, Mitwirkungspflichten des Auftraggebers, Haftungsgrenzen, Abnahme und Beweissicherung geprüft werden. Unklare Leistungsabgrenzungen, fehlende Ausschlüsse oder einseitige Gewährleistungsregeln sollten vor der Unterzeichnung bereinigt werden.",
      riskItems: {
        or: {
          title: "OR-Werkvertragsrisiken",
          detail: "Prüfe Vergütung, Festpreis oder Kostenvoranschlag, Abnahme, Prüfung, Mängelrüge, Gewährleistung, Verjährung, Kündigung und Beweislast nach Schweizer Obligationenrecht.",
          action: "Ordne jedes OR-Risiko einer Vertragsklausel zu und ergänze unternehmerfreundliche Formulierungen bei Lücken oder einseitigen Regeln.",
        },
        payment: {
          title: "Werklohn und Zahlung",
          detail: "Prüfe Fälligkeiten, Akontozahlungen, Rückbehalte, Verzugszins, MWST und ob Zahlungen von Auftraggeberfreigaben abhängen.",
          action: "Zahlungsmeilensteine und Folgen verspäteter Zahlung vor Unterzeichnung klären.",
        },
        variations: {
          title: "Nachträge und Mehrkosten",
          detail: "Prüfe schriftliche Bestellungsänderungen, Regie, Mengenänderungen, unvorhergesehene Verhältnisse und Preisfreigaben.",
          action: "Schnellen schriftlichen Freigabeprozess für Nachträge und Bauanweisungen ergänzen.",
        },
        cooperation: {
          title: "Mitwirkung Auftraggeber",
          detail: "Prüfe Zugang, Pläne, Freigaben, Wasser, Strom, Entscheide und Schnittstellen zu Dritten.",
          action: "Termine und Mehrkosten ausdrücklich an rechtzeitige Mitwirkung knüpfen.",
        },
        scope: {
          title: "Leistungsabgrenzung",
          detail: "Suche unklare Ausschlüsse, Schnittstellen zu anderen Unternehmern und Schutz bestehender Anlagen.",
          action: "Ausschlüsse, Annahmen und Rangordnung der Unterlagen als Vertragsbestandteil festhalten.",
        },
        jardin: {
          title: "JardinSuisse-Praxis",
          detail: "Prüfe, ob JardinSuisse-Merkblätter, Qualitätscharta, Pflegegrundsätze oder regionale Empfehlungen referenziert sind.",
          action: "Klären, ob JardinSuisse-Unterlagen verbindliche Vertragsbestandteile oder nur Ausführungshilfe sind.",
        },
        sia: {
          title: "SIA-Nachweise",
          detail: "Prüfe Protokolle, Rapporte, Ausmasse, Regierapporte, Nachträge, Abnahmen und Mängellisten mit SIA-Bezug.",
          action: "Fehlende SIA-Nachweise anfordern oder festlegen, welche Formulare/Protokolle verwendet werden.",
        },
        acceptance: {
          title: "Abnahme und Mängel",
          detail: "Prüfe Teilabnahme, Schlussabnahme, Mängelrügefristen, Dokumentation und Beweislast.",
          action: "Abnahmeprotokolle, Fotodokumentation und schriftliche Mängelprozesse verwenden.",
        },
        liability: {
          title: "Haftung und Versicherung",
          detail: "Prüfe Schäden an Leitungen, Nachbargrundstücken, Pflanzen, Mauern, Belägen und Folgeschäden.",
          action: "Versicherungspflichten bestätigen und Haftungsgrenzen verhandeln.",
        },
        plant: {
          title: "Anwuchs und Pflanzen",
          detail: "Pflanzqualität, Bewässerung, Pflege, Ersatzpflichten und Anwuchsgarantien brauchen klare Kontrollgrenzen.",
          action: "Unternehmerpflichten von Auftraggeberpflege nach Übergabe trennen.",
        },
        special: {
          title: "Besonderer Projekthinweis",
          action: "Diesen Hinweis in Preis, Termine, Ausschlüsse und Nachweise übersetzen.",
        },
      },
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
          "Prüfe SIA-Nachweise, Rapporte, Ausmasse, Regierapporte, Nachträge, Abnahmeunterlagen, Mängellisten und Übergabeprotokolle.",
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
    title: "Analysis prompt for Swiss garden construction and landscaping contracts.",
    meta:
      "Analysis prompt for Swiss garden construction and landscaping contracts.",
    ui: {
      eyebrow: "Switzerland - Garden construction - Landscaping",
      headline: "Analysis prompt for Swiss garden construction and landscaping contracts.",
      intro:
        "Review Swiss garden construction and landscaping contracts from the contractor side: risks, clauses, questions and report.",
      project: "Project / property",
      projectPlaceholder: "e.g. Private garden redesign in Meilen",
      role: "Role",
      roles: {
        neutral: "Contractor focus",
        auftraggeber: "Contractor focus",
        unternehmer: "Contractor focus",
      },
      worksLegend: "Works",
      normsLegend: "Standards & focus areas",
      sia118: "Consider SIA 118 if agreed",
      siaGaLa: "Check garden and landscaping-specific standards",
      anwuchs: "Deepen plant establishment and maintenance guarantees",
      neighbors: "Check SIA records, reports and acceptance documents",
      risks: "Special risks or notes",
      risksPlaceholder:
        "e.g. sloping site, old utility lines, existing natural stone wall, narrow access, staged works...",
      pdfUpload: "Upload contract as PDF",
      contractText: "Contract text",
      contractPlaceholder: "Paste the work contract or quotation here...",
      generatedPrompt: "Contractor cockpit",
      promptTask: "Review center",
      copy: "Copy",
      analyze: "Start analysis",
      aiAnalysis: "AI analysis",
      savePdf: "Save PDF",
      analysisPlaceholder: "The analysis appears here after starting...",
      synthesize: "Create synthesis",
      tabs: {
        overview: "Cockpit",
        risks: "Risks",
        clauses: "Clauses",
        questions: "Questions",
        report: "Report",
        synthesis: "Synthesis",
        prompt: "Prompt",
      },
      synthesisPlaceholder: "The synthesis appears here after the detailed analysis...",
      workspaceLabel: "Analysis prompt for Swiss garden construction and landscaping contracts",
      tabsLabel: "Contract review workspace",
      tabListLabel: "Review views",
    },
    cockpit: {
      high: "High",
      medium: "Medium",
      noContractText: "No contract text",
      noWorkTypes: "No work types selected",
      noSpecialRisks: "No special risks added yet.",
      toBeConfirmed: "To be confirmed",
      project: "Project",
      works: "Works",
      contractText: "Contract text",
      riskAreas: "Risk areas",
      clauseChecks: "Clause checks",
      openQuestions: "Open questions",
      contractorFocus: "Contractor focus",
      siaChecked: "SIA 118 checked",
      siaOff: "SIA 118 off",
      plantChecked: "Plant guarantee checked",
      plantOff: "Plant guarantee off",
      cockpitTitle: "Contractor cockpit",
      clauseReviewTitle: "Contractor clause review",
      riskDashboardTitle: "Contractor risk dashboard",
      highestRisks: "Highest-priority contractor risks to review",
      relevantWorks: "Relevant works",
      specialNotes: "Special notes",
      followUpTitle: "Contractor follow-up questions",
      followUpIntro: "Use these before signing or before sending the contract for legal review.",
      reportTitle: "Contractor contract review draft",
      contractorConclusion: "Contractor-side conclusion",
      negotiationPriorities: "Negotiation priorities",
      evidenceChecklist: "Evidence checklist",
      reportConclusion:
        "The contract should be reviewed primarily for payment security, recoverability of variations, client cooperation duties, liability limits, acceptance mechanics and evidence requirements. Any unclear scope, missing exclusion or one-sided warranty language should be clarified before signature.",
      riskItems: {
        or: {
          title: "OR work-contract risks",
          detail: "Check Swiss Code of Obligations work-contract issues: remuneration, fixed price or estimate, acceptance, inspection, defect notice, warranty remedies, limitation periods, termination and burden of proof.",
          action: "Map each OR risk to a contract clause and add contractor-protective wording where the contract is silent or one-sided.",
        },
        payment: {
          title: "Payment entitlement",
          detail: "Check due dates, instalments, retention, default interest, VAT and whether payment depends on client-side approvals.",
          action: "Clarify payment milestones and consequences of late payment before signature.",
        },
        variations: {
          title: "Variations and extra costs",
          detail: "Review written change-order rules, daywork, quantity changes, unforeseen conditions and pricing approval.",
          action: "Add a fast written approval route for variations and site instructions.",
        },
        cooperation: {
          title: "Client cooperation",
          detail: "Confirm duties for access, plans, approvals, water, power, decisions and third-party coordination.",
          action: "Tie deadlines and extra costs to timely client cooperation.",
        },
        scope: {
          title: "Scope boundaries",
          detail: "Look for unclear exclusions, interfaces with other contractors and protection of existing assets.",
          action: "Attach exclusions, assumptions and order of precedence to the contract.",
        },
        jardin: {
          title: "JardinSuisse guidance",
          detail: "Check whether JardinSuisse leaflets, quality charters, maintenance principles or regional association guidance are referenced or useful as industry practice.",
          action: "Clarify whether JardinSuisse materials are binding contract documents or only guidance for execution and quality.",
        },
        sia: {
          title: "SIA records and proof",
          detail: "Check whether SIA-related protocols, site reports, measurements, daywork reports, change orders, acceptance records and defect lists exist.",
          action: "Request missing SIA records or define which forms/protocols will be used before work starts.",
        },
        acceptance: {
          title: "Acceptance and defects",
          detail: "Review partial acceptance, final acceptance, defect notice deadlines, documentation and burden of proof.",
          action: "Use handover protocols, photo records and written defect-response procedures.",
        },
        liability: {
          title: "Liability and insurance",
          detail: "Check damage to utilities, neighbouring property, existing plants, walls, paving and consequential losses.",
          action: "Confirm insurance duties and negotiate liability limits where possible.",
        },
        plant: {
          title: "Plant establishment",
          detail: "Plant quality, watering, care, replacement duties and establishment guarantees need clear control limits.",
          action: "Separate contractor planting duties from client maintenance duties after handover.",
        },
        special: {
          title: "Special project note",
          action: "Translate this note into pricing, programme, exclusion and evidence wording.",
        },
      },
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
      title: "Analysis prompt for Swiss garden construction and landscaping contracts",
      subtitle: "Garden construction and landscaping Switzerland",
      created: "Created on",
      focus: "Analysis focus",
      works: "Works",
      notes: "Special notes",
      analysis: "AI analysis",
      disclaimer: "Structured risk analysis - not binding legal advice.",
      fallbackFile: "contract-analysis",
      defaultProject: "Analysis prompt",
    },
    prompt: {
      project: "Project / property",
      works: "Relevant works",
      risks: "Special notes / risks",
      roles: {
        neutral: "Analyse the contract from the garden/landscaping contractor's perspective.",
        auftraggeber:
          "Place special emphasis on risks, cost consequences and protection mechanisms for the client.",
        unternehmer:
          "Place special emphasis on payment entitlement, variations, client cooperation duties and liability limits for the contractor.",
      },
      intro:
        "Analyse the following work contract for garden construction and landscaping works in Switzerland from the contractor's legal, technical and commercial perspective.",
      legal:
        "Consider Swiss law and relevant Swiss garden construction and landscaping practice. Do not provide binding legal advice; provide a structured contractor-side risk and contract analysis. Clearly flag points that should be reviewed by a Swiss legal or technical specialist.",
      normTitle: "Standards and special review points:",
      sourceTitle: "Source and evidence rules:",
      sourceInstructions: [
        "Use the contract text and appendices as the primary source. Cite contract sections, headings or short excerpts where available.",
        "Base legal statements on Swiss law, especially the Swiss Code of Obligations (CO/OR) Art. 363 et seq. for contracts for work and services and Art. 367-371 for inspection, defect notices and limitation periods where relevant.",
        "For Swiss Code of Obligations work-contract risks, check in particular: formation and scope of the work contract, contractor duties, remuneration, fixed price versus estimate, client acceptance, inspection duties, defect notices, warranty remedies, limitation periods, termination, impossibility, delay and burden of proof.",
        "Preferred legal source name: Swiss Code of Obligations, SR 220, Fedlex: https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en",
        "Preferred standard source name where applicable: SIA 118 General Conditions for Construction Work, official SIA shop/platform. Do not quote paid SIA text unless it is provided in the contract.",
        "Check relevant JardinSuisse materials where applicable, especially technical leaflets, industry guidance, maintenance principles, quality charters or regional JardinSuisse documents. Treat them as industry practice/guidance unless the contract makes them binding.",
        "Use SIA 118 and other SIA standards only if they are contractually agreed, expressly referenced or clearly relevant as a standard to be checked. State that basis.",
        "Check SIA-related records and project documents where available: acceptance records, site meeting minutes, construction journals, measurement records, daywork reports, change-order records, defect lists, handover protocols, plans, specifications and order-of-precedence clauses.",
        "If SIA records or SIA-referenced forms are missing, identify which records should be requested before signing or before starting work.",
        "Where relevant, consider cantonal/municipal permits, public-law requirements, neighbour rights, boundary distances, easements, environmental, water and soil protection requirements.",
        "If the source or contractual basis is missing or cannot be verified, write 'source/contractual basis to be verified' instead of making a certain claim.",
        "Separate hard contract/legal findings from practical recommendations and industry practice.",
      ],
      riskTitle: "Risk method:",
      riskInstructions: [
        "Assess every risk from the contractor's perspective with severity (high/medium/low), probability (high/medium/low), financial impact, schedule impact and evidence required.",
        "For every risk, name the affected contract clause or write 'no clear contract clause found'.",
        "Explain why the risk matters to the contractor: payment, variation, margin, liability, schedule, acceptance, warranty or burden of proof.",
        "Give concrete countermeasures: clause wording, question, appendix, reservation, photo/report evidence or approval workflow.",
      ],
      norms: {
        sia118:
          "Review SIA 118 only where it is contractually agreed or reasonably relevant as an industry standard.",
        siaGaLa:
          "Consider Swiss garden and landscaping-specific standards, technical rules and industry practice.",
        anwuchs:
          "Review plant establishment, maintenance and development guarantees for plants, lawns and greening in depth.",
        neighbors:
          "Review SIA records, site reports, measurement records, daywork reports, change orders, acceptance documents, defect lists and handover protocols.",
        fallback: "Review only the standards expressly named in the contract.",
      },
      checkTitle: "Review in particular:",
      checks: [
        "Contracting parties, property, project location and scope of work",
        "Description of garden construction and landscaping works",
        "Plans, bill of quantities, quotations, technical appendices and order of precedence",
        "SIA-relevant records, minutes, site reports, measurement records, daywork reports, change orders, acceptance records and defect lists",
        "JardinSuisse guidance, technical leaflets, quality charters, maintenance recommendations and regional association documents if referenced or practically relevant",
        "Schweizer Obligationenrecht Werkvertragsrisiken: VergÃ¼tung, Kostenvoranschlag/Festpreis, NachtrÃ¤ge, Abnahme, PrÃ¼fung, MÃ¤ngelrÃ¼ge, GewÃ¤hrleistung, VerjÃ¤hrung, KÃ¼ndigung, Verzug und Beweislast",
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
        "Brief contractor-side conclusion",
        "Source matrix: contract clause / legal source / SIA source / JardinSuisse or industry source / relevance / uncertainty",
        "Risk register table: risk / source / severity / probability / cost impact / schedule impact / evidence required / countermeasure",
        "Top 5 negotiation positions for the contractor",
        "Clause-by-clause review with notable wording and priority",
        "Concrete amendment wording to protect the contractor",
        "Open questions for the client, planner or construction manager",
        "Recommended appendices, SIA records, JardinSuisse references, evidence, reports, photos and checks before signing",
      ],
      emphasis:
        "Pay particular attention to clear scope boundaries, variation triggers, daywork and extra costs, interfaces with other contractors, unforeseen soil or utility conditions, weather and seasonal risks, plant quality, maintenance, establishment success, acceptance, defect notices and evidence preservation under Swiss practice.",
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
  const supported = ["de", "en"];
  const normalized = preferred.map((language) => language.toLowerCase().split("-")[0]);

  if (normalized.includes("de")) {
    return "de";
  }

  for (const base of normalized) {
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

function setTabText(tabName, text) {
  const button = document.querySelector(`[data-tab="${tabName}"]`);
  if (button) {
    button.textContent = text;
  }
}

function applyTranslations() {
  document.documentElement.lang = i18n.htmlLang;
  document.title = i18n.title;
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", i18n.meta);

  document.querySelector(".panel-header .eyebrow").textContent = i18n.ui.eyebrow;
  const headline = document.querySelector(".panel-header h1");
  if (headline) {
    headline.textContent = i18n.ui.headline;
  }
  document.querySelector(".panel-header p:last-child").textContent = i18n.ui.intro;
  document.querySelector(".workspace")?.setAttribute("aria-label", i18n.ui.workspaceLabel);
  document.querySelector(".tabs")?.setAttribute("aria-label", i18n.ui.tabsLabel);
  document.querySelector(".tab-list")?.setAttribute("aria-label", i18n.ui.tabListLabel);

  setLabelForControl(fields.projectName, i18n.ui.project);
  fields.projectName.placeholder = i18n.ui.projectPlaceholder;
  fields.role.value = "unternehmer";

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
  setButtonText(synthesizeButton, i18n.ui.synthesize || "Create synthesis");
  Object.entries(i18n.ui.tabs || translations.en.ui.tabs).forEach(([tabName, label]) => {
    setTabText(tabName, label);
  });
  document.querySelector(".analysis-header .eyebrow").textContent = i18n.ui.aiAnalysis;
  setButtonText(exportPdfButton, i18n.ui.savePdf);
  analysisOutput.placeholder = i18n.ui.analysisPlaceholder;
  synthesisOutput.placeholder =
    i18n.ui.synthesisPlaceholder || translations.en.ui.synthesisPlaceholder;
}

function selectedWorkTypes() {
  return [...document.querySelectorAll("#workTypes input:checked")].map((input) => {
    const key = input.dataset.workKey;
    return i18n.workTypes[key] || input.value;
  });
}

function roleText() {
  return i18n.prompt.roles.unternehmer;
}

function checkedLine(condition, text) {
  return condition ? `- ${text}\n` : "";
}

function currentContext() {
  return {
    project: fields.projectName.value.trim(),
    risks: fields.specialRisks.value.trim(),
    contract: fields.contractText.value.trim(),
    works: selectedWorkTypes(),
    usesSia118: fields.sia118.checked,
    usesStandards: fields.siaGaLa.checked,
    checksPlantGuarantee: fields.anwuchs.checked,
    checksSiaRecords: fields.neighbors.checked,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cockpitText() {
  return i18n.cockpit || translations.en.cockpit;
}

function buildRiskItems() {
  const context = currentContext();
  const text = cockpitText();
  const riskItems = text.riskItems;
  const items = [
    {
      level: text.high,
      ...riskItems.or,
    },
    {
      level: text.high,
      ...riskItems.payment,
    },
    {
      level: text.high,
      ...riskItems.variations,
    },
    {
      level: text.high,
      ...riskItems.cooperation,
    },
    {
      level: text.medium,
      ...riskItems.scope,
    },
    {
      level: text.medium,
      ...riskItems.jardin,
    },
    {
      level: text.medium,
      ...riskItems.sia,
    },
    {
      level: text.medium,
      ...riskItems.acceptance,
    },
    {
      level: text.medium,
      ...riskItems.liability,
    },
  ];

  if (context.works.includes(i18n.workTypes.planting) || context.works.includes(i18n.workTypes.lawn)) {
    items.push({
      level: text.medium,
      ...riskItems.plant,
    });
  }

  if (context.risks) {
    items.unshift({
      level: text.high,
      title: riskItems.special.title,
      detail: context.risks,
      action: riskItems.special.action,
    });
  }

  return items;
}

function buildClauseItems() {
  if (currentLanguage === "de") {
    return [
      {
        area: "OR-Werkvertragsrisiken",
        review: "Regelt der Vertrag Vergütung, Festpreis/Kostenvoranschlag, Abnahme, Prüfung, Mängelrüge, Gewährleistung, Verjährung, Kündigung, Verzug und Beweislast?",
        contractorPosition: "Keine stillen Lücken nach OR-Defaultregeln akzeptieren, wenn unternehmerfreundliche Präzisierungen nötig sind.",
      },
      {
        area: "Leistungsumfang und Ausschlüsse",
        review: "Sind Arbeiten, Ausschlüsse, Annahmen, Schnittstellen und Rangordnung der Unterlagen klar?",
        contractorPosition: "Offene Verpflichtungen und undefinierte Schnittstellen vermeiden.",
      },
      {
        area: "Zahlungsbedingungen",
        review: "Sind Akonti, Fälligkeiten, Rückbehalte, Verzugszins und MWST praktikabel geregelt?",
        contractorPosition: "Planbaren Cashflow sichern und Auftraggeber-kontrollierte Zahlungsauslöser vermeiden.",
      },
      {
        area: "Nachträge / Regie",
        review: "Sind Zusatzarbeiten, Mengenänderungen und unvorhergesehene Verhältnisse vergütbar?",
        contractorPosition: "Schriftliche Weisungen, Preisregeln und Nachweisführung verlangen.",
      },
      {
        area: "SIA-Nachweise",
        review: "Sind Protokolle, Rapporte, Ausmasse, Regierapporte, Abnahmen und Mängellisten definiert?",
        contractorPosition: "Nachweise als Vertragsworkflow festlegen und Beweise für Zahlung, Verzögerung und Mängel sichern.",
      },
      {
        area: "JardinSuisse / Branchenpraxis",
        review: "Sind JardinSuisse-Merkblätter, Qualitätscharta, Pflegegrundsätze oder regionale Empfehlungen referenziert?",
        contractorPosition: "Als Qualitäts-/Praxisstütze nutzen, aber unbeabsichtigte verbindliche Pflichten ohne Preis vermeiden.",
      },
      {
        area: "Mitwirkung Auftraggeber",
        review: "Sind Zugang, Bewilligungen, Pläne, Wasser, Strom, Entscheide und Schnittstellen zu Dritten zugewiesen?",
        contractorPosition: "Termin- und Kostenfolgen bei verspäteter Mitwirkung ausdrücklich regeln.",
      },
      {
        area: "Termine und Witterung",
        review: "Verlängern Wetter, Pflanzfenster und verspätete Baustellenbereitschaft die Fristen?",
        contractorPosition: "Vor Konventionalstrafen für Umstände ausserhalb der Kontrolle schützen.",
      },
      {
        area: "Abnahme / Mängel",
        review: "Sind Teilabnahme, Mängelrügefristen und Beginn der Gewährleistung definiert?",
        contractorPosition: "Praktische Abnahmeprotokolle und kurze schriftliche Mängelprozesse verwenden.",
      },
      {
        area: "Haftung / Versicherung",
        review: "Sind Leitungsschäden, bestehende Anlagen, Nachbargrundstücke und Folgeschäden geregelt?",
        contractorPosition: "Haftung begrenzen und Ausschlüsse für versteckte oder auftraggeberverursachte Risiken sichern.",
      },
    ];
  }

  return [
    {
      area: "OR work-contract risks",
      review: "Does the contract handle remuneration, fixed price/estimate, acceptance, inspection, defect notices, warranty remedies, limitation periods, termination, delay and proof?",
      contractorPosition: "Avoid silent gaps under Swiss Code of Obligations default rules where specific contractor-friendly wording is needed.",
    },
    {
      area: "Scope and exclusions",
      review: "Are works, exclusions, assumptions, interfaces and document precedence clear?",
      contractorPosition: "Avoid open-ended obligations and undefined interfaces.",
    },
    {
      area: "Payment terms",
      review: "Are instalments, due dates, retention, default interest and VAT treatment workable?",
      contractorPosition: "Secure predictable cash flow and avoid client-controlled payment triggers.",
    },
    {
      area: "Variations / daywork",
      review: "Can additional work, changed quantities and unforeseen conditions be charged?",
      contractorPosition: "Require written instructions, pricing rules and evidence records.",
    },
    {
      area: "SIA records / evidence",
      review: "Are SIA-related protocols, site reports, measurements, daywork reports, acceptance records and defect lists defined?",
      contractorPosition: "Make the required records part of the contract workflow and preserve proof for payment, delay and defect issues.",
    },
    {
      area: "JardinSuisse / industry practice",
      review: "Are JardinSuisse leaflets, quality charters, maintenance principles or regional guidance referenced?",
      contractorPosition: "Use them as quality/practice support, but avoid unintended binding duties unless they are priced and contractually accepted.",
    },
    {
      area: "Client cooperation",
      review: "Are access, permits, plans, water, power, decisions and third-party interfaces assigned?",
      contractorPosition: "Make delay and cost consequences explicit when client duties are late.",
    },
    {
      area: "Schedule and weather",
      review: "Do weather, seasonal planting windows and shifted site readiness extend deadlines?",
      contractorPosition: "Protect against penalties for conditions outside contractor control.",
    },
    {
      area: "Acceptance / defects",
      review: "Are partial acceptance, defect notice deadlines and warranty start dates defined?",
      contractorPosition: "Use practical acceptance records and short, clear response routes.",
    },
    {
      area: "Liability / insurance",
      review: "Are utility strikes, existing assets, neighbouring property and consequential losses handled?",
      contractorPosition: "Cap exposure and preserve exclusions for hidden or client-caused risks.",
    },
  ];
}

function buildQuestionItems() {
  const context = currentContext();
  const questions = currentLanguage === "de" ? [
    "Ist SIA 118 ausdrücklich vereinbart, nur erwähnt oder nicht Vertragsbestandteil?",
    "Welche OR-Werkvertragsrisiken sind nicht klar geregelt: Vergütung, Festpreis/Kostenvoranschlag, Abnahme, Mängel, Verjährung, Kündigung oder Beweislast?",
    "Ändert oder verdrängt der Vertrag OR-Defaultregeln, und ist das für den Unternehmer akzeptabel?",
    "Sind alle Ausschlüsse und Leistungen des Auftraggebers klar aufgeführt?",
    "Verlangt der Vertrag schriftliche Freigaben, bevor Nachträge, Regie oder Mehrkosten vergütet werden?",
    "Welche SIA-Protokolle, Rapporte, Ausmasse, Regierapporte und Abnahmeprotokolle müssen verwendet werden?",
    "Sind fehlende SIA-Nachweise oder referenzierte Formulare als anzufordernde Unterlagen aufgeführt?",
    "Sind JardinSuisse-Empfehlungen, Merkblätter, Qualitätscharta oder regionale Dokumente im Vertrag referenziert?",
    "Falls JardinSuisse-Unterlagen referenziert sind: verbindlich, nur Orientierung oder zu bepreisender Ausführungsstandard?",
    "Wer trägt das Risiko für unvorhergesehenen Boden, Fels, Altlasten, alte Leitungen oder Drainageverhältnisse?",
    "Sind Baustellenzugang, Lagerflächen, Wasser, Strom und Planfreigaben Pflichten des Auftraggebers?",
    "Was passiert bei Witterung, Pflanzfenstern oder verspäteten Entscheiden des Auftraggebers?",
    "Sind Fälligkeiten, Akonti, Rückbehalte und Verzugsfolgen klar genug?",
    "Sind Teilabnahme, Schlussabnahme und Mängelrügeverfahren für den Unternehmer praktikabel?",
    "Sind Anwuchs-, Pflege- und Ersatzpflichten auf vom Unternehmer kontrollierbare Umstände begrenzt?",
    "Sind Haftungsgrenzen, Versicherungen und Ausschlüsse für Folgeschäden akzeptabel?",
  ] : [
    "Is SIA 118 expressly agreed, only referenced, or not part of the contract?",
    "Which Swiss Code of Obligations work-contract risks are not clearly regulated: remuneration, fixed price/estimate, acceptance, defects, limitation periods, termination or proof?",
    "Does the contract change or override default OR work-contract rules, and is that change acceptable for the contractor?",
    "Are all contractor exclusions and client-provided services clearly listed?",
    "Does the contract require written approval before variations, daywork or extra costs are payable?",
    "Which SIA records, site reports, measurement sheets, daywork reports and acceptance protocols must be used?",
    "Are missing SIA records or SIA-referenced forms listed as documents to request before signing?",
    "Are JardinSuisse recommendations, technical leaflets, quality charters or regional documents referenced in the contract?",
    "If JardinSuisse material is referenced, is it binding, only guidance, or an execution standard that must be priced?",
    "Who bears risk for unforeseen soil, rock, contamination, old utilities or drainage conditions?",
    "Are site access, storage areas, water, power and plan approvals duties of the client?",
    "What happens if weather, seasonal planting windows or delayed client decisions shift the programme?",
    "Are payment due dates, instalments, retention and default consequences clear enough?",
    "Are partial acceptance, final acceptance and defect notice procedures workable for the contractor?",
    "Are plant establishment, maintenance and replacement duties limited to what the contractor controls?",
    "Are liability caps, insurance duties and exclusions for consequential loss acceptable?",
  ];

  if (context.risks) {
    questions.push(
      currentLanguage === "de"
        ? `Ändern die besonderen Hinweise Preis, Termine, Ausschlüsse oder Nachweisbedarf: ${context.risks}`
        : `Do the special notes change pricing, schedule, exclusions or evidence requirements: ${context.risks}`,
    );
  }

  return questions;
}

function renderOverview() {
  const context = currentContext();
  const text = cockpitText();
  const risks = buildRiskItems();
  const clauses = buildClauseItems();
  const questions = buildQuestionItems();
  const contractStatus = context.contract
    ? `${context.contract.length.toLocaleString(i18n.htmlLang)} ${i18n.status.chars}`
    : text.noContractText;
  const works = context.works.length ? context.works.join(", ") : text.noWorkTypes;

  overviewOutput.dataset.copyText = `${text.cockpitTitle}
${text.project}: ${context.project || i18n.report.defaultProject}
${text.works}: ${works}
${text.contractText}: ${contractStatus}
${text.riskAreas}: ${risks.length}
${text.clauseChecks}: ${clauses.length}
${text.openQuestions}: ${questions.length}`;

  overviewOutput.innerHTML = `
    <div class="cockpit-summary">
      <article class="metric-card">
        <span>${escapeHtml(text.contractText)}</span>
        <strong>${escapeHtml(contractStatus)}</strong>
      </article>
      <article class="metric-card">
        <span>${escapeHtml(text.riskAreas)}</span>
        <strong>${risks.length}</strong>
      </article>
      <article class="metric-card">
        <span>${escapeHtml(text.clauseChecks)}</span>
        <strong>${clauses.length}</strong>
      </article>
      <article class="metric-card">
        <span>${escapeHtml(text.openQuestions)}</span>
        <strong>${questions.length}</strong>
      </article>
    </div>
    <section class="cockpit-band">
      <div>
        <p class="eyebrow">${escapeHtml(text.project)}</p>
        <h3>${escapeHtml(context.project || i18n.report.defaultProject)}</h3>
        <p>${escapeHtml(works)}</p>
      </div>
      <div class="review-status">
        <span class="status-pill">${escapeHtml(text.contractorFocus)}</span>
        <span class="status-pill">${escapeHtml(context.usesSia118 ? text.siaChecked : text.siaOff)}</span>
        <span class="status-pill">${escapeHtml(context.checksPlantGuarantee ? text.plantChecked : text.plantOff)}</span>
      </div>
    </section>
    <div class="priority-grid">
      ${risks.slice(0, 3).map((risk) => `
        <article class="risk-card priority-${risk.level.toLowerCase()}">
          <span>${escapeHtml(risk.level)}</span>
          <h3>${escapeHtml(risk.title)}</h3>
          <p>${escapeHtml(risk.action)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderRiskCards() {
  const risks = buildRiskItems();
  riskOutput.dataset.copyText = buildRiskSummary();
  riskOutput.innerHTML = risks.map((risk) => `
    <article class="risk-card priority-${risk.level.toLowerCase()}">
      <span>${escapeHtml(risk.level)}</span>
      <h3>${escapeHtml(risk.title)}</h3>
      <p>${escapeHtml(risk.detail)}</p>
      <strong>${escapeHtml(risk.action)}</strong>
    </article>
  `).join("");
}

function renderClauseReview() {
  const text = cockpitText();
  const clauses = buildClauseItems();
  clauseOutput.dataset.copyText = `${text.clauseReviewTitle}

${clauses.map((clause, index) => `${index + 1}. ${clause.area}
${currentLanguage === "de" ? "Prüfung" : "Review"}: ${clause.review}
${currentLanguage === "de" ? "Unternehmerposition" : "Contractor position"}: ${clause.contractorPosition}`).join("\n\n")}`;
  clauseOutput.innerHTML = clauses.map((clause, index) => `
    <article class="clause-row">
      <span>${index + 1}</span>
      <div>
        <h3>${escapeHtml(clause.area)}</h3>
        <p>${escapeHtml(clause.review)}</p>
        <strong>${escapeHtml(clause.contractorPosition)}</strong>
      </div>
    </article>
  `).join("");
}

function renderQuestions() {
  const questions = buildQuestionItems();
  questionOutput.dataset.copyText = buildQuestionList();
  questionOutput.innerHTML = `
    <ol class="question-list">
      ${questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
    </ol>
  `;
}

function buildRiskSummary() {
  const context = currentContext();
  const text = cockpitText();
  const works = context.works.length ? context.works.join(", ") : text.noWorkTypes;
  const specialRisks = context.risks || text.noSpecialRisks;
  const risks = buildRiskItems();

  return `${text.riskDashboardTitle}

${text.project}
- ${context.project || i18n.report.defaultProject}

${text.relevantWorks}
- ${works}

${text.highestRisks}
${risks.map((risk, index) => `${index + 1}. ${risk.title}: ${risk.detail}`).join("\n")}

${text.specialNotes}
- ${specialRisks}`;
}

function buildQuestionList() {
  const text = cockpitText();
  const questions = buildQuestionItems();

  return `${text.followUpTitle}

${text.followUpIntro}

${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}`;
}

function buildReportDraft() {
  const context = currentContext();
  const text = cockpitText();
  const works = context.works.length ? context.works.join(", ") : text.toBeConfirmed;

  if (currentLanguage === "de") {
    return `${text.reportTitle}

${text.project}
${context.project || i18n.report.defaultProject}

${text.works}
${works}

${text.contractorConclusion}
${text.reportConclusion}

${text.negotiationPriorities}
- OR-Werkvertragsrisiken klären: Vergütungsbasis, Festpreis oder Kostenvoranschlag, Abnahme, Prüfung, Mängelrügen, Gewährleistung, Verjährung, Kündigung und Beweislast.
- Klare Regelung für schriftliche Nachträge, Regie, Mehrmengen und unvorhergesehene Verhältnisse ergänzen.
- Termine an rechtzeitige Mitwirkung, Freigaben, Zugang und geeignete Wetter-/Baustellenbedingungen knüpfen.
- Abnahme, Teilabnahme und Mängelprozesse mit praktikablen Nachweisen definieren.
- Anwuchs- und Pflegepflichten auf vom Unternehmer kontrollierbare Umstände begrenzen.
- Haftung, Versicherung, Folgeschäden, bestehende Leitungen und Nachbargrundstücke klären.

${text.evidenceChecklist}
- Unterzeichnete Pläne, Leistungsverzeichnis, Ausschlüsse und Rangordnung der Unterlagen.
- Fotodokumentation von Bestand, Leitungen, Zugangsbeschränkungen und Grenzen.
- Schriftliche Freigaben für Nachträge, Regie, Substitutionen und Terminänderungen.
- SIA-Protokolle, Bausitzungsprotokolle, Baujournale, Ausmasse, Regierapporte und Nachträge.
- Relevante JardinSuisse-Merkblätter, Qualitätscharta, Pflegehinweise oder regionale Dokumente, falls referenziert.
- Lieferscheine, Pflanzenqualitätsnachweise, Pflegeanweisungen und Übergabeprotokoll.
- Abnahmeprotokoll, Mängelliste, Terminaufzeichnungen und Korrespondenz.

${text.specialNotes}
${context.risks || text.noSpecialRisks}`;
  }

  return `${text.reportTitle}

${text.project}
${context.project || i18n.report.defaultProject}

${text.works}
${works}

${text.contractorConclusion}
${text.reportConclusion}

${text.negotiationPriorities}
- Clarify Swiss Code of Obligations work-contract risks: remuneration basis, fixed price or estimate, acceptance, inspection, defect notices, warranty remedies, limitation periods, termination and burden of proof.
- Add clear wording for written change orders, daywork, extra quantities and unforeseen conditions.
- Tie schedule duties to timely client cooperation, approvals, access and suitable weather/site conditions.
- Define acceptance, partial acceptance and defect notice procedures with practical documentation requirements.
- Limit plant establishment and maintenance obligations to contractor-controlled conditions.
- Clarify liability, insurance, consequential loss, existing utilities and neighbouring property risks.

${text.evidenceChecklist}
- Signed plans, bill of quantities, exclusions and order of precedence.
- Photo documentation of existing site, utilities, access constraints and neighbouring boundaries.
- Written approvals for variations, daywork, substitutions and schedule changes.
- SIA-related records, site meeting minutes, construction journals, measurement records, daywork reports and change-order records.
- Relevant JardinSuisse leaflets, quality charters, maintenance guidance or regional association documents if referenced.
- Delivery notes, plant quality records, maintenance instructions and handover protocol.
- Acceptance protocol, defect list, deadline records and client correspondence.

${text.specialNotes}
${context.risks || text.noSpecialRisks}`;
}

function buildPrompt() {
  const { project, risks, contract, works } = currentContext();
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
  const sourceTitle = prompt.sourceTitle || "Source and evidence rules:";
  const sourceInstructions = prompt.sourceInstructions || [
    "Use the contract text and appendices as the primary source. Cite contract sections, headings or short excerpts where available.",
    "Base legal statements on Swiss law, especially the Swiss Code of Obligations (CO/OR) Art. 363 et seq. for contracts for work and services and Art. 367-371 for inspection, defect notices and limitation periods where relevant.",
    "For Swiss Code of Obligations work-contract risks, check in particular: formation and scope of the work contract, contractor duties, remuneration, fixed price versus estimate, client acceptance, inspection duties, defect notices, warranty remedies, limitation periods, termination, impossibility, delay and burden of proof.",
    "Preferred legal source name: Swiss Code of Obligations, SR 220, Fedlex: https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en",
    "Preferred standard source name where applicable: SIA 118 General Conditions for Construction Work, official SIA shop/platform. Do not quote paid SIA text unless it is provided in the contract.",
    "Check relevant JardinSuisse materials where applicable, especially technical leaflets, industry guidance, maintenance principles, quality charters or regional JardinSuisse documents. Treat them as industry practice/guidance unless the contract makes them binding.",
    "Use SIA 118 and other SIA standards only if they are contractually agreed, expressly referenced or clearly relevant as a standard to be checked. State that basis.",
    "Check SIA-related records and project documents where available: acceptance records, site meeting minutes, construction journals, measurement records, daywork reports, change-order records, defect lists, handover protocols, plans, specifications and order-of-precedence clauses.",
    "If SIA records or SIA-referenced forms are missing, identify which records should be requested before signing or before starting work.",
    "If the source or contractual basis is missing or cannot be verified, write 'source/contractual basis to be verified' instead of making a certain claim.",
  ];
  const riskTitle = prompt.riskTitle || "Risk method:";
  const riskInstructions = prompt.riskInstructions || [
    "Assess every risk from the contractor's perspective with severity, probability, financial impact, schedule impact and evidence required.",
    "For every risk, name the affected contract clause or write 'no clear contract clause found'.",
    "Explain why the risk matters to the contractor: payment, variation, margin, liability, schedule, acceptance, warranty or burden of proof.",
    "Give concrete countermeasures: clause wording, question, appendix, reservation, photo/report evidence or approval workflow.",
  ];
  const sources = sourceInstructions.map((item) => `- ${item}`).join("\n");
  const risksMethod = riskInstructions.map((item) => `- ${item}`).join("\n");

  return `${prompt.intro}

${roleText(fields.role.value)}

${context ? `${context}\n` : ""}${prompt.legal}

${sourceTitle}
${sources}

${riskTitle}
${risksMethod}

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
  renderOverview();
  renderRiskCards();
  renderClauseReview();
  renderQuestions();
  reportOutput.value = buildReportDraft();
  charCount.textContent = `${output.value.length.toLocaleString(i18n.htmlLang)} ${i18n.status.chars}`;
}

function updateExportAvailability() {
  exportPdfButton.disabled =
    !analysisOutput.value.trim() && !synthesisOutput.value.trim();
  synthesizeButton.disabled = !analysisOutput.value.trim();
}

async function copyPrompt() {
  const activePanel = document.querySelector(".tab-panel.is-active");
  const activeText =
    activePanel?.querySelector("textarea")?.value ||
    activePanel?.dataset.copyText ||
    activePanel?.querySelector("[data-copy-text]")?.dataset.copyText;
  await navigator.clipboard.writeText(activeText || output.value);
  copyStatus.textContent = i18n.status.copied;
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
}

function activateTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === `panel-${tabName}`;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function buildSynthesisPrompt() {
  const context = currentContext();
  const text = cockpitText();
  const works = context.works.length ? context.works.join(", ") : text.toBeConfirmed;

  if (currentLanguage === "de") {
    return `Erstelle eine Executive Synthese aus der Detailanalyse unten.

Wiederhole nicht die ganze Analyse. Verdichte sie zu einem entscheidungsreifen Memo für einen Schweizer Gartenbau-/Landschaftsbauunternehmer.

Sprachregel:
- Antworte ausschliesslich auf Deutsch.

Syntheseregeln:
- Nutze nur Detailanalyse, Vertragstext, Cockpit-Risiken und aufgeführte Quellen als Input.
- Behalte die Quellenlogik bei: Vertragsklauseln, Schweizer Obligationenrecht / OR-Werkvertragsrisiken, SIA-Nachweise, JardinSuisse oder "Quelle/Vertragsgrundlage zu prüfen".
- Trenne rechtliche Vertragsrisiken, technische Ausführungsrisiken und kommerzielle Verhandlungsrisiken.
- Fokussiere auf Unternehmerexposition: Zahlung, Nachträge, Marge, Verzug, Abnahme, Gewährleistung, Mängelrüge, Haftung, Beweis und fehlende Unterlagen.
- Wenn die Detailanalyse unsicher ist, übernimm die Unsicherheit statt eine Schlussfolgerung zu erfinden.

Erforderliche Ausgabe:
1. Entscheidung: Unterzeichnen / Nur mit Änderungen unterzeichnen / Noch nicht unterzeichnen.
2. Executive Fazit in einem Absatz.
3. Top 5 Deal Breaker für den Unternehmer, jeweils mit Quelle und Gegenmassnahme.
4. Verhandlungstext: kurze Formulierung, die der Unternehmer an Auftraggeber/Planer senden kann.
5. Fehlende Unterlagen und Nachweise: SIA-Nachweise, JardinSuisse-Referenzen, Pläne, Ausmasse, Regierapporte, Abnahmeformulare und Mängellisten.
6. Finale Änderungsvorschläge für die wichtigsten Klauseln.
7. Was eine Schweizer juristische oder technische Fachperson prüfen sollte.

Projekt: ${context.project || i18n.report.defaultProject}
Arbeiten: ${works}
Besondere Hinweise: ${context.risks || text.noSpecialRisks}

Cockpit-Risikozusammenfassung:
${buildRiskSummary()}

Klauselprüfung:
${buildClauseItems().map((item, index) => `${index + 1}. ${item.area}: ${item.review} Unternehmerposition: ${item.contractorPosition}`).join("\n")}

Follow-up-Fragen:
${buildQuestionItems().map((item, index) => `${index + 1}. ${item}`).join("\n")}

Berichtsentwurf:
${buildReportDraft()}

Detailanalyse:
${analysisOutput.value.trim()}`;
  }

  return `Create a contractor-side executive synthesis from the detailed analysis below.

Do not repeat the full analysis. Compress it into a decision memo for a Swiss garden construction / landscaping contractor.

Language rule:
- Answer only in English.

Synthesis rules:
- Use only the detailed analysis, contract text, cockpit risks and listed sources as input.
- Preserve source discipline: cite contract clauses, Swiss Code of Obligations / OR work-contract risks, SIA records, JardinSuisse guidance or write "source/contractual basis to be verified".
- Separate legal contract risks from technical execution risks and commercial negotiation risks.
- Focus on contractor exposure: payment, variations, margin, delay, acceptance, warranty, defect notice, liability, proof and missing records.
- If the detailed analysis is uncertain, keep that uncertainty instead of inventing a conclusion.
- Output in the same language as the detailed analysis where possible.

Required output:
1. Decision: Sign / Sign only with changes / Do not sign yet.
2. One-paragraph executive conclusion.
3. Top 5 deal breakers for the contractor, each with source and countermeasure.
4. Negotiation script: concise wording the contractor can send to the client/planner.
5. Missing documents and records: SIA records, JardinSuisse references, plans, measurements, daywork reports, acceptance forms and defect lists.
6. Final amendment wording for the highest-priority clauses.
7. What to ask a Swiss legal or technical specialist to verify.

Project: ${context.project || i18n.report.defaultProject}
Works: ${works}
Special notes: ${context.risks || text.noSpecialRisks}

Cockpit risk summary:
${buildRiskSummary()}

Clause review:
${buildClauseItems().map((item, index) => `${index + 1}. ${item.area}: ${item.review} Contractor position: ${item.contractorPosition}`).join("\n")}

Follow-up questions:
${buildQuestionItems().map((item, index) => `${index + 1}. ${item}`).join("\n")}

Report draft:
${buildReportDraft()}

Detailed AI analysis:
${analysisOutput.value.trim()}`;
}

async function runAnalysis() {
  analyzeButton.disabled = true;
  synthesizeButton.disabled = true;
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
    synthesisOutput.value = "";
    analysisStatus.textContent = i18n.status.done;
    updateExportAvailability();
  } catch (error) {
    analysisOutput.value = error.message;
    analysisStatus.textContent = i18n.status.error;
  } finally {
    analyzeButton.disabled = false;
  }
}

async function runSynthesis() {
  const analysis = analysisOutput.value.trim();

  if (!analysis) {
    analysisStatus.textContent =
      currentLanguage === "de"
        ? "Bitte zuerst Detailanalyse starten."
        : "Please run the detailed analysis first.";
    return;
  }

  synthesizeButton.disabled = true;
  analysisStatus.textContent =
    currentLanguage === "de" ? "Synthese läuft..." : "Synthesis running...";
  synthesisOutput.value = "";
  activateTab("synthesis");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: buildSynthesisPrompt(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || i18n.status.analysisFailed);
    }

    synthesisOutput.value = data.analysis || i18n.status.noAnalysisReceived;
    analysisStatus.textContent =
      currentLanguage === "de" ? "Synthese fertig" : "Synthesis done";
  } catch (error) {
    synthesisOutput.value = error.message;
    analysisStatus.textContent = i18n.status.error;
  } finally {
    updateExportAvailability();
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

function cleanMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\r\n/g, "\n")
    .trim();
}

function writePdfLine(doc, text, options) {
  let cursor = options.y;
  const lines = doc.splitTextToSize(text || " ", options.maxWidth);

  lines.forEach((line) => {
    cursor = ensurePageSpace(doc, cursor, options.lineHeight);
    doc.text(line, options.x, cursor);
    cursor += options.lineHeight;
  });

  return cursor;
}

function writeWrappedText(doc, text, options) {
  const maxWidth = options.maxWidth;
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

function writeMarkdownReport(doc, text, options) {
  let cursor = options.y;
  const left = options.x;
  const maxWidth = options.maxWidth;
  const lines = cleanMarkdown(text).split("\n");

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const nextLine = lines[index + 1]?.trim() || "";

    if (!line) {
      cursor += 2.5;
      return;
    }

    if (/^\|?[-:\s|]+\|?$/.test(line)) {
      return;
    }

    if (line.includes("|") && nextLine.includes("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);

      if (cells.length > 1) {
        cursor = ensurePageSpace(doc, cursor, 10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(47, 107, 79);
        cursor = writePdfLine(doc, cells.join(" / "), {
          x: left,
          y: cursor,
          maxWidth,
          lineHeight: 4.8,
        });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(31, 43, 37);
        return;
      }
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    const numberedHeadingMatch = line.match(/^(\d+\.)\s+(.+)$/);

    if (headingMatch || numberedHeadingMatch) {
      const title = headingMatch ? headingMatch[2] : line;
      cursor = ensurePageSpace(doc, cursor + 3, 14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(headingMatch?.[1].length === 1 ? 13 : 11.5);
      doc.setTextColor(36, 48, 42);
      cursor = writePdfLine(doc, title, {
        x: left,
        y: cursor,
        maxWidth,
        lineHeight: 5.8,
      });
      cursor += 2;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.6);
      doc.setTextColor(31, 43, 37);
      return;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      cursor = ensurePageSpace(doc, cursor, 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.6);
      doc.setTextColor(31, 43, 37);
      doc.text("•", left, cursor);
      cursor = writePdfLine(doc, bulletMatch[1], {
        x: left + 5,
        y: cursor,
        maxWidth: maxWidth - 5,
        lineHeight: 5.2,
      });
      cursor += 1;
      return;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.6);
    doc.setTextColor(31, 43, 37);
    cursor = writePdfLine(doc, line, {
      x: left,
      y: cursor,
      maxWidth,
      lineHeight: 5.2,
    });
    cursor += 1.5;
  });

  return cursor;
}

function exportContent() {
  const activePanel = document.querySelector(".tab-panel.is-active");

  if (activePanel?.id === "panel-synthesis" && synthesisOutput.value.trim()) {
    return {
      fileSuffix: currentLanguage === "de" ? "synthese" : "synthesis",
      label: currentLanguage === "de" ? "Synthese" : "Synthesis",
      text: synthesisOutput.value.trim(),
    };
  }

  if (activePanel?.id === "panel-report" && reportOutput.value.trim()) {
    return {
      fileSuffix: currentLanguage === "de" ? "bericht" : "report",
      label: i18n.report.analysis,
      text: reportOutput.value.trim(),
    };
  }

  if (synthesisOutput.value.trim() && !analysisOutput.value.trim()) {
    return {
      fileSuffix: currentLanguage === "de" ? "synthese" : "synthesis",
      label: currentLanguage === "de" ? "Synthese" : "Synthesis",
      text: synthesisOutput.value.trim(),
    };
  }

  return {
    fileSuffix: currentLanguage === "de" ? "analyse" : "analysis",
    label: i18n.report.analysis,
    text: analysisOutput.value.trim(),
  };
}

function exportAnalysisPdf() {
  const exportData = exportContent();
  const analysis = exportData.text;

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
  const fileDate = new Date().toISOString().slice(0, 10);
  const works = selectedWorkTypes();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  doc.setFillColor(28, 78, 52);
  doc.rect(0, 0, pageWidth, 34, "F");
  doc.setFillColor(226, 241, 233);
  doc.rect(0, 34, pageWidth, 2.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(i18n.report.title, margin, 14, { maxWidth: contentWidth });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(i18n.report.subtitle, margin, 24, { maxWidth: contentWidth });

  y = 48;
  doc.setTextColor(36, 48, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  y = writePdfLine(doc, projectName, {
    x: margin,
    y,
    maxWidth: contentWidth,
    lineHeight: 6,
  });

  y += 4;
  const metaTop = y;
  doc.setFillColor(248, 250, 247);
  doc.roundedRect(margin, metaTop, contentWidth, 28, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(102, 115, 108);
  doc.text(`${i18n.report.created}: ${date}`, margin + 4, y + 7);
  doc.text(`${i18n.report.focus}: ${i18n.ui.roles.unternehmer}`, margin + 4, y + 14);

  if (works.length) {
    y = writePdfLine(doc, `${i18n.report.works}: ${works.join(", ")}`, {
      x: margin + 4,
      y: y + 21,
      maxWidth: contentWidth - 8,
      lineHeight: 4.6,
    });
  } else {
    y += 28;
  }
  y = Math.max(y, metaTop + 32);

  const risks = fields.specialRisks.value.trim();
  if (risks) {
    y = ensurePageSpace(doc, y + 8, 22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 48, 42);
    doc.setFontSize(10.5);
    doc.text(i18n.report.notes, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(52, 61, 56);
    y = writeWrappedText(doc, risks, {
      x: margin,
      y,
      maxWidth: contentWidth,
      lineHeight: 5.2,
      paragraphGap: 2,
    });
  }

  y = ensurePageSpace(doc, y + 6, 18);
  doc.setFillColor(248, 250, 247);
  doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(47, 107, 79);
  doc.text(exportData.label, margin + 4, y + 8);

  y += 18;
  y = writeMarkdownReport(doc, analysis, {
    x: margin,
    y,
    maxWidth: contentWidth,
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    addFooter(doc, page, totalPages);
  }

  doc.save(`${safeFileName(projectName)}-${exportData.fileSuffix}-${fileDate}.pdf`);
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
synthesizeButton.addEventListener("click", runSynthesis);
exportPdfButton.addEventListener("click", exportAnalysisPdf);
analysisOutput.addEventListener("input", updateExportAvailability);
synthesisOutput.addEventListener("input", updateExportAvailability);
fields.pdfFile.addEventListener("change", handlePdfUpload);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});
updateExportAvailability();
renderPrompt();
