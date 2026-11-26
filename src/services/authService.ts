import { STORAGE_KEYS } from "../constants/storageKeys";
import { readJson, removeItem, writeJson } from "../lib/storage";
import type { User } from "../types/user";

/**
 * Demo authentication that lives entirely in the browser (the project has no backend).
 * Passwords are never stored as plain text, but this is not a substitute for server-side auth.
 */
interface StoredUser extends User {
    passwordHash: string;
}

export type AuthErrorCode = "identifier-in-use" | "invalid-credentials" | "wrong-password";

const ERROR_MESSAGES: Record<AuthErrorCode, string> = {
    "identifier-in-use":
        "An account with this email or phone number already exists. Log in instead.",
    "invalid-credentials": "Incorrect email, phone number or password.",
    "wrong-password": "Your current password is incorrect.",
};

export class AuthError extends Error {
    code: AuthErrorCode;

    constructor(code: AuthErrorCode) {
        super(ERROR_MESSAGES[code]);
        this.name = "AuthError";
        this.code = code;
    }
}

const normalize = (identifier: string) => identifier.trim().toLowerCase();

async function hashPassword(password: string): Promise<string> {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(
        "",
    );
}

const readUsers = () => readJson<StoredUser[]>(STORAGE_KEYS.users, [], Array.isArray);
const writeUsers = (users: StoredUser[]) => writeJson(STORAGE_KEYS.users, users);

function toPublicUser({ id, name, identifier, address }: StoredUser): User {
    return { id, name, identifier, address };
}

const startSession = (userId: string) => writeJson(STORAGE_KEYS.session, userId);

export function getCurrentUser(): User | null {
    const userId = readJson<string | null>(STORAGE_KEYS.session, null);
    const user = readUsers().find((candidate) => candidate.id === userId);
    return user ? toPublicUser(user) : null;
}

export async function signUp(input: {
    name: string;
    identifier: string;
    password: string;
}): Promise<User> {
    const identifier = normalize(input.identifier);
    const passwordHash = await hashPassword(input.password);
    const users = readUsers();

    if (users.some((user) => user.identifier === identifier)) {
        throw new AuthError("identifier-in-use");
    }

    const user = { id: crypto.randomUUID(), name: input.name.trim(), identifier, passwordHash };
    writeUsers([...users, user]);
    startSession(user.id);
    return toPublicUser(user);
}

export async function logIn(input: { identifier: string; password: string }): Promise<User> {
    const identifier = normalize(input.identifier);
    const passwordHash = await hashPassword(input.password);
    const user = readUsers().find(
        (candidate) =>
            candidate.identifier === identifier && candidate.passwordHash === passwordHash,
    );

    if (!user) throw new AuthError("invalid-credentials");

    startSession(user.id);
    return toPublicUser(user);
}

export function logOut(): void {
    removeItem(STORAGE_KEYS.session);
}

export interface ProfileUpdate {
    name: string;
    identifier: string;
    address: string;
    currentPassword?: string;
    newPassword?: string;
}

export async function updateProfile(userId: string, update: ProfileUpdate): Promise<User> {
    const identifier = normalize(update.identifier);
    const currentHash = await hashPassword(update.currentPassword ?? "");
    const newHash = update.newPassword ? await hashPassword(update.newPassword) : null;
    const users = readUsers();
    const user = users.find((candidate) => candidate.id === userId);

    if (!user) throw new AuthError("invalid-credentials");
    if (users.some((other) => other.id !== userId && other.identifier === identifier)) {
        throw new AuthError("identifier-in-use");
    }
    if (newHash && currentHash !== user.passwordHash) throw new AuthError("wrong-password");

    const updated: StoredUser = {
        ...user,
        name: update.name.trim(),
        identifier,
        address: update.address.trim(),
        passwordHash: newHash ?? user.passwordHash,
    };
    writeUsers(users.map((candidate) => (candidate.id === userId ? updated : candidate)));
    return toPublicUser(updated);
}
