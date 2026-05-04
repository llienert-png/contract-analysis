const form = document.querySelector("#promptForm");
const output = document.querySelector("#promptOutput");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");
const charCount = document.querySelector("#charCount");

const fields = {
  projectName: document.querySelector("#projectName"),
  role: document.querySelector("#role"),
  specialRisks: document.querySelector("#specialRisks"),
  contractText: document.querySelector("#contractText"),
  sia118: document.querySelector("#sia118"),
  siaGaLa: document.querySelector("#siaGaLa"),
  anwuchs: document.querySelector("#anwuchs"),
  neighbors: document.querySelector("#neighbors"),
};

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

form.addEventListener("input", renderPrompt);
copyButton.addEventListener("click", copyPrompt);
renderPrompt();
