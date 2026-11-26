import { Link } from "react-router-dom";
import send from "../../assets/icons/send.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import copyright from "../../assets/icons/copyright.svg";
import footerLine from "../../assets/icons/footer-line.svg";
import qrcode from "../../assets/images/qrcode.png";
import googlePlay from "../../assets/images/googleplay.webp";
import appStore from "../../assets/images/appstore.png";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";

const columnTitle = "text-xl leading-7 font-medium";
const columnList = "flex flex-col gap-4 text-mid leading-6";

export default function Footer() {
    return (
        <footer className="bg-black text-heading-white">
            <Container className="grid grid-cols-1 gap-10 pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:justify-between xl:pt-20 xl:pb-[60px]">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6">
                        <span className="font-inter text-xxl leading-6 font-bold tracking-[0.72px]">
                            Exclusive
                        </span>
                        <p className={columnTitle}>Subscribe</p>
                        <p className="text-mid leading-6">Get 10% off your first order</p>
                    </div>
                    <label className="flex w-[217px] items-center gap-8 rounded border-[1.5px] border-heading-white py-3 pl-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-[130px] bg-transparent text-mid leading-6 outline-none placeholder:text-heading-white/40"
                        />
                        <img src={send} alt="Send" className="size-6" />
                    </label>
                </div>

                <div className="flex flex-col gap-6">
                    <p className={columnTitle}>Support</p>
                    <div className={columnList}>
                        <p className="w-[175px]">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                        <p>exclusive@gmail.com</p>
                        <p>+88015-88888-9999</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <p className={columnTitle}>Account</p>
                    <div className={columnList}>
                        <Link to={ROUTES.account}>My Account</Link>
                        <Link to={ROUTES.logIn}>Login / Register</Link>
                        <Link to={ROUTES.cart}>Cart</Link>
                        <Link to={ROUTES.wishlist}>Wishlist</Link>
                        <Link to={ROUTES.home}>Shop</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <p className={columnTitle}>Quick Link</p>
                    <div className={columnList}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms Of Use</a>
                        <a href="#">FAQ</a>
                        <Link to={ROUTES.contact}>Contact</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <p className={columnTitle}>Download App</p>
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] leading-[18px] font-medium opacity-70">
                                Save $3 with App New User Only
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="size-20 border-[2.5px] border-white bg-black">
                                    <img
                                        src={qrcode}
                                        alt="QR code to download the app"
                                        className="size-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <a
                                        href="#"
                                        className="relative block h-10 w-[110px] overflow-hidden bg-[#030406]"
                                    >
                                        <span className="absolute top-[5px] left-[3px] block h-[30px] w-[104px] overflow-hidden rounded border-[0.6px] border-heading-white">
                                            <img
                                                src={googlePlay}
                                                alt="Get it on Google Play"
                                                className="absolute top-[-151.09%] left-[-6.75%] h-[402.19%] w-[113.38%] max-w-none"
                                            />
                                        </span>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative block h-10 w-[110px] overflow-hidden bg-black"
                                    >
                                        <span className="absolute top-[3px] left-[3px] block h-[34px] w-[104px] overflow-hidden rounded border-[0.6px] border-white">
                                            <img
                                                src={appStore}
                                                alt="Download on the App Store"
                                                className="absolute top-[-105.71%] left-[-0.96%] h-[311.42%] w-[101.92%] max-w-none"
                                            />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <img src={facebook} alt="Facebook" className="size-6" />
                        <span className="relative block size-6 overflow-clip">
                            <img
                                src={twitter}
                                alt="Twitter"
                                className="absolute top-0 left-[-20.83%] block h-full w-[112.74%] max-w-none"
                            />
                        </span>
                        <span className="relative block size-6 overflow-clip">
                            <img
                                src={instagram}
                                alt="Instagram"
                                className="absolute inset-[8.33%] block h-3/4 w-3/4 max-w-none"
                            />
                        </span>
                        <img src={linkedin} alt="LinkedIn" className="size-6" />
                    </div>
                </div>
            </Container>

            <div className="flex flex-col items-center gap-4 pb-4 opacity-40">
                <img src={footerLine} alt="" className="h-px w-full" />
                <p className="flex items-center gap-1.5 text-mid leading-6 text-white opacity-60">
                    <img src={copyright} alt="" className="size-5" />
                    Copyright Rimel 2022. All right reserved
                </p>
            </div>
        </footer>
    );
}
