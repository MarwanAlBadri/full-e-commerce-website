import { useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    /**
     * `underline`: auth forms, the label is the placeholder.
     * `filled`: grey box with the label above (checkout, account).
     */
    variant?: "underline" | "filled";
};

export default function TextField({
    label,
    error,
    variant = "filled",
    required,
    className,
    ...inputProps
}: TextFieldProps) {
    const id = useId();
    const errorId = `${id}-error`;
    const isUnderline = variant === "underline";

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label
                htmlFor={id}
                className={isUnderline ? "sr-only" : "text-mid leading-6 text-text-black/40"}
            >
                {label}
                {required && !isUnderline && <span className="text-primary">*</span>}
            </label>
            <input
                {...inputProps}
                id={id}
                aria-required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                placeholder={isUnderline ? label : inputProps.placeholder}
                className={cn(
                    "w-full text-mid leading-6 text-text-black outline-none placeholder:text-text-black/40",
                    isUnderline
                        ? "border-b border-black/40 bg-transparent pb-2 focus:border-text-black"
                        : "rounded bg-secondary px-4 py-[13px] focus:ring-2 focus:ring-primary",
                    error && "border-primary",
                )}
            />
            {error && (
                <p id={errorId} role="alert" className="text-small text-primary">
                    {error}
                </p>
            )}
        </div>
    );
}
