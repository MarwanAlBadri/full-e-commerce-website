import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ContainerProps {
    as?: "div" | "section";
    className?: string;
    children: ReactNode;
}

/** Centres page content at the design width (1170px) with 16px side padding on small screens. */
export default function Container({ as: Element = "div", className, children }: ContainerProps) {
    return (
        <Element className={cn("mx-auto w-full max-w-[1202px] px-4", className)}>
            {children}
        </Element>
    );
}
