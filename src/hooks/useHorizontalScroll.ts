import { useRef } from "react";

/** Connects arrow buttons to a horizontally scrolling element. */
export function useHorizontalScroll(step: number) {
    const ref = useRef<HTMLDivElement>(null);
    const scrollBy = (direction: 1 | -1) =>
        ref.current?.scrollBy({ left: direction * step, behavior: "smooth" });

    return { ref, scrollPrev: () => scrollBy(-1), scrollNext: () => scrollBy(1) };
}
