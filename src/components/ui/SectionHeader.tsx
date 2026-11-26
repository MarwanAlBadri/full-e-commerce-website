import type { ReactNode } from "react";

interface SectionHeaderProps {
    label: string;
    title?: string;
    /** Content beside the title on large screens and below it on small ones (e.g. a timer). */
    children?: ReactNode;
    /** Controls at the end of the header (arrows, "View All"). */
    actions?: ReactNode;
}

/**
 * Small screens: the actions share the label's row so the title can use the full width.
 * Large screens: label above the title, then the extra content, then the actions at the end.
 */
export default function SectionHeader({ label, title, children, actions }: SectionHeaderProps) {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-5 lg:grid-cols-[auto_auto_1fr] lg:items-end">
            <div className="col-start-1 row-start-1 flex items-center gap-4">
                <span className="h-10 w-5 rounded bg-primary" aria-hidden="true" />
                <span className="text-mid leading-5 font-semibold text-primary">{label}</span>
            </div>
            {title && (
                <h2 className="col-span-2 row-start-2 font-inter text-[28px] leading-10 font-semibold tracking-[1.44px] text-text-black md:text-heading-small md:leading-[48px] lg:col-span-1 lg:col-start-1">
                    {title}
                </h2>
            )}
            {children && (
                <div className="col-span-2 row-start-3 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:ml-[71px]">
                    {children}
                </div>
            )}
            {actions && (
                <div className="col-start-2 row-start-1 justify-self-end lg:col-start-3 lg:row-start-2">
                    {actions}
                </div>
            )}
        </div>
    );
}
