export interface DisplayProps {
  displayValue: string;
  expression?: string;
  isError?: boolean;
}

function getDisplayText(value: string): string {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : "0";
}

function getValueSizeClass(value: string, isError: boolean): string {
  if (isError) {
    return "text-base";
  }

  if (value.length > 14) {
    return "text-2xl";
  }

  if (value.length > 9) {
    return "text-[2rem]";
  }

  return "text-[2.5rem]";
}

export function Display({ displayValue, expression = "", isError = false }: DisplayProps) {
  const displayText = getDisplayText(displayValue);
  const expressionText = expression.trim();
  const valueClassName = `calculator-display-value ${getValueSizeClass(displayText, isError)}`;

  return (
    <div
      className="calculator-display"
      role="status"
      aria-atomic="true"
      aria-live="polite"
      aria-invalid={isError || undefined}
    >
      <div className="calculator-display-expression" aria-hidden={expressionText.length === 0}>
        {expressionText}
      </div>
      <div className={valueClassName}>{displayText}</div>
    </div>
  );
}
