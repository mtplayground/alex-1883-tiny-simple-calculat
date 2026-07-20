function App() {
  return (
    <main className="app-shell" aria-labelledby="app-title">
      <section className="calculator-shell">
        <div className="calculator-display" aria-live="polite">
          0
        </div>
        <h1 id="app-title">Tiny Simple Calculator</h1>
        <p>React and TypeScript are ready for the calculator interface.</p>
      </section>
    </main>
  );
}

export default App;
