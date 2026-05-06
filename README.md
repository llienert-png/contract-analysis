# GaLaBau Vertragsanalyse CH

Statische Web-App fuer Vercel, die einen Prompt fuer Werkvertragsanalysen im Schweizer Garten- und Landschaftsbau erzeugt.
Die App kann den Prompt ausserdem ueber eine Vercel Serverless Function mit der OpenAI API analysieren.
Vertraege koennen als Text eingefuegt oder als PDF hochgeladen werden.
Die fertige Analyse kann als formatierter PDF-Bericht gespeichert werden.
Die App erkennt die Browser-Sprache automatisch und unterstützt Deutsch, Englisch, Französisch und Italienisch. Andere Browser-Sprachen fallen auf Deutsch zurück.

## Lokal oeffnen

`index.html` kann direkt im Browser geoeffnet werden. Dabei funktioniert der Prompt-Generator, aber nicht die KI-Analyse, weil `/api/analyze` nur in Vercel oder mit `vercel dev` verfuegbar ist.
Der PDF-Upload funktioniert im Browser fuer PDFs mit eingebettetem Text. Gescannte PDFs ohne OCR liefern moeglicherweise keinen Vertragstext.

## Vercel

Das Projekt benoetigt keinen Build-Schritt. Vercel kann den Ordner direkt deployen.

In Vercel muss unter `Project Settings > Environment Variables` diese Variable gesetzt werden:

- `OPENAI_API_KEY`: dein OpenAI API Key

Optional:

- `OPENAI_MODEL`: Modellname, Standard ist `gpt-5-mini`

Nach dem Setzen der Environment Variable muss das Projekt neu deployed werden.
