export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Nur POST ist erlaubt." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({
      error:
        "OPENAI_API_KEY fehlt. Bitte in Vercel unter Project Settings > Environment Variables setzen.",
    });
  }

  const { prompt } = request.body || {};

  if (!prompt || typeof prompt !== "string") {
    return response.status(400).json({ error: "Prompt fehlt." });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: prompt,
        max_output_tokens: 6000,
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return response.status(openaiResponse.status).json({
        error:
          data.error?.message ||
          "OpenAI API hat die Analyse nicht erfolgreich abgeschlossen.",
      });
    }

    const analysis =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        .map((content) => content.text || "")
        .join("\n")
        .trim();

    return response.status(200).json({
      analysis: analysis || "Keine Textausgabe erhalten.",
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message || "Unerwarteter Serverfehler.",
    });
  }
}
