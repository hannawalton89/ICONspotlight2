export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>ICONSpotlight</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Turn your ICON panel transcript into Canva-ready content and social media highlights.
      </p>
      <textarea
        rows="14"
        defaultValue={`Amanda: I’m Amanda. I hit ICON by working expired listings.\nJason: I’m Jason. ICON 3 years running. Systems and consistency did it.`}
        style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontFamily: 'monospace' }}
      />
      <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
        This is a simplified preview of the ICONSpotlight prototype. Full version includes photo uploads,
        quote cards, AI summary, and Canva export integration.
      </p>
    </div>
  );
}
