export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Operator = "+" | "-" | "*" | "/";

export type CalculatorStatus = "input" | "operator" | "result" | "error";

export type CalculatorAction =
  | { type: "digit"; digit: Digit }
  | { type: "operator"; operator: Operator }
  | { type: "equals" }
  | { type: "clear" };

export interface CalculatorState {
  displayValue: string;
  expression: string;
  currentValue: string;
  storedValue: number | null;
  pendingOperator: Operator | null;
  status: CalculatorStatus;
  errorMessage: string | null;
}

const DIVIDE_BY_ZERO_MESSAGE = "Cannot divide by zero";

export const operatorLabels: Record<Operator, string> = {
  "+": "+",
  "-": "-",
  "*": "x",
  "/": "/",
};

export function createInitialCalculatorState(): CalculatorState {
  return {
    displayValue: "0",
    expression: "",
    currentValue: "0",
    storedValue: null,
    pendingOperator: null,
    status: "input",
    errorMessage: null,
  };
}

export const initialCalculatorState = createInitialCalculatorState();

export function applyCalculatorAction(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "digit":
      return inputDigit(state, action.digit);
    case "operator":
      return inputOperator(state, action.operator);
    case "equals":
      return evaluatePendingOperation(state);
    case "clear":
      return createInitialCalculatorState();
  }
}

export function inputDigit(state: CalculatorState, digit: Digit): CalculatorState {
  if (state.status === "error" || state.status === "result") {
    return withCurrentValue(createInitialCalculatorState(), digit, "input");
  }

  if (state.status === "operator") {
    return withCurrentValue(state, digit, "input");
  }

  const nextValue = state.currentValue === "0" ? digit : `${state.currentValue}${digit}`;
  return withCurrentValue(state, nextValue, "input");
}

export function inputOperator(state: CalculatorState, operator: Operator): CalculatorState {
  if (state.status === "error") {
    return createInitialCalculatorState();
  }

  if (state.pendingOperator && state.status === "input") {
    const evaluated = evaluatePendingOperation(state);

    if (evaluated.status === "error") {
      return evaluated;
    }

    return setPendingOperator(evaluated, operator);
  }

  return setPendingOperator(state, operator);
}

export function evaluatePendingOperation(state: CalculatorState): CalculatorState {
  if (state.status === "error") {
    return state;
  }

  if (!state.pendingOperator || state.storedValue === null) {
    return {
      ...state,
      expression: state.currentValue,
      displayValue: state.currentValue,
      status: "result",
      errorMessage: null,
    };
  }

  const rightOperand = parseInteger(state.currentValue);
  const result = calculateIntegerResult(state.storedValue, rightOperand, state.pendingOperator);

  if (result === null) {
    return {
      displayValue: DIVIDE_BY_ZERO_MESSAGE,
      expression: `${state.storedValue} ${operatorLabels[state.pendingOperator]} ${rightOperand}`,
      currentValue: "0",
      storedValue: null,
      pendingOperator: null,
      status: "error",
      errorMessage: DIVIDE_BY_ZERO_MESSAGE,
    };
  }

  const resultValue = String(result);

  return {
    displayValue: resultValue,
    expression: `${state.storedValue} ${operatorLabels[state.pendingOperator]} ${rightOperand} =`,
    currentValue: resultValue,
    storedValue: null,
    pendingOperator: null,
    status: "result",
    errorMessage: null,
  };
}

export function calculateIntegerResult(
  leftOperand: number,
  rightOperand: number,
  operator: Operator,
): number | null {
  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      return rightOperand === 0 ? null : Math.trunc(leftOperand / rightOperand);
  }
}

function setPendingOperator(state: CalculatorState, operator: Operator): CalculatorState {
  const value = parseInteger(state.currentValue);

  return {
    ...state,
    displayValue: String(value),
    expression: `${value} ${operatorLabels[operator]}`,
    currentValue: String(value),
    storedValue: value,
    pendingOperator: operator,
    status: "operator",
    errorMessage: null,
  };
}

function withCurrentValue(
  state: CalculatorState,
  currentValue: string,
  status: CalculatorStatus,
): CalculatorState {
  return {
    ...state,
    currentValue,
    displayValue: currentValue,
    status,
    errorMessage: null,
  };
}

function parseInteger(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}
