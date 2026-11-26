import type { ReactNode, Ref } from "react";

/**
 * A horizontally scrolling row that bleeds to the right edge of the screen, as in the design.
 * It measures the nearest `@container` so the scrollbar width never causes page overflow.
 */
export default function ScrollRow({
    ref,
    children,
}: {
    ref: Ref<HTMLDivElement>;
    children: ReactNode;
}) {
    return (
        <div
            ref={ref}
            className="mr-[calc((100%-100cqw)/2)] flex [scrollbar-width:none] gap-[30px] overflow-x-auto scroll-smooth py-1 pr-[calc((100cqw-100%)/2)] [&::-webkit-scrollbar]:hidden"
        >
            {children}
        </div>
    );
}
