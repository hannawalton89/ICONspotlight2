import React, { useState } from 'react';

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentQuote, setAgentQuote] = useState("");

  const handleGenerate = () => {
    const lines = transcript.split("
");
    const quotes = lines
      .filter(line => line.includes(":"))
      .map(line => {
        const [name, content] = line.split(":");
        return {
          raw: `💬 ${name.trim()}: "${content.trim()}"`,
          name: name.trim(),
          quote: content.trim()
        };
      });

    const speakers = [...new Set(quotes.map(q => q.name))];
    const summary = `This ICON panel features insights from ${speakers.join(", ")}.`;

    const keywords = ["love", "learned", "important", "powerful", "truth", "change", "impact", "value"];

    const scored = quotes.map(q => {
      const keywordScore = keywords.reduce((score, word) =>
        q.quote.toLowerCase().includes(word) ? score + 10 : score, 0);
      const lengthScore = Math.min(q.quote.length, 200) / 10;
      return { ...q, score: keywordScore + lengthScore };
    });

    const topQuotes = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (topQuotes.length > 0) {
      setAgentName(topQuotes[0].name);
      setAgentQuote(topQuotes[0].quote);
    }

    setOutput(`${summary}

${topQuotes.map(q => q.raw).join("\n\n")}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>ICONSpotlight</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Paste your ICON panel transcript below and generate quotes and summaries automatically.
      </p>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste ICON panel transcript here..."
        rows={12}
        style={{ width: "100%", padding: "1rem", fontFamily: "monospace", marginTop: "1rem" }}
      />

      <input
        type="text"
        placeholder="Agent Name"
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
        style={{ width: "100%", marginTop: "1rem", padding: "0.5rem" }}
      />

      <input
        type="text"
        placeholder="Agent Quote"
        value={agentQuote}
        onChange={(e) => setAgentQuote(e.target.value)}
        style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem" }}
      />

      <button
        onClick={handleGenerate}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          marginTop: "1rem",
          cursor: "pointer",
          border: "none"
        }}
      >
        Generate Quotes & Summary
      </button>

      <a
        href={`https://www.canva.com/design/DAGnWB5FYV0/N24eGBKrTH0CwHIgmi8J0w/edit?name=${encodeURIComponent(agentName)}&quote=${encodeURIComponent(agentQuote)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            marginTop: "1rem",
            cursor: "pointer",
            border: "none"
          }}
        >
          Open Canva Template
        </button>
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(`${agentQuote}\n- ${agentName}`).then(() => {
            alert("Quote copied to clipboard!");
          });
        }}
        style={{
          backgroundColor: "#f59e0b",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          marginTop: "1rem",
          cursor: "pointer",
          border: "none"
        }}
      >
        Copy Quote to Clipboard
      </button>

      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "1rem", marginTop: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}
