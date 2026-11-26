import { useCountdown } from "../../hooks/useCountdown";
import boombox from "../../assets/home/boombox.webp";
import glow from "../../assets/home/promo-glow.svg";
import timerCircle from "../../assets/icons/timer-circle.svg";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";
import Button from "../ui/Button";

const PROMO_SECONDS = 5 * 86400 + 23 * 3600 + 59 * 60 + 35;

function TimeCircle({ value, label }: { value: string; label: string }) {
    return (
        <div className="relative size-14 sm:size-[62px]">
            <img src={timerCircle} alt="" className="absolute inset-0 size-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-text-black">
                <span className="-mb-1 text-mid leading-5 font-semibold">{value}</span>
                <span className="text-[11px] leading-[18px]">{label}</span>
            </div>
        </div>
    );
}

export default function PromoBanner() {
    const { days, hours, minutes, seconds } = useCountdown(PROMO_SECONDS);

    return (
        <Container as="section">
            <div className="grid overflow-hidden bg-black md:min-h-[400px] md:grid-cols-2 lg:min-h-[500px] lg:grid-cols-[526px_minmax(0,1fr)]">
                <div className="relative z-10 flex flex-col items-start justify-center gap-8 px-4 py-8 sm:px-6 md:pr-0 lg:pl-14">
                    <p className="text-mid leading-5 font-semibold text-green">Categories</p>
                    <h2 className="max-w-[460px] font-inter text-[28px] leading-9 font-semibold tracking-[1.92px] text-heading-white sm:text-[32px] sm:leading-[42px] lg:text-heading-mid lg:leading-[60px]">
                        Enhance Your Music Experience
                    </h2>
                    <div className="flex gap-2 sm:gap-6">
                        <TimeCircle value={hours} label="Hours" />
                        <TimeCircle value={days} label="Days" />
                        <TimeCircle value={minutes} label="Minutes" />
                        <TimeCircle value={seconds} label="Seconds" />
                    </div>
                    <Button to={`${ROUTES.search}?tag=all`} variant="success" className="mt-2">
                        Buy Now!
                    </Button>
                </div>

                <div className="flex items-center justify-center px-4 pb-8 md:py-0 md:pl-0 xl:pr-11">
                    <div className="relative w-full max-w-[568px]">
                        {/* Soft light behind the speaker, sized and offset relative to it as in Figma. */}
                        <img
                            src={glow}
                            alt=""
                            className="pointer-events-none absolute top-1/2 left-[46%] w-[159%] max-w-none -translate-x-1/2 -translate-y-1/2"
                        />
                        <img
                            src={boombox}
                            alt="JBL Boombox speaker"
                            className="relative aspect-[568/330] w-full -scale-x-100"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}
