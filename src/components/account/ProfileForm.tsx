import { useState } from "react";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { useAuth } from "../../hooks/useAuth";
import { useFormState } from "../../hooks/useFormState";
import type { User } from "../../types/user";
import { validateProfile } from "../../utils/validation";
import Button from "../ui/Button";
import TextField from "../ui/TextField";

function toFormValues(user: User) {
    const [firstName = "", ...rest] = user.name.split(" ");
    return {
        firstName,
        lastName: rest.join(" "),
        identifier: user.identifier,
        address: user.address ?? "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
}

export default function ProfileForm({ user }: { user: User }) {
    const { updateProfile } = useAuth();
    const { field, setValues, handleSubmit } = useFormState(toFormValues(user), validateProfile);
    const { error, isPending, run } = useAsyncAction();
    const [message, setMessage] = useState("");

    const save = handleSubmit((values) => {
        setMessage("");
        void run(async () => {
            await updateProfile({
                name: `${values.firstName} ${values.lastName}`.trim(),
                identifier: values.identifier,
                address: values.address,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            setValues((current) => ({
                ...current,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
            setMessage("Your changes are saved.");
        });
    });

    return (
        <form noValidate onSubmit={save} className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-primary">Edit Your Profile</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <TextField {...field("firstName")} label="First Name" autoComplete="given-name" />
                <TextField {...field("lastName")} label="Last Name" autoComplete="family-name" />
                <TextField
                    {...field("identifier")}
                    label="Email or Phone Number"
                    autoComplete="username"
                />
                <TextField {...field("address")} label="Address" autoComplete="street-address" />
            </div>
            <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-mid">Password Changes</legend>
                <TextField
                    {...field("currentPassword")}
                    label="Current Password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    {...field("newPassword")}
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                />
                <TextField
                    {...field("confirmPassword")}
                    label="Confirm New Password"
                    type="password"
                    autoComplete="new-password"
                />
            </fieldset>
            {error && (
                <p role="alert" className="text-small text-primary">
                    {error}
                </p>
            )}
            <p role="status" className="text-small">
                {message}
            </p>
            <div className="flex items-center justify-end gap-8">
                <button
                    type="button"
                    onClick={() => {
                        setValues(toFormValues(user));
                        setMessage("");
                    }}
                    className="cursor-pointer text-mid"
                >
                    Cancel
                </button>
                <Button type="submit" disabled={isPending}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
