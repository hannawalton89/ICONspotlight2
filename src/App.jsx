import React, { useState } from 'react';

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");

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

      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "1rem", marginTop: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}
git add .
git commit -m "Added transcript processing and summary generation"
git push origin main
git config --global user.name "hannawalton89"
git config --global user.email "mrshannawalton@gmail.com"
git add .
git commit -m "Added transcript parsing and summary generation"
git push origin main
git config --global user.name "hannawalton89"
git config --global user.email "mrshannawalton@gmail.com"
git config --global user.email "mrshannawalton@gmail.com
git config --global user.name "hannawalton89"
git add .
git commit -m "Added generate button and transcript summary feature"
git push origin main
git config user.name "hannawalton89"
git config user.email "mrshannawalton@gmail.com"
git commit -m "Added transcript parser and summary button"
git push origin main