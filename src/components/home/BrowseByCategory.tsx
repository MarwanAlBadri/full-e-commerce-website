import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import cameraIcon from "../../assets/icons/cat-camera.svg";
import computerIcon from "../../assets/icons/cat-computer.svg";
import gamepadIcon from "../../assets/icons/cat-gamepad.svg";
import headphoneIcon from "../../assets/icons/cat-headphone.svg";
import phoneIcon from "../../assets/icons/cat-phone.svg";
import { ROUTES } from "../../constants/routes";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import { cn } from "../../lib/cn";
import CarouselArrows from "../ui/CarouselArrows";
import Container from "../ui/Container";
import ScrollRow from "../ui/ScrollRow";
import SectionHeader from "../ui/SectionHeader";
import SmartWatchIcon from "./SmartWatchIcon";

const icon = (src: string) => <img src={src} alt="" className="size-14" />;

interface CategoryTile {
    id: string;
    label: string;
    icon: ReactNode;
    /** The camera artwork is exported in white; every other icon is exported in black. */
    iconColor: "black" | "white";
}

const tiles: CategoryTile[] = [
    { id: "phones", label: "Phones", icon: icon(phoneIcon), iconColor: "black" },
    { id: "computers", label: "Computers", icon: icon(computerIcon), iconColor: "black" },
    { id: "smartwatch", label: "SmartWatch", icon: <SmartWatchIcon />, iconColor: "black" },
    { id: "camera", label: "Camera", icon: icon(cameraIcon), iconColor: "white" },
    { id: "headphones", label: "HeadPhones", icon: icon(headphoneIcon), iconColor: "black" },
    { id: "gaming", label: "Gaming", icon: icon(gamepadIcon), iconColor: "black" },
];

/** The design highlights the Camera tile; hovering any other tile highlights it the same way. */
const HIGHLIGHTED_ID = "camera";

function getIconClasses(iconColor: CategoryTile["iconColor"], isHighlighted: boolean) {
    if (iconColor === "white") {
        return isHighlighted ? "" : "brightness-0 group-hover:brightness-100";
    }
    return isHighlighted ? "brightness-0 invert" : "group-hover:brightness-0 group-hover:invert";
}

export default function BrowseByCategory() {
    const { ref, scrollPrev, scrollNext } = useHorizontalScroll(200);

    return (
        <Container as="section">
            <SectionHeader
                label="Categories"
                title="Browse By Category"
                actions={<CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />}
            />

            <div className="mt-[60px]">
                <ScrollRow ref={ref}>
                    {tiles.map(({ id, label, icon: tileIcon, iconColor }) => {
                        const isHighlighted = id === HIGHLIGHTED_ID;
                        return (
                            <Link
                                key={id}
                                to={`${ROUTES.search}?category=${id}`}
                                className={cn(
                                    "group flex h-[145px] w-[170px] shrink-0 flex-col items-center justify-center gap-4 rounded border px-4 text-mid leading-6 transition-colors",
                                    isHighlighted
                                        ? "border-primary bg-primary text-heading-white shadow-[0_1px_13px_rgba(0,0,0,0.05)]"
                                        : "border-black/30 text-text-black hover:border-primary hover:bg-primary hover:text-heading-white",
                                )}
                            >
                                <span className={getIconClasses(iconColor, isHighlighted)}>
                                    {tileIcon}
                                </span>
                                {label}
                            </Link>
                        );
                    })}
                </ScrollRow>
            </div>
        </Container>
    );
}
