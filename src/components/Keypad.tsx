import type { CalculatorAction } from "../lib/calculator";
import { KeypadButton, type KeypadButtonVariant } from "./KeypadButton";

interface KeypadButtonDefinition {
  label: string;
  ariaLabel: string;
  action: CalculatorAction;
  variant?: KeypadButtonVariant;
}

export interface KeypadProps {
  onPress?: (action: CalculatorAction) => void;
}

const keypadButtons: readonly KeypadButtonDefinition[] = [
  { label: "7", ariaLabel: "Seven", action: { type: "digit", digit: "7" } },
  { label: "8", ariaLabel: "Eight", action: { type: "digit", digit: "8" } },
  { label: "9", ariaLabel: "Nine", action: { type: "digit", digit: "9" } },
  {
    label: "/",
    ariaLabel: "Divide",
    action: { type: "operator", operator: "/" },
    variant: "operator",
  },
  { label: "4", ariaLabel: "Four", action: { type: "digit", digit: "4" } },
  { label: "5", ariaLabel: "Five", action: { type: "digit", digit: "5" } },
  { label: "6", ariaLabel: "Six", action: { type: "digit", digit: "6" } },
  {
    label: "x",
    ariaLabel: "Multiply",
    action: { type: "operator", operator: "*" },
    variant: "operator",
  },
  { label: "1", ariaLabel: "One", action: { type: "digit", digit: "1" } },
  { label: "2", ariaLabel: "Two", action: { type: "digit", digit: "2" } },
  { label: "3", ariaLabel: "Three", action: { type: "digit", digit: "3" } },
  {
    label: "-",
    ariaLabel: "Subtract",
    action: { type: "operator", operator: "-" },
    variant: "operator",
  },
  { label: "C", ariaLabel: "Clear", action: { type: "clear" }, variant: "clear" },
  { label: "0", ariaLabel: "Zero", action: { type: "digit", digit: "0" } },
  { label: "=", ariaLabel: "Equals", action: { type: "equals" }, variant: "equals" },
  {
    label: "+",
    ariaLabel: "Add",
    action: { type: "operator", operator: "+" },
    variant: "operator",
  },
];

export function Keypad({ onPress }: KeypadProps) {
  return (
    <div className="calculator-key-grid" role="group" aria-label="Calculator keypad">
      {keypadButtons.map((button) => (
        <KeypadButton
          key={button.label}
          label={button.label}
          ariaLabel={button.ariaLabel}
          action={button.action}
          variant={button.variant}
          onPress={onPress}
        />
      ))}
    </div>
  );
}
