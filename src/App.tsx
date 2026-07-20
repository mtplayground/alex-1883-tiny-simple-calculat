import { useReducer } from "react";
import { Display } from "./components/Display";
import { Keypad } from "./components/Keypad";
import { useCalculatorKeyboard } from "./hooks/useCalculatorKeyboard";
import { applyCalculatorAction, createInitialCalculatorState } from "./lib/calculator";

function IdeavibesWatermark() {
  async function handleShare() {
    const payload = {
      title: document.title || "Ideavibes app",
      text: "Built with Ideavibes.ai",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Keep the control non-intrusive if sharing is cancelled or unavailable.
    }
  }

  return (
    <div
      id="mctai-watermark"
      className="fixed bottom-3 left-1/2 z-[2147483647] flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-400/35 bg-slate-900/85 px-3 py-2 text-xs font-medium leading-tight text-slate-50 shadow-2xl backdrop-blur sm:bottom-4 sm:left-auto sm:right-4 sm:translate-x-0"
    >
      <a
        href="https://ideavibes.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-50 no-underline"
      >
        Built by Ideavibes.ai
      </a>
      <button
        type="button"
        className="border-0 border-l border-slate-400/35 bg-transparent py-0 pl-2 pr-0 font-inherit text-blue-300"
        onClick={handleShare}
      >
        Share
      </button>
    </div>
  );
}

function App() {
  const [calculatorState, dispatchCalculatorAction] = useReducer(
    applyCalculatorAction,
    createInitialCalculatorState(),
  );

  useCalculatorKeyboard(dispatchCalculatorAction);

  return (
    <main
      className="grid min-h-screen place-items-center bg-canvas p-6"
      aria-labelledby="app-title"
    >
      <section className="calculator-surface" aria-labelledby="app-title">
        <h1 id="app-title" className="sr-only">
          Calculator
        </h1>
        <Display
          displayValue={calculatorState.displayValue}
          expression={calculatorState.expression}
          isError={calculatorState.status === "error"}
        />
        <div className="mt-3">
          <Keypad onPress={dispatchCalculatorAction} />
        </div>
      </section>
      <IdeavibesWatermark />
    </main>
  );
}

export default App;
