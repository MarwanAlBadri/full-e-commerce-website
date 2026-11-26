import { Link } from "react-router-dom";
import glowSpeakers from "../../assets/home/na-glow-1.svg";
import glowPerfume from "../../assets/home/na-glow-2.svg";
import echo from "../../assets/home/na-echo.webp";
import perfume from "../../assets/home/na-perfume.webp";
import ps5 from "../../assets/home/na-ps5.webp";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

function ShopNow({ categoryId }: { categoryId: string }) {
    return (
        <Link
            to={`${ROUTES.search}?category=${categoryId}`}
            className="w-fit border-b border-white text-mid leading-6 font-medium text-white"
        >
            Shop Now
        </Link>
    );
}

function CardText({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex flex-col gap-2 text-heading-white lg:gap-4">
            <h3 className="font-inter text-xl leading-6 font-semibold tracking-[0.72px] lg:text-xxl">
                {title}
            </h3>
            <p className="max-w-[255px] text-small leading-[21px]">{description}</p>
        </div>
    );
}

export default function NewArrival() {
    return (
        <Container as="section">
            <SectionHeader label="Featured" title="New Arrival" />

            <div className="mt-[60px] grid gap-4 md:grid-cols-2 lg:gap-[30px]">
                {/* PlayStation 5 */}
                <article className="relative h-[400px] overflow-clip rounded bg-black md:h-[600px]">
                    <div className="absolute top-6 left-1/2 size-[min(511px,100%)] -translate-x-1/2 overflow-hidden md:top-[89px] lg:left-[29px] lg:translate-x-0">
                        <img
                            src={ps5}
                            alt="PlayStation 5 consoles"
                            loading="lazy"
                            className="absolute h-[106.26%] w-[134.69%] max-w-none"
                            style={{ left: "-20.41%", top: "-6.19%" }}
                        />
                    </div>
                    <div className="absolute bottom-6 left-6 flex flex-col gap-4 lg:left-8">
                        <CardText
                            title="PlayStation 5"
                            description="Black and White version of the PS5 coming out on sale."
                        />
                        <ShopNow categoryId="gaming" />
                    </div>
                </article>

                <div className="flex flex-col gap-4 lg:gap-8">
                    {/* Women's collections */}
                    <article className="flex min-h-[220px] flex-1 flex-col justify-end gap-4 rounded bg-[#0d0d0d] p-6 lg:min-h-[284px]">
                        <CardText
                            title="Women’s Collections"
                            description="Featured woman collections that give you another vibe."
                        />
                        <ShopNow categoryId="womens-fashion" />
                    </article>

                    <div className="grid grid-cols-2 gap-4 lg:gap-[30px]">
                        {/* Speakers */}
                        <article className="relative h-[284px] overflow-clip rounded bg-black">
                            <span
                                className="absolute top-1/2 left-1/2 size-[196px] -translate-x-1/2 -translate-y-1/2"
                                aria-hidden="true"
                            >
                                <img
                                    src={glowSpeakers}
                                    alt=""
                                    className="absolute inset-[-153.06%] size-[406%] max-w-none"
                                />
                            </span>
                            <div className="absolute top-[31px] left-1/2 h-[222px] w-[210px] max-w-full -translate-x-1/2 overflow-clip">
                                <img
                                    src={echo}
                                    alt="Amazon Echo speakers"
                                    loading="lazy"
                                    className="absolute top-1/2 left-1/2 h-[221px] w-[190px] max-w-full -translate-x-1/2 -translate-y-1/2"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 flex flex-col gap-2 lg:left-6">
                                <CardText title="Speakers" description="Amazon wireless speakers" />
                                <ShopNow categoryId="electronics" />
                            </div>
                        </article>

                        {/* Perfume */}
                        <article className="relative h-[284px] overflow-clip rounded bg-black">
                            <span
                                className="absolute top-1/2 left-1/2 size-[238px] -translate-x-1/2 -translate-y-1/2"
                                aria-hidden="true"
                            >
                                <img
                                    src={glowPerfume}
                                    alt=""
                                    className="absolute inset-[-126.05%] size-[352%] max-w-none"
                                />
                            </span>
                            <div className="absolute top-[31px] left-1/2 h-[222px] w-[210px] max-w-full -translate-x-1/2 overflow-clip">
                                <img
                                    src={perfume}
                                    alt="Gucci Intense Oud perfume"
                                    loading="lazy"
                                    className="absolute top-1/2 left-1/2 h-[203px] w-[201px] max-w-full -translate-x-1/2 -translate-y-1/2"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 flex flex-col gap-2 lg:left-6">
                                <CardText title="Perfume" description="GUCCI INTENSE OUD EDP" />
                                <ShopNow categoryId="health-beauty" />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </Container>
    );
}
