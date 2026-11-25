import { Link } from "react-router-dom";
import AuthLayout, { authInputClass } from "../components/auth/AuthLayout";
import googleIcon from "../assets/icons/google.svg";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";

export default function SignUp() {
    return (
        <AuthLayout>
            <div className="flex flex-col gap-6">
                <h1 className="font-inter text-[30px] leading-[30px] font-medium tracking-[1.44px] md:text-heading-small">
                    Create an account
                </h1>
                <p className="text-mid leading-6">Enter your details below</p>
            </div>

            <form className="mt-12 flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-10">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                        required
                        className={authInputClass}
                    />
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Email or Phone Number"
                        autoComplete="username"
                        required
                        className={authInputClass}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                        className={authInputClass}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <Button type="submit" className="w-full px-0">
                        Create Account
                    </Button>
                    <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center gap-4 rounded border border-black/40 py-4 text-mid leading-6 hover:bg-secondary"
                    >
                        <img src={googleIcon} alt="" className="size-6" />
                        Sign up with Google
                    </button>
                </div>
            </form>

            <p className="mt-8 flex items-center justify-center gap-4 text-mid leading-6">
                <span className="opacity-70">Already have account?</span>
                <Link
                    to={ROUTES.logIn}
                    className="border-b border-black/40 pb-1 font-medium opacity-70"
                >
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
