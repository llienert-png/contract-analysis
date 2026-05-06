const form = document.querySelector("#promptForm");
const output = document.querySelector("#promptOutput");
const analysisOutput = document.querySelector("#analysisOutput");
const copyButton = document.querySelector("#copyButton");
const analyzeButton = document.querySelector("#analyzeButton");
const copyStatus = document.querySelector("#copyStatus");
const analysisStatus = document.querySelector("#analysisStatus");
const charCount = document.querySelector("#charCount");
const pdfStatus = document.querySelector("#pdfStatus");

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

function selectedWorkTypes() {
  return [...document.querySelectorAll("#workTypes input:checked")].map(
    (input) => input.value,
  );
}

function roleText(role) {
  if (role === "auftraggeber") {
    return "Lege besonderes Gewicht auf Risiken, Kostenfolgen und Schutzmechanismen fuer den Auftraggeber.";
  }

  if (role === "unternehmer") {
    return "Lege besonderes Gewicht auf Zahlungsanspruch, Nachtragsfaehigkeit, Mitwirkungspflichten und Haftungsbegrenzung fuer den Unternehmer.";
  }

  return "Analysiere ausgewogen aus Sicht beider Vertragsparteien.";
}

function checkedLine(condition, text) {
  return condition ? `- ${text}\n` : "";
}

function buildPrompt() {
  const project = fields.projectName.value.trim();
  const risks = fields.specialRisks.value.trim();
  const contract = fields.contractText.value.trim();
  const works = selectedWorkTypes();

  const context = [
    project ? `Projekt / Objekt: ${project}` : "",
    works.length ? `Relevante Arbeiten: ${works.join(", ")}` : "",
    risks ? `Besondere Hinweise / Risiken: ${risks}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const normBlock =
    checkedLine(
      fields.sia118.checked,
      "Pruefe SIA 118 nur soweit sie vertraglich vereinbart oder sinnvoll als Branchenstandard relevant ist.",
    ) +
    checkedLine(
      fields.siaGaLa.checked,
      "Beruecksichtige garten- und landschaftsbauspezifische Schweizer Normen, technische Regeln und Branchenpraxis.",
    ) +
    checkedLine(
      fields.anwuchs.checked,
      "Pruefe Anwuchs-, Pflege- und Entwicklungsgarantien fuer Pflanzen, Rasen und Begruenungen vertieft.",
    ) +
    checkedLine(
      fields.neighbors.checked,
      "Pruefe Nachbarrechte, Grenzabstaende, Dienstbarkeiten und oeffentlich-rechtliche Vorgaben.",
    );

  return `Analysiere den folgenden Werkvertrag fuer Gartenbau- und Landschaftsbauarbeiten in der Schweiz aus rechtlicher, technischer und wirtschaftlicher Sicht.

${roleText(fields.role.value)}

${context ? `${context}\n` : ""}Beruecksichtige Schweizer Recht und die einschlaegige Praxis fuer Gartenbau und Landschaftsbau. Erstelle keine verbindliche Rechtsberatung, sondern eine strukturierte Risiko- und Vertragsanalyse. Weise klar darauf hin, welche Punkte durch eine Schweizer Fachperson juristisch oder technisch geprueft werden sollten.

Normen und besondere Pruefpunkte:
${normBlock || "- Pruefe nur die im Vertrag ausdruecklich genannten Normen und Standards.\n"}
Pruefe insbesondere:
1. Vertragsparteien, Grundstueck, Projektort und Leistungsumfang
2. Beschreibung der Gartenbau- und Landschaftsbauarbeiten
3. Plaene, Leistungsverzeichnis, Offerten, technische Beilagen und Rangordnung der Vertragsunterlagen
4. Bewilligungen, Nachbarrechte, Grenzabstaende, Dienstbarkeiten und oeffentlich-rechtliche Vorgaben
5. Baugrund, Bodenbeschaffenheit, Altlasten, Werkleitungen, Drainage und Entwaesserung
6. Termine, Bauprogramm, Witterungsrisiken, saisonale Abhaengigkeiten und Pflanzzeiten
7. Verguetung, Zahlungsplan, Akontozahlungen, Regiearbeiten, Nachtraege, Teuerung und Mehrwertsteuer
8. Aenderungsbestellungen, Mehr-/Minderleistungen, Nachtragspreise und Freigabeprozesse
9. Mitwirkungspflichten des Auftraggebers, Baustellenzugang, Wasser/Strom, Planfreigaben und Schnittstellen zu Dritten
10. Abnahme, Teilabnahmen, Maengelruege, Garantie- und Gewaehrleistungsfristen
11. Pflanzqualitaet, Pflegepflichten, Anwuchserfolg und Ersatzpflichten
12. Haftung, Versicherung, Schaeden an bestehenden Anlagen, Leitungen, Nachbargrundstuecken und Gebaeuden
13. Schutz bestehender Bepflanzung, Belaege, Mauern, Einfassungen und Installationen
14. Entsorgung, Aushub, Recycling, Umwelt-, Gewaesser- und Bodenschutzvorgaben
15. Kuendigung, Sistierung, Verzug, Vertragsstrafen und Folgen bei Terminverschiebungen
16. Dokumentations-, Pruef-, Mess- und Nachweispflichten
17. Unklare, widerspruechliche, einseitige oder riskante Klauseln
18. Fehlende Regelungen, die ergaenzt werden sollten

Gib die Analyse strukturiert aus mit:
- Kurzfazit
- Wichtigste Risiken fuer den Auftraggeber
- Wichtigste Risiken fuer den Gartenbau-/Landschaftsbauunternehmer
- Technische und praktische Ausfuehrungsrisiken
- Auffaellige Klauseln mit Begruendung
- Konkrete Aenderungsvorschlaege fuer faire und klare Vertragsklauseln
- Offene Fragen vor Unterzeichnung
- Empfohlene Beilagen, Nachweise und Kontrollen

Achte besonders auf klare Leistungsabgrenzung, Schnittstellen zu anderen Unternehmern, unvorhergesehene Boden- oder Leitungsverhaeltnisse, Witterungs- und Saisonrisiken, Pflanzqualitaet, Pflege, Anwuchserfolg, Abnahme und Maengelruegen nach Schweizer Praxis.

Hier ist der zu analysierende Werkvertrag:
${contract || "[Vertragstext hier einfuegen]"}`;
}

function renderPrompt() {
  output.value = buildPrompt();
  charCount.textContent = `${output.value.length.toLocaleString("de-CH")} Zeichen`;
}

async function copyPrompt() {
  await navigator.clipboard.writeText(output.value);
  copyStatus.textContent = "Prompt kopiert";
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
}

async function runAnalysis() {
  analyzeButton.disabled = true;
  analysisStatus.textContent = "Analyse laeuft...";
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
      throw new Error(data.error || "Analyse fehlgeschlagen.");
    }

    analysisOutput.value = data.analysis || "Keine Analyse erhalten.";
    analysisStatus.textContent = "Fertig";
  } catch (error) {
    analysisOutput.value = error.message;
    analysisStatus.textContent = "Fehler";
  } finally {
    analyzeButton.disabled = false;
  }
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF-Bibliothek konnte nicht geladen werden.");
  }

  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  }).promise;

  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    pdfStatus.textContent = `Lese PDF-Seite ${pageNumber} von ${pdf.numPages}...`;

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
    pdfStatus.textContent = "Bitte eine PDF-Datei auswaehlen.";
    return;
  }

  pdfStatus.textContent = "PDF wird gelesen...";

  try {
    const result = await extractPdfText(file);

    if (!result.text) {
      fields.contractText.value =
        "Aus dieser PDF konnte kein Text extrahiert werden. Moeglicherweise ist es ein Scan ohne OCR.";
      pdfStatus.textContent = "Kein lesbarer PDF-Text gefunden.";
    } else {
      fields.contractText.value = result.text;
      pdfStatus.textContent = `${result.pages} Seite(n) extrahiert, ${result.text.length.toLocaleString("de-CH")} Zeichen.`;
    }

    renderPrompt();
  } catch (error) {
    pdfStatus.textContent = error.message || "PDF konnte nicht gelesen werden.";
  }
}

form.addEventListener("input", renderPrompt);
copyButton.addEventListener("click", copyPrompt);
analyzeButton.addEventListener("click", runAnalysis);
fields.pdfFile.addEventListener("change", handlePdfUpload);
renderPrompt();
