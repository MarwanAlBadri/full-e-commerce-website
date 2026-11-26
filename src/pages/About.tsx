import sideImage from "../assets/images/auth-side.webp";
import Services from "../components/home/Services";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import { ROUTES } from "../constants/routes";

const stats = [
    {
        value: "10.5k",
        label: "Sellers active on our site",
        icon: "M4 10v10h16V10M3 10l2-6h14l2 6H3Z",
    },
    {
        value: "33k",
        label: "Monthly product sales",
        icon: "M12 3v18M16 7H10a2.5 2.5 0 0 0 0 5h4a2.5 2.5 0 0 1 0 5H8",
    },
    {
        value: "45.5k",
        label: "Customers active on our site",
        icon: "M6 8h12l1 12H5L6 8Zm3 0a3 3 0 0 1 6 0",
    },
    {
        value: "25k",
        label: "Annual gross sales on our site",
        icon: "M3 6h18v12H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    },
];

/** The design highlights this card. */
const HIGHLIGHTED_STAT = "33k";

const team = [
    { name: "Tom Cruise", role: "Founder & Chairman" },
    { name: "Emma Watson", role: "Managing Director" },
    { name: "Will Smith", role: "Product Designer" },
];

const initials = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("");

export default function About() {
    return (
        <div className="pb-16 lg:pb-[140px]">
            <Container>
                <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "About" }]} />

                <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[70px]">
                    <div className="flex flex-col gap-6">
                        <h1 className="font-inter text-heading-mid font-semibold tracking-[3px] md:text-heading-xl">
                            Our Story
                        </h1>
                        <p className="text-mid leading-[26px]">
                            Launched in 2015, Exclusive is South Asia's premier online shopping
                            marketplace with an active presence in Bangladesh. Supported by a wide
                            range of tailored marketing, data and service solutions, Exclusive has
                            10,500 sellers and 300 brands and serves 3 million customers across the
                            region.
                        </p>
                        <p className="text-mid leading-[26px]">
                            Exclusive has more than 1 million products to offer, growing at a very
                            fast pace. Exclusive offers a diverse assortment in categories ranging
                            from consumer electronics to home goods.
                        </p>
                    </div>
                    <img
                        src={sideImage}
                        alt="Shopping cart with a phone and shopping bags"
                        className="h-[320px] w-full rounded object-cover lg:h-[560px]"
                    />
                </section>

                <ul className="mt-16 grid gap-[30px] sm:grid-cols-2 lg:mt-[140px] lg:grid-cols-4">
                    {stats.map(({ value, label, icon }) => (
                        <li
                            key={label}
                            data-active={value === HIGHLIGHTED_STAT}
                            className="group flex flex-col items-center gap-3 rounded border border-black/30 px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary hover:text-white data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-white"
                        >
                            <span className="flex size-20 items-center justify-center rounded-full bg-black/20">
                                <span className="flex size-14 items-center justify-center rounded-full bg-black text-white group-hover:bg-white group-hover:text-black group-data-[active=true]:bg-white group-data-[active=true]:text-black">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="size-7 fill-none stroke-current"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d={icon} />
                                    </svg>
                                </span>
                            </span>
                            <p className="font-inter text-[32px] font-bold tracking-[1.28px]">
                                {value}
                            </p>
                            <p className="text-mid">{label}</p>
                        </li>
                    ))}
                </ul>

                <section aria-label="Our team" className="mt-16 lg:mt-[140px]">
                    <ul className="grid gap-[30px] sm:grid-cols-3">
                        {team.map(({ name, role }) => (
                            <li key={name} className="flex flex-col gap-2">
                                {/* Initials stand in until the team photos are exported from Figma. */}
                                <span
                                    aria-hidden="true"
                                    className="mb-6 flex h-[280px] items-center justify-center rounded bg-secondary font-inter text-heading-xxl font-semibold text-black/30 lg:h-[430px]"
                                >
                                    {initials(name)}
                                </span>
                                <h2 className="font-inter text-xxl font-medium tracking-[2px] lg:text-[32px]">
                                    {name}
                                </h2>
                                <p className="text-mid">{role}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </Container>

            <div className="mt-16 lg:mt-[140px]">
                <Services />
            </div>
        </div>
    );
}
