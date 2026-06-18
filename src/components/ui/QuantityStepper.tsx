interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function QuantityStepper({ quantity, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <div className="inline-flex w-fit shrink-0 items-center rounded-full border border-black/10 bg-[#F8F2E6] p-1 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-medium text-[var(--color-charcoal)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
      >
        −
      </button>
      <span className="inline-flex min-w-10 items-center justify-center px-2 text-sm font-semibold text-[var(--color-charcoal)]">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-medium text-[var(--color-charcoal)] transition hover:bg-white"
      >
        +
      </button>
    </div>
  );
}
