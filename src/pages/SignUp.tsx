import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import googleIcon from "../assets/icons/google.svg";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import { ROUTES } from "../constants/routes";
import { TEST_IDS } from "../constants/testIds";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useAuth } from "../hooks/useAuth";
import { useFormState } from "../hooks/useFormState";
import { validateSignUp } from "../utils/validation";

export default function SignUp() {
    const { signUp } = useAuth();
    const [searchParams] = useSearchParams();
    const { field, handleSubmit } = useFormState(
        { name: "", identifier: "", password: "" },
        validateSignUp,
    );
    const { error, isPending, run } = useAsyncAction();
    const [notice, setNotice] = useState("");

    return (
        <AuthLayout title="Create an account">
            <form
                data-testid={TEST_IDS.signUpForm}
                noValidate
                className="mt-12 flex flex-col gap-10"
                // `GuestOnly` redirects as soon as the account is created.
                onSubmit={handleSubmit((values) => run(() => signUp(values)))}
            >
                <div className="flex flex-col gap-10">
                    <TextField
                        {...field("name")}
                        variant="underline"
                        label="Name"
                        autoComplete="name"
                        required
                    />
                    <TextField
                        {...field("identifier")}
                        variant="underline"
                        label="Email or Phone Number"
                        autoComplete="username"
                        required
                    />
                    <TextField
                        {...field("password")}
                        variant="underline"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {error && (
                        <p role="alert" className="text-small text-primary">
                            {error}
                        </p>
                    )}
                    <Button type="submit" disabled={isPending} className="w-full px-0">
                        Create Account
                    </Button>
                    <button
                        type="button"
                        onClick={() =>
                            setNotice("Google sign-up isn't available yet. Use the form above.")
                        }
                        className="flex w-full cursor-pointer items-center justify-center gap-4 rounded border border-black/40 py-4 text-mid leading-6 hover:bg-secondary"
                    >
                        <img src={googleIcon} alt="" className="size-6" />
                        Sign up with Google
                    </button>
                    {notice && (
                        <p role="status" className="text-small text-text-black/70">
                            {notice}
                        </p>
                    )}
                </div>
            </form>

            <p className="mt-8 flex items-center justify-center gap-4 text-mid leading-6">
                <span className="opacity-70">Already have account?</span>
                <Link
                    to={{ pathname: ROUTES.logIn, search: searchParams.toString() }}
                    className="border-b border-black/40 pb-1 font-medium opacity-70"
                >
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
