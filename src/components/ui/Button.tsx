import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type To } from "react-router-dom";
import { cn } from "../../lib/cn";

const baseClasses =
    "inline-block cursor-pointer rounded px-12 py-4 text-center text-mid leading-6 font-medium hover:opacity-90 disabled:cursor-default disabled:opacity-50";

const variantClasses = {
    primary: "bg-primary text-heading-white",
    success: "bg-green text-heading-white",
    outline: "border border-black/50 text-text-black",
} as const;

interface CommonProps {
    variant?: keyof typeof variantClasses;
    className?: string;
    children: ReactNode;
}

/** With `to` the button renders as a router link. */
type LinkButtonProps = CommonProps & { to: To };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never };

export default function Button(props: LinkButtonProps | NativeButtonProps) {
    if (props.to !== undefined) {
        const { variant = "primary", className, children, to } = props;
        return (
            <Link to={to} className={cn(baseClasses, variantClasses[variant], className)}>
                {children}
            </Link>
        );
    }

    const { variant = "primary", className, children, type = "button", ...buttonProps } = props;
    return (
        <button
            {...buttonProps}
            type={type}
            className={cn(baseClasses, variantClasses[variant], className)}
        >
            {children}
        </button>
    );
}
