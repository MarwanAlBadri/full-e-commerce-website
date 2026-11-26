import type { ReactNode } from "react";
import sideImage from "../../assets/images/auth-side.webp";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
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
                <div className="flex flex-col gap-6">
                    <h1 className="font-inter text-[30px] leading-[30px] font-medium tracking-[1.44px] md:text-heading-small">
                        {title}
                    </h1>
                    <p className="text-mid leading-6">Enter your details below</p>
                </div>
                {children}
            </div>
        </div>
    );
}
