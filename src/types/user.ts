export interface User {
    id: string;
    name: string;
    /** Email address or phone number used to sign in. */
    identifier: string;
    address?: string;
}
