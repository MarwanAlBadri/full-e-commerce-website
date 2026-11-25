import arrowLeft from "../../assets/icons/arrow-circle-left.svg";
import arrowRight from "../../assets/icons/arrow-circle-right.svg";

interface CarouselArrowsProps {
    onPrev?: () => void;
    onNext?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function CarouselArrows({
    onPrev,
    onNext,
    disabled,
    className = "",
}: CarouselArrowsProps) {
    const base =
        "size-[46px] cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-50";
    return (
        <div className={`flex gap-2 ${className}`}>
            <button
                type="button"
                aria-label="Previous"
                onClick={onPrev}
                disabled={disabled}
                className={base}
            >
                <img src={arrowLeft} alt="" className="size-full" />
            </button>
            <button
                type="button"
                aria-label="Next"
                onClick={onNext}
                disabled={disabled}
                className={base}
            >
                <img src={arrowRight} alt="" className="size-full" />
            </button>
        </div>
    );
}
