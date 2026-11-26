import { SESSION_KEYS, STORAGE_KEYS } from "../constants/storageKeys";
import { readJson, removeItem, writeJson } from "../lib/storage";
import type { Review } from "../types/review";

const readAll = () => readJson<Review[]>(STORAGE_KEYS.reviews, [], Array.isArray);

/** Newest first. */
export function getReviews(productId: string): Review[] {
    return readAll().filter((review) => review.productId === productId);
}

export function getReviewsByUser(userId: string): Review[] {
    return readAll().filter((review) => review.userId === userId);
}

export function addReview(input: Omit<Review, "id" | "createdAt">): Review {
    const review: Review = {
        ...input,
        text: input.text.trim(),
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    writeJson(STORAGE_KEYS.reviews, [review, ...readAll()]);
    return review;
}

/** The text a visitor typed before being sent to the log in page. */
interface ReviewDraft {
    productId: string;
    text: string;
    rating: number;
}

const session = () => sessionStorage;

export function saveReviewDraft(draft: ReviewDraft): void {
    writeJson(SESSION_KEYS.reviewDraft, draft, session);
}

export function readReviewDraft(productId: string): ReviewDraft | null {
    const draft = readJson<ReviewDraft | null>(SESSION_KEYS.reviewDraft, null, undefined, session);
    return draft?.productId === productId ? draft : null;
}

export function clearReviewDraft(): void {
    removeItem(SESSION_KEYS.reviewDraft, session);
}
