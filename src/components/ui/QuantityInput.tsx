import { MAX_QUANTITY } from "../../context/cartReducer";

interface QuantityInputProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
}

const stepClasses =
    "flex w-10 cursor-pointer items-center justify-center text-xl hover:bg-primary hover:text-white disabled:cursor-default disabled:text-black/30 disabled:hover:bg-transparent";

/** A "− value +" control limited to 1…99. */
export default function QuantityInput({ value, onChange, label }: QuantityInputProps) {
    return (
        <div className="flex h-11 w-fit overflow-hidden rounded border border-black/40">
            <button
                type="button"
                aria-label={`Decrease ${label}`}
                disabled={value <= 1}
                onClick={() => onChange(value - 1)}
                className={stepClasses}
            >
                −
            </button>
            <input
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_QUANTITY}
                value={value}
                aria-label={label}
                onChange={(event) => {
                    const next = Math.floor(Number(event.target.value));
                    if (next >= 1) onChange(Math.min(next, MAX_QUANTITY));
                }}
                className="w-14 [appearance:textfield] border-x border-black/40 text-center text-mid font-medium outline-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
                type="button"
                aria-label={`Increase ${label}`}
                disabled={value >= MAX_QUANTITY}
                onClick={() => onChange(value + 1)}
                className={stepClasses}
            >
                +
            </button>
        </div>
    );
}
