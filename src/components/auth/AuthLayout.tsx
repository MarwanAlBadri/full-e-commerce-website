import type { ReactNode } from "react";
import sideImage from "../../assets/images/auth-side.png";

export const authInputClass =
    "w-full border-b border-black/40 bg-transparent pb-2 text-mid leading-6 text-text-black outline-none placeholder:text-text-black/40 focus:border-text-black";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto my-10 flex max-w-[1440px] items-center gap-12 px-4 lg:my-[60px] lg:gap-16 lg:px-0 lg:pr-8 xl:mb-[140px] xl:gap-[129px] xl:pr-[135px]">
            <div className="relative hidden h-[781px] max-w-[805px] min-w-0 flex-1 overflow-clip rounded-r bg-[#cbe4e8] lg:block">
                <img
                    src={sideImage}
                    alt="Shopping cart with a phone and shopping bags"
                    className="absolute top-[75px] left-0 h-[706px] w-full max-w-none object-cover object-left"
                />
            </div>
            <div className="mx-auto w-full max-w-[370px] shrink-0 lg:mx-0 lg:w-[370px]">
                {children}
            </div>
        </div>
    );
}
