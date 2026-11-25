import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The custom font sizes declared in `index.css`. Without registering them, tailwind-merge
 * treats `text-mid` as a color and drops it when combined with e.g. `text-heading-white`.
 */
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: [
                "small",
                "mid",
                "xl",
                "xxl",
                "heading-small",
                "heading-mid",
                "heading-xl",
                "heading-xxl",
            ],
        },
    },
});

/** Joins conditional class names and resolves conflicting Tailwind classes (last one wins). */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
