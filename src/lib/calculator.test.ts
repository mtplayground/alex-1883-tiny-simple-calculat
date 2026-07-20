import { describe, expect, it } from "vitest";
import {
  applyCalculatorAction,
  calculateIntegerResult,
  createInitialCalculatorState,
  type CalculatorAction,
  type CalculatorState,
  type Digit,
  type Operator,
} from "./calculator";

function digitActions(value: string): CalculatorAction[] {
  return [...value].map((digit) => ({ type: "digit", digit: digit as Digit }));
}

function operatorAction(operator: Operator): CalculatorAction {
  return { type: "operator", operator };
}

function runCalculator(actions: CalculatorAction[]): CalculatorState {
  return actions.reduce(applyCalculatorAction, createInitialCalculatorState());
}

describe("calculateIntegerResult", () => {
  it("applies the four arithmetic operations", () => {
    expect(calculateIntegerResult(7, 5, "+")).toBe(12);
    expect(calculateIntegerResult(9, 4, "-")).toBe(5);
    expect(calculateIntegerResult(6, 8, "*")).toBe(48);
    expect(calculateIntegerResult(8, 2, "/")).toBe(4);
  });

  it("truncates integer division toward zero", () => {
    expect(calculateIntegerResult(7, 2, "/")).toBe(3);
    expect(calculateIntegerResult(-7, 2, "/")).toBe(-3);
  });

  it("returns null for divide by zero instead of throwing", () => {
    expect(calculateIntegerResult(8, 0, "/")).toBeNull();
  });
});

describe("calculator state reducer", () => {
  it("builds multi-digit input before evaluating", () => {
    const state = runCalculator([
      ...digitActions("12"),
      operatorAction("+"),
      ...digitActions("34"),
      { type: "equals" },
    ]);

    expect(state.displayValue).toBe("46");
    expect(state.expression).toBe("12 + 34 =");
    expect(state.status).toBe("result");
  });

  it("evaluates chained operations left to right as operators are entered", () => {
    const state = runCalculator([
      ...digitActions("12"),
      operatorAction("+"),
      ...digitActions("3"),
      operatorAction("*"),
      ...digitActions("2"),
      { type: "equals" },
    ]);

    expect(state.displayValue).toBe("30");
    expect(state.expression).toBe("15 x 2 =");
    expect(state.status).toBe("result");
  });

  it("clears back to the initial state", () => {
    const state = runCalculator([
      ...digitActions("9"),
      operatorAction("+"),
      ...digitActions("1"),
      { type: "clear" },
    ]);

    expect(state).toEqual(createInitialCalculatorState());
  });

  it("treats equals with no pending operation as a result state", () => {
    const state = runCalculator([...digitActions("45"), { type: "equals" }]);

    expect(state.displayValue).toBe("45");
    expect(state.expression).toBe("45");
    expect(state.status).toBe("result");
  });

  it("handles divide by zero with a recoverable error state", () => {
    const errorState = runCalculator([
      ...digitActions("8"),
      operatorAction("/"),
      ...digitActions("0"),
      { type: "equals" },
    ]);

    expect(errorState.displayValue).toBe("Cannot divide by zero");
    expect(errorState.errorMessage).toBe("Cannot divide by zero");
    expect(errorState.status).toBe("error");

    const recoveredState = applyCalculatorAction(errorState, { type: "digit", digit: "4" });

    expect(recoveredState.displayValue).toBe("4");
    expect(recoveredState.expression).toBe("");
    expect(recoveredState.status).toBe("input");
  });
});
