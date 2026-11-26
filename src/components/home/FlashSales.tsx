import timerDot from "../../assets/icons/timer-dot.svg";
import { ROUTES } from "../../constants/routes";
import { useCountdown } from "../../hooks/useCountdown";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import { getProductsByTag } from "../../services/productService";
import Button from "../ui/Button";
import CarouselArrows from "../ui/CarouselArrows";
import Container from "../ui/Container";
import ProductCard from "../ui/ProductCard";
import ScrollRow from "../ui/ScrollRow";
import SectionHeader from "../ui/SectionHeader";

const FLASH_SALE_SECONDS = 3 * 86400 + 23 * 3600 + 19 * 60 + 56;
const CARD_STEP = 300;

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

function SaleTimer() {
    const { days, hours, minutes, seconds } = useCountdown(FLASH_SALE_SECONDS);

    return (
        <div className="flex items-start gap-[17px]">
            <TimerUnit label="Days" value={days} />
            <Colon />
            <TimerUnit label="Hours" value={hours} />
            <Colon />
            <TimerUnit label="Minutes" value={minutes} />
            <Colon />
            <TimerUnit label="Seconds" value={seconds} />
        </div>
    );
}

export default function FlashSales() {
    const { ref, scrollPrev, scrollNext } = useHorizontalScroll(CARD_STEP);

    return (
        <Container as="section">
            <SectionHeader
                label="Today’s"
                title="Flash Sales"
                actions={<CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />}
            >
                <SaleTimer />
            </SectionHeader>

            <div className="mt-10">
                {/* Cards beyond the content width stay hidden until the arrows scroll to them. */}
                <ScrollRow ref={ref} bleed={false}>
                    {getProductsByTag("flash-sale").map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            className="w-[270px] shrink-0"
                        />
                    ))}
                </ScrollRow>
            </div>

            <div className="mt-[60px] flex justify-center">
                <Button to={`${ROUTES.search}?tag=flash-sale`}>View All Products</Button>
            </div>
        </Container>
    );
}
