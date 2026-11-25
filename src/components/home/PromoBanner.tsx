import { Link } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountdown";
import boombox from "../../assets/home/boombox.png";
import glow from "../../assets/home/promo-glow.svg";
import timerCircle from "../../assets/icons/timer-circle.svg";

const PROMO_SECONDS = 5 * 86400 + 23 * 3600 + 59 * 60 + 35;

function TimeCircle({ value, label }: { value: string; label: string }) {
    return (
        <div className="relative size-[62px]">
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
        <section className="mx-auto max-w-[1202px] px-4">
            <div className="relative grid min-h-[500px] overflow-hidden bg-black lg:grid-cols-[1fr_1fr]">
                <div className="relative z-10 flex flex-col items-start gap-8 px-6 py-12 lg:pl-14">
                    <p className="text-mid leading-5 font-semibold text-green">Categories</p>
                    <h2 className="font-inter text-[34px] leading-[44px] font-semibold tracking-[1.92px] text-heading-white md:text-heading-mid md:leading-[60px] lg:w-[443px]">
                        Enhance Your Music Experience
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        <TimeCircle value={days} label="Days" />
                        <TimeCircle value={hours} label="Hours" />
                        <TimeCircle value={minutes} label="Minutes" />
                        <TimeCircle value={seconds} label="Seconds" />
                    </div>
                    <Link
                        to="/"
                        className="rounded bg-green px-12 py-4 text-mid leading-6 font-medium text-heading-white hover:opacity-90"
                    >
                        Buy Now!
                    </Link>
                </div>

                <div className="relative flex items-center justify-center px-4 pb-10 lg:p-0">
                    <span
                        className="absolute -inset-x-0 inset-y-0 hidden lg:block"
                        aria-hidden="true"
                    >
                        <img
                            src={glow}
                            alt=""
                            className="absolute inset-[-40%_-39.68%] size-[180%] max-w-none"
                        />
                    </span>
                    <img
                        src={boombox}
                        alt="JBL Boombox speaker"
                        className="relative aspect-[568/330] w-full max-w-[568px] -scale-x-100"
                    />
                </div>
            </div>
        </section>
    );
}
