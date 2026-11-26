import { cn } from "../../lib/cn";
import type { ProductColor } from "../../types/product";

interface ColorSwatchesProps {
    colors: ProductColor[];
    /** Name of the chosen colour. */
    selected?: string;
    onSelect: (name: string) => void;
}

/** The cross drawn over a sold-out colour. The white edge keeps it visible on dark colours. */
function SoldOutCross() {
    return (
        <svg viewBox="0 0 20 20" className="absolute inset-0 size-full" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" className="stroke-white" strokeWidth="4" />
            <path d="M5 5l10 10M15 5 5 15" className="stroke-black" strokeWidth="1.8" />
        </svg>
    );
}

/** Round colour buttons. Sold-out colours are faded, crossed out and disabled. */
export default function ColorSwatches({ colors, selected, onSelect }: ColorSwatchesProps) {
    return (
        <ul aria-label="Colours" className="flex gap-2">
            {colors.map(({ name, hex, inStock }) => {
                const isSelected = name === selected;
                const label = inStock ? name : `${name} (sold out)`;

                return (
                    <li key={name} className="flex">
                        <button
                            type="button"
                            aria-label={label}
                            aria-pressed={isSelected}
                            title={label}
                            disabled={!inStock}
                            onClick={() => onSelect(name)}
                            className={cn(
                                "relative flex size-5 cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed",
                                isSelected && "border-2 border-black",
                            )}
                        >
                            <span
                                className={cn(
                                    "rounded-full",
                                    isSelected ? "size-3" : "size-[18px]",
                                    !inStock && "opacity-40",
                                )}
                                style={{ backgroundColor: hex }}
                            />
                            {!inStock && <SoldOutCross />}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
