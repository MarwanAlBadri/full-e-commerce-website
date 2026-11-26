import type { ReactNode, Ref } from "react";
import { cn } from "../../lib/cn";

interface ScrollRowProps {
    ref: Ref<HTMLDivElement>;
    /**
     * Lets the row run to the right edge of the screen. It measures the nearest `@container`
     * so the scrollbar width never causes page overflow.
     */
    bleed?: boolean;
    children: ReactNode;
}

/** A horizontally scrolling row with a hidden scrollbar. */
export default function ScrollRow({ ref, bleed = true, children }: ScrollRowProps) {
    return (
        <div
            ref={ref}
            className={cn(
                "flex [scrollbar-width:none] gap-[30px] overflow-x-auto scroll-smooth py-1 [&::-webkit-scrollbar]:hidden",
                bleed && "mr-[calc((100%-100cqw)/2)] pr-[calc((100cqw-100%)/2)]",
            )}
        >
            {children}
        </div>
    );
}
