/**
 * Safe JSON access to web storage. Storage can be unavailable (private mode, quota) or hold
 * corrupted data, so reads fall back and writes fail silently.
 */
export function readJson<T>(
    key: string,
    fallback: T,
    isValid: (value: unknown) => boolean = () => true,
    storage: () => Storage = () => localStorage,
): T {
    try {
        const raw = storage().getItem(key);
        if (raw === null) return fallback;
        const value: unknown = JSON.parse(raw);
        return isValid(value) ? (value as T) : fallback;
    } catch {
        return fallback;
    }
}

export function writeJson(
    key: string,
    value: unknown,
    storage: () => Storage = () => localStorage,
): void {
    try {
        storage().setItem(key, JSON.stringify(value));
    } catch {
        // Nothing to do: the app keeps working with the in-memory state.
    }
}

export function removeItem(key: string, storage: () => Storage = () => localStorage): void {
    try {
        storage().removeItem(key);
    } catch {
        // Same as above.
    }
}
