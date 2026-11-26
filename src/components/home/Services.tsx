import serviceBg from "../../assets/icons/svc-bg.svg";
import deliveryIcon from "../../assets/icons/svc-delivery.svg";
import supportIcon from "../../assets/icons/svc-support.svg";
import shieldIcon from "../../assets/icons/svc-shield.svg";
import Container from "../ui/Container";

const services = [
    {
        icon: deliveryIcon,
        title: "FREE AND FAST DELIVERY",
        text: "Free delivery for all orders over $140",
    },
    { icon: supportIcon, title: "24/7 CUSTOMER SERVICE", text: "Friendly 24/7 customer support" },
    { icon: shieldIcon, title: "MONEY BACK GUARANTEE", text: "We return money within 30 days" },
];

export default function Services() {
    return (
        <Container as="section" className="max-w-[1202px]">
            <ul className="grid gap-12 text-center sm:grid-cols-3 sm:gap-6 lg:flex lg:justify-center lg:gap-[88px]">
                {services.map(({ icon, title, text }) => (
                    <li key={title} className="flex flex-col items-center gap-6">
                        <span className="relative size-20">
                            <img src={serviceBg} alt="" className="absolute inset-0 size-full" />
                            <img src={icon} alt="" className="absolute inset-1/4 size-1/2" />
                        </span>
                        <div className="flex flex-col gap-2 text-text-black">
                            <h3 className="text-xl leading-7 font-semibold">{title}</h3>
                            <p className="text-small leading-[21px]">{text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
