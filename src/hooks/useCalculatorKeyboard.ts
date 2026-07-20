import { useEffect } from "react";
import type { CalculatorAction, Digit } from "../lib/calculator";

export type CalculatorActionHandler = (action: CalculatorAction) => void;

const digitKeys = new Set<string>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

export function mapKeyboardKeyToCalculatorAction(key: string): CalculatorAction | null {
  if (digitKeys.has(key)) {
    return { type: "digit", digit: key as Digit };
  }

  switch (key) {
    case "+":
      return { type: "operator", operator: "+" };
    case "-":
    case "−":
      return { type: "operator", operator: "-" };
    case "*":
      return { type: "operator", operator: "*" };
    case "/":
      return { type: "operator", operator: "/" };
    case "Enter":
    case "=":
      return { type: "equals" };
    case "Escape":
    case "c":
    case "C":
      return { type: "clear" };
    default:
      return null;
  }
}

export function useCalculatorKeyboard(onAction: CalculatorActionHandler) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const action = mapKeyboardKeyToCalculatorAction(event.key);

      if (!action) {
        return;
      }

      event.preventDefault();
      onAction(action);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onAction]);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
}
