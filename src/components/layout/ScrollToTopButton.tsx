import { useEffect, useState } from "react";
import arrow from "../../assets/icons/arrow-circle-left.svg";
import { cn } from "../../lib/cn";

const SHOW_AFTER_PX = 400;

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const update = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <button
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            className={cn(
                "fixed right-4 bottom-6 z-20 size-[46px] cursor-pointer rounded-full shadow-md transition-opacity lg:right-8",
                !isVisible && "invisible opacity-0",
            )}
        >
            {/* The design's "left arrow" circle, turned to point up. */}
            <img src={arrow} alt="" className="size-full rotate-90" />
        </button>
    );
}
