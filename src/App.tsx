function App() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-canvas p-6"
      aria-labelledby="app-title"
    >
      <section className="calculator-surface">
        <div className="calculator-display" aria-live="polite">
          0
        </div>
        <h1 id="app-title" className="mt-5 text-xl leading-tight text-ink">
          Tiny Simple Calculator
        </h1>
        <p className="mt-2 leading-6 text-ink-muted">
          Tailwind design tokens are ready for the calculator interface.
        </p>
      </section>
    </main>
  );
}

export default App;
