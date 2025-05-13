import React, { useState } from 'react';

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentQuote, setAgentQuote] = useState("");

  const handleGenerate = () => {
    const lines = transcript.split("\n");
    const quotes = lines
      .filter(line => line.includes(":"))
      .map(line => {
        const [name, content] = line.split(":");
        return `💬 ${name.trim()}: "${content.trim()}"`;
      });

    const speakers = [...new Set(lines.map(line => line.split(":")[0]))].filter(Boolean);
    const summary = `This ICON panel features insights from ${speakers.join(", ")}.`;

    // Find the most impactful quote (longest one)
    const bestQuoteLine = lines
      .filter(line => line.includes(":"))
      .map(line => {
        const [name, content] = line.split(":");
        return { name: name.trim(), quote: content.trim() };
      })
      .reduce((longest, current) => current.quote.length > longest.quote.length ? current : longest, { name: "", quote: "" });

    if (bestQuoteLine.name && bestQuoteLine.quote) {
      setAgentName(bestQuoteLine.name);
      setAgentQuote(bestQuoteLine.quote);
    }

    setOutput(`${summary}\n\n${quotes.join("\n")}`);
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

      <div style={{ marginTop: "1rem" }}>
        <iframe
          title="Canva Preview"
          src={`https://www.canva.com/design/DAGnWB5FYV0/N24eGBKrTH0CwHIgmi8J0w/view?embed`}
          style={{ width: "100%", height: "500px", border: "none", borderRadius: "8px" }}
          allowFullScreen
        />
      </div>

      <button
        onClick={() => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 800;
          canvas.height = 400;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#111827";
          ctx.font = "bold 24px Arial";
          ctx.fillText(`"${agentQuote}"`, 40, 200);
          ctx.font = "italic 18px Arial";
          ctx.fillText(`- ${agentName}`, 40, 240);

          const link = document.createElement("a");
          link.download = "icon-quote.png";
          link.href = canvas.toDataURL();
          link.click();
        }}
        style={{
          backgroundColor: "#f97316",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          marginTop: "1rem",
          cursor: "pointer",
          border: "none"
        }}
      >
        Download as Image
      </button>

      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "1rem", marginTop: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}
