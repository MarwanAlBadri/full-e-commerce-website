import base from "../../assets/icons/cat-smartwatch.svg";
import v1 from "../../assets/icons/cat-watch-v1.svg";
import v2 from "../../assets/icons/cat-watch-v2.svg";
import v3 from "../../assets/icons/cat-watch-v3.svg";
import l11 from "../../assets/icons/cat-watch-l11.svg";
import l10 from "../../assets/icons/cat-watch-l10.svg";
import l9 from "../../assets/icons/cat-watch-l9.svg";

/** A rotated horizontal line of `length` px, rendered as a vertical bar (as exported from Figma). */
function Bar({ length, src }: { length: number; src: string }) {
    return (
        <span className="flex w-0 items-center justify-center" style={{ height: length }}>
            <span className="flex-none rotate-90">
                <span className="relative block h-0" style={{ width: length }}>
                    <span className="absolute inset-[-2px_0_0_0]">
                        <img src={src} alt="" className="block size-full max-w-none" />
                    </span>
                </span>
            </span>
        </span>
    );
}

export default function SmartWatchIcon() {
    return (
        <span className="relative block size-14 overflow-clip">
            <img src={base} alt="" className="absolute inset-0 size-full max-w-none" />
            <span className="absolute inset-1/4">
                <span className="absolute inset-[-3.57%]">
                    <img src={v1} alt="" className="block size-full max-w-none" />
                </span>
            </span>
            <span className="absolute top-3/4 right-[37.5%] bottom-[12.5%] left-[37.5%]">
                <span className="absolute inset-[-14.29%_-7.14%]">
                    <img src={v2} alt="" className="block size-full max-w-none" />
                </span>
            </span>
            <span className="absolute top-[12.5%] right-[37.5%] bottom-3/4 left-[37.5%]">
                <span className="absolute inset-[-14.29%_-7.14%]">
                    <img src={v3} alt="" className="block size-full max-w-none" />
                </span>
            </span>
            <span className="absolute inset-[39.29%_41.07%_37.5%_41.07%] flex items-end gap-1">
                <Bar length={13} src={l11} />
                <Bar length={8} src={l10} />
                <Bar length={10} src={l9} />
            </span>
        </span>
    );
}
