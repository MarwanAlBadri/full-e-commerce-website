/** Maps a field name to the message shown under it. An empty object means the form is valid. */
export type FormErrors<Values> = Partial<Record<keyof Values, string>>;

export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?\d{8,15}$/;

export const isEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

export const isPhone = (value: string) => PHONE_PATTERN.test(value.replace(/[\s()-]/g, ""));

function identifierError(identifier: string): string | undefined {
    if (!identifier.trim()) return "Enter your email or phone number.";
    if (!isEmail(identifier) && !isPhone(identifier)) {
        return "Enter a valid email (name@example.com) or a phone number with 8 to 15 digits.";
    }
    return undefined;
}

/** Drops the keys that have no message, so callers can simply count the keys. */
function compact<Values>(errors: FormErrors<Values>): FormErrors<Values> {
    return Object.fromEntries(
        Object.entries(errors).filter(([, message]) => Boolean(message)),
    ) as FormErrors<Values>;
}

export const hasErrors = (errors: object) => Object.keys(errors).length > 0;

export interface LogInValues {
    identifier: string;
    password: string;
}

export interface SignUpValues extends LogInValues {
    name: string;
}

export function validateLogIn({ identifier, password }: LogInValues) {
    return compact<LogInValues>({
        identifier: identifierError(identifier),
        password: password ? undefined : "Enter your password.",
    });
}

export function validateSignUp({ name, identifier, password }: SignUpValues) {
    return compact<SignUpValues>({
        name: name.trim() ? undefined : "Enter your name.",
        identifier: identifierError(identifier),
        password:
            password.length >= MIN_PASSWORD_LENGTH
                ? undefined
                : `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
    });
}

export interface BillingValues {
    firstName: string;
    companyName: string;
    streetAddress: string;
    apartment: string;
    city: string;
    phone: string;
    email: string;
}

export function validateBilling(values: BillingValues) {
    const required = (value: string, message: string) => (value.trim() ? undefined : message);

    return compact<BillingValues>({
        firstName: required(values.firstName, "Enter your first name."),
        streetAddress: required(values.streetAddress, "Enter your street address."),
        city: required(values.city, "Enter your town or city."),
        phone:
            values.phone.replace(/\D/g, "").length >= 7
                ? undefined
                : "Enter a phone number with at least 7 digits.",
        email: isEmail(values.email)
            ? undefined
            : "Enter a valid email, for example name@example.com.",
    });
}

export interface ContactValues {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export function validateContact(values: ContactValues) {
    return compact<ContactValues>({
        name: values.name.trim() ? undefined : "Enter your name.",
        email: isEmail(values.email) ? undefined : "Enter a valid email.",
        phone: values.phone.replace(/\D/g, "").length >= 7 ? undefined : "Enter your phone number.",
        message: values.message.trim() ? undefined : "Write your message.",
    });
}

export interface ProfileValues {
    firstName: string;
    lastName: string;
    identifier: string;
    address: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export function validateProfile(values: ProfileValues) {
    const wantsNewPassword = Boolean(values.newPassword || values.confirmPassword);
    const isTooShort = values.newPassword.length < MIN_PASSWORD_LENGTH;

    return compact<ProfileValues>({
        firstName: values.firstName.trim() ? undefined : "Enter your first name.",
        identifier: identifierError(values.identifier),
        currentPassword:
            wantsNewPassword && !values.currentPassword
                ? "Enter your current password to set a new one."
                : undefined,
        newPassword:
            wantsNewPassword && isTooShort
                ? `Use at least ${MIN_PASSWORD_LENGTH} characters.`
                : undefined,
        confirmPassword:
            wantsNewPassword && values.confirmPassword !== values.newPassword
                ? "The passwords don't match."
                : undefined,
    });
}
