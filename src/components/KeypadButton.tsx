import type { CalculatorAction } from "../lib/calculator";

export type KeypadButtonVariant = "default" | "operator" | "clear" | "equals";

export interface KeypadButtonProps {
  label: string;
  action: CalculatorAction;
  ariaLabel?: string;
  variant?: KeypadButtonVariant;
  onPress?: (action: CalculatorAction) => void;
}

function getVariantClassName(variant: KeypadButtonVariant): string {
  switch (variant) {
    case "equals":
      return "calculator-key-equals";
    case "operator":
      return "calculator-key-operator";
    case "clear":
      return "calculator-key-clear";
    case "default":
      return "";
  }
}

export function KeypadButton({
  label,
  action,
  ariaLabel,
  variant = "default",
  onPress,
}: KeypadButtonProps) {
  const variantClassName = getVariantClassName(variant);
  const className = variantClassName ? `calculator-key ${variantClassName}` : "calculator-key";

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => onPress?.(action)}
    >
      {label}
    </button>
  );
}
