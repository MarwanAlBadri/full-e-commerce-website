import { useState } from "react";

/** Tracks the pending state and the error message of an async form action. */
export function useAsyncAction() {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    const run = async (action: () => Promise<void>) => {
        setError("");
        setIsPending(true);
        try {
            await action();
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Something went wrong. Try again.");
        } finally {
            setIsPending(false);
        }
    };

    return { error, isPending, run };
}
