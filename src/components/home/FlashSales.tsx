import { useRef } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import CarouselArrows from "../ui/CarouselArrows";
import ProductCard from "../ui/ProductCard";
import { flashSaleProducts } from "../../data/products";
import { useCountdown } from "../../hooks/useCountdown";
import timerDot from "../../assets/icons/timer-dot.svg";

const FLASH_SALE_SECONDS = 3 * 86400 + 23 * 3600 + 19 * 60 + 56;

function Colon() {
    return (
        <span className="mb-2 flex flex-col gap-2 self-end" aria-hidden="true">
            <img src={timerDot} alt="" className="size-1" />
            <img src={timerDot} alt="" className="size-1" />
        </span>
    );
}

function TimerUnit({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[12px] leading-[18px] font-medium text-text-black">{label}</span>
            <span className="font-inter text-[32px] leading-[30px] font-bold tracking-[1.28px] text-text-black">
                {value}
            </span>
        </div>
    );
}

export default function FlashSales() {
    const { days, hours, minutes, seconds } = useCountdown(FLASH_SALE_SECONDS);
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 1 | -1) =>
        trackRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });

    return (
        <section className="mx-auto max-w-[1202px] px-4">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader label="Today’s" title="Flash Sales">
                    <div className="flex items-start gap-[17px]">
                        <TimerUnit label="Days" value={days} />
                        <Colon />
                        <TimerUnit label="Hours" value={hours} />
                        <Colon />
                        <TimerUnit label="Minutes" value={minutes} />
                        <Colon />
                        <TimerUnit label="Seconds" value={seconds} />
                    </div>
                </SectionHeader>
                <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
            </div>

            <div
                ref={trackRef}
                className="mt-10 flex [scrollbar-width:none] gap-[30px] overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
            >
                {flashSaleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        className="w-[270px] shrink-0"
                    />
                ))}
            </div>

            <div className="mt-[60px] flex justify-center">
                <Link
                    to="/"
                    className="rounded bg-primary px-12 py-4 text-mid leading-6 font-medium text-heading-white hover:opacity-90"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
