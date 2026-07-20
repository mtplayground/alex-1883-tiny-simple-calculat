import { useReducer } from "react";
import { Display } from "./components/Display";
import { Keypad } from "./components/Keypad";
import { applyCalculatorAction, createInitialCalculatorState } from "./lib/calculator";

function App() {
  const [calculatorState, dispatchCalculatorAction] = useReducer(
    applyCalculatorAction,
    createInitialCalculatorState(),
  );

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
    </main>
  );
}

export default App;
