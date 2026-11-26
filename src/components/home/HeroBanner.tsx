import { useState } from "react";
import { Link } from "react-router-dom";
import appleLogo from "../../assets/home/apple-logo.webp";
import heroImage from "../../assets/home/hero-iphone.webp";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { ROUTES } from "../../constants/routes";
import { cn } from "../../lib/cn";

const DOTS = 5;

export default function HeroBanner() {
    const [active, setActive] = useState(2);

    return (
        <div className="relative flex min-h-[344px] flex-col overflow-hidden bg-black sm:flex-row sm:items-center">
            <div className="flex flex-col gap-5 px-6 pt-8 pb-4 sm:shrink-0 sm:py-8 xl:pl-16">
                <div className="flex items-center gap-6">
                    <span className="relative block h-[49px] w-10 overflow-hidden">
                        <img
                            src={appleLogo}
                            alt="Apple"
                            className="absolute h-[117.04%] w-[143.64%] max-w-none"
                            style={{ left: "-21.82%", top: "-8.89%" }}
                        />
                    </span>
                    <p className="text-mid leading-6 text-heading-white">iPhone 14 Series</p>
                </div>
                <h2 className="max-w-[300px] font-inter text-[34px] leading-[44px] font-semibold tracking-[1.92px] text-heading-white lg:text-[40px] lg:leading-[50px] xl:text-heading-mid xl:leading-[60px]">
                    Up to 10% off Voucher
                </h2>
                <Link
                    to={`${ROUTES.search}?category=phones`}
                    className="flex w-fit items-center gap-2 border-b border-heading-white pb-1 text-mid leading-6 font-medium text-heading-white"
                >
                    Shop Now
                    <img src={arrowRight} alt="" className="size-6" />
                </Link>
            </div>

            <img
                src={heroImage}
                alt="iPhone 14 Pro in deep purple"
                className="mt-4 aspect-[496/352] w-full max-w-[496px] self-center object-contain object-bottom sm:ml-auto sm:min-w-0 sm:flex-1 sm:self-end"
            />

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-3">
                {Array.from({ length: DOTS }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Slide ${i + 1}`}
                        aria-current={i === active}
                        onClick={() => setActive(i)}
                        className={cn(
                            "size-3 cursor-pointer rounded-full",
                            i === active ? "bg-primary ring-2 ring-heading-white" : "bg-white/50",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
