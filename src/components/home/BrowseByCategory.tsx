import { useRef, useState, type ReactNode } from "react";
import SectionHeader from "../ui/SectionHeader";
import CarouselArrows from "../ui/CarouselArrows";
import SmartWatchIcon from "./SmartWatchIcon";
import phoneIcon from "../../assets/icons/cat-phone.svg";
import computerIcon from "../../assets/icons/cat-computer.svg";
import cameraIcon from "../../assets/icons/cat-camera.svg";
import headphoneIcon from "../../assets/icons/cat-headphone.svg";
import gamepadIcon from "../../assets/icons/cat-gamepad.svg";

const icon = (src: string) => <img src={src} alt="" className="size-14" />;

interface Category {
    label: string;
    icon: ReactNode;
    /** The camera artwork is exported in white; every other icon is exported in black. */
    iconColor: "black" | "white";
}

const categories: Category[] = [
    { label: "Phones", icon: icon(phoneIcon), iconColor: "black" },
    { label: "Computers", icon: icon(computerIcon), iconColor: "black" },
    { label: "SmartWatch", icon: <SmartWatchIcon />, iconColor: "black" },
    { label: "Camera", icon: icon(cameraIcon), iconColor: "white" },
    { label: "HeadPhones", icon: icon(headphoneIcon), iconColor: "black" },
    { label: "Gaming", icon: icon(gamepadIcon), iconColor: "black" },
];

export default function BrowseByCategory() {
    const [selected, setSelected] = useState("Camera");
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 1 | -1) =>
        trackRef.current?.scrollBy({
            left: direction * 200,
            behavior: "smooth",
        });

    return (
        <section className="mx-auto max-w-[1202px] px-4">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader label="Categories" title="Browse By Category" />
                <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
            </div>

            <div
                ref={trackRef}
                className="mt-[60px] flex [scrollbar-width:none] gap-[30px] overflow-x-auto scroll-smooth py-1 [&::-webkit-scrollbar]:hidden"
            >
                {categories.map(({ label, icon: iconNode, iconColor }) => {
                    const isSelected = selected === label;
                    // Re-colour the exported artwork so every card can be selected.
                    const filter =
                        iconColor === "white"
                            ? isSelected
                                ? ""
                                : "brightness-0"
                            : isSelected
                              ? "brightness-0 invert"
                              : "";

                    return (
                        <button
                            key={label}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSelected(label)}
                            className={`flex h-[145px] w-[170px] shrink-0 cursor-pointer flex-col items-center justify-end gap-4 rounded px-4 pb-6 text-mid leading-6 transition-colors ${
                                isSelected
                                    ? "border border-primary bg-primary text-heading-white shadow-[0_1px_13px_rgba(0,0,0,0.05)]"
                                    : "border border-black/30 text-text-black hover:border-primary"
                            }`}
                        >
                            <span className={filter}>{iconNode}</span>
                            {label}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
