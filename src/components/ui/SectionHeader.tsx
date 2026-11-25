import type { ReactNode } from "react";

interface SectionHeaderProps {
    label: string;
    title: string;
    /** Content aligned next to the title (timer, arrows, button). */
    children?: ReactNode;
}

export default function SectionHeader({ label, title, children }: SectionHeaderProps) {
    return (
        <div className="flex flex-wrap items-end gap-x-[87px] gap-y-6">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <span className="h-10 w-5 rounded bg-primary" aria-hidden="true" />
                    <span className="text-mid leading-5 font-semibold text-primary">{label}</span>
                </div>
                <h2 className="font-inter text-[30px] leading-[48px] font-semibold tracking-[1.44px] text-text-black md:text-heading-small">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}
