import { cn } from "../../lib/cn";

const STAR_PATH = "m10 1.7 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8Z";

/** Read-only star rating for whole values from 0 to 5. */
export default function Stars({ value, className }: { value: number; className?: string }) {
    return (
        <span
            role="img"
            aria-label={`${value} out of 5 stars`}
            className={cn("flex gap-0.5", className)}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    viewBox="0 0 20 20"
                    className={cn("size-5", star <= value ? "fill-star" : "fill-black/25")}
                    aria-hidden="true"
                >
                    <path d={STAR_PATH} />
                </svg>
            ))}
        </span>
    );
}
