import { useState } from "react";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import TextField from "../components/ui/TextField";
import { ROUTES } from "../constants/routes";
import { useFormState } from "../hooks/useFormState";
import { validateContact } from "../utils/validation";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };
const PHONE_ICON =
    "M5 4h4l2 5-2.5 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z";
const MAIL_ICON = "M4 6h16v12H4zM4 7l8 6 8-6";

function ContactBlock({ title, icon, lines }: { title: string; icon: string; lines: string[] }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                        viewBox="0 0 24 24"
                        className="size-5 fill-none stroke-current"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d={icon} />
                    </svg>
                </span>
                <h2 className="text-mid font-medium">{title}</h2>
            </div>
            {lines.map((line) => (
                <p key={line} className="text-small leading-[21px] break-words">
                    {line}
                </p>
            ))}
        </div>
    );
}

export default function Contact() {
    const { field, setValues, handleSubmit } = useFormState(EMPTY_FORM, validateContact);
    const [isSent, setIsSent] = useState(false);
    const { error: messageError, ...messageProps } = field("message");

    const send = handleSubmit(() => {
        setValues(EMPTY_FORM);
        setIsSent(true);
    });

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Contact" }]} />
            <h1 className="sr-only">Contact us</h1>

            <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[340px_minmax(0,1fr)]">
                <div className="flex flex-col gap-8 divide-y divide-black/40 rounded px-8 py-10 shadow-[0_1px_13px_rgba(0,0,0,0.08)] [&>*+*]:pt-8">
                    <ContactBlock
                        title="Call To Us"
                        icon={PHONE_ICON}
                        lines={["We are available 24/7, 7 days a week.", "Phone: +8801611112222"]}
                    />
                    <ContactBlock
                        title="Write To US"
                        icon={MAIL_ICON}
                        lines={[
                            "Fill out our form and we will contact you within 24 hours.",
                            "Emails: customer@exclusive.com",
                            "Emails: support@exclusive.com",
                        ]}
                    />
                </div>

                <form
                    noValidate
                    onSubmit={send}
                    className="flex flex-col gap-8 rounded p-6 shadow-[0_1px_13px_rgba(0,0,0,0.08)] md:px-8 md:py-10"
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <TextField
                            {...field("name")}
                            label="Your Name"
                            autoComplete="name"
                            required
                        />
                        <TextField
                            {...field("email")}
                            label="Your Email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                        <TextField
                            {...field("phone")}
                            label="Your Phone"
                            type="tel"
                            autoComplete="tel"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <textarea
                            {...messageProps}
                            aria-label="Your Message"
                            aria-invalid={Boolean(messageError)}
                            placeholder="Your Message"
                            rows={8}
                            className="w-full rounded bg-secondary p-4 text-mid outline-none focus:ring-2 focus:ring-primary"
                        />
                        {messageError && (
                            <p role="alert" className="text-small text-primary">
                                {messageError}
                            </p>
                        )}
                    </div>
                    <p role="status" className="text-small">
                        {isSent &&
                            "Message received. This demo store doesn't send emails, so nothing left your browser."}
                    </p>
                    <Button type="submit" className="self-end">
                        Send Message
                    </Button>
                </form>
            </div>
        </Container>
    );
}
