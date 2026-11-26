import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import { ROUTES } from "../constants/routes";
import { TEST_IDS } from "../constants/testIds";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useAuth } from "../hooks/useAuth";
import { useFormState } from "../hooks/useFormState";
import { validateLogIn } from "../utils/validation";

export default function Login() {
    const { logIn } = useAuth();
    const [searchParams] = useSearchParams();
    const { field, handleSubmit } = useFormState({ identifier: "", password: "" }, validateLogIn);
    const { error, isPending, run } = useAsyncAction();
    const [notice, setNotice] = useState("");

    return (
        <AuthLayout title="Log in to Exclusive">
            <form
                data-testid={TEST_IDS.logInForm}
                noValidate
                className="mt-12 flex flex-col gap-10"
                // `GuestOnly` redirects as soon as the user is signed in.
                onSubmit={handleSubmit((values) => run(() => logIn(values)))}
            >
                <div className="flex flex-col gap-10">
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
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && (
                    <p role="alert" className="text-small text-primary">
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <Button type="submit" disabled={isPending}>
                        Log In
                    </Button>
                    <button
                        type="button"
                        onClick={() =>
                            setNotice(
                                "Password reset emails aren't available in this demo store. Create a new account to continue.",
                            )
                        }
                        className="cursor-pointer text-mid leading-6 text-primary"
                    >
                        Forget Password?
                    </button>
                </div>
                {notice && (
                    <p role="status" className="text-small text-text-black/70">
                        {notice}
                    </p>
                )}
            </form>

            <p className="mt-8 flex items-center justify-center gap-4 text-mid leading-6">
                <span className="opacity-70">Don’t have an account?</span>
                {/* The query string keeps the page the visitor was heading to. */}
                <Link
                    to={{ pathname: ROUTES.signUp, search: searchParams.toString() }}
                    className="border-b border-black/40 pb-1 font-medium opacity-70"
                >
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
}
