import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";
import * as reviewService from "../../services/reviewService";
import { formatDate } from "../../utils/format";
import { logInPathWithRedirect } from "../../utils/redirect";
import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import Stars from "../ui/Stars";

const DEFAULT_RATING = 5;
const MAX_LENGTH = 1000;

/** Mount with `key={productId}` so the state belongs to one product. */
export default function ProductReviews({ productId }: { productId: string }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(() => reviewService.getReviews(productId));
    const [draft] = useState(() => reviewService.readReviewDraft(productId));
    const [text, setText] = useState(draft?.text ?? "");
    const [rating, setRating] = useState(draft?.rating ?? DEFAULT_RATING);
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Only signed-in users can review: keep the draft and come back after logging in.
        if (!user) {
            reviewService.saveReviewDraft({ productId, text, rating });
            navigate(logInPathWithRedirect(ROUTES.product(productId)));
            return;
        }
        if (!text.trim()) {
            setError("Write a few words about the product before sending your review.");
            return;
        }

        const review = reviewService.addReview({
            productId,
            userId: user.id,
            author: user.name,
            rating,
            text,
        });
        reviewService.clearReviewDraft();
        setReviews((current) => [review, ...current]);
        setText("");
        setRating(DEFAULT_RATING);
    };

    return (
        <section aria-label="Reviews" className="flex flex-col gap-10">
            <SectionHeader label="Reviews" />

            <div className="grid gap-12 lg:grid-cols-2">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col items-start gap-4"
                >
                    <fieldset className="flex items-center gap-3">
                        <legend className="sr-only">Your rating</legend>
                        <span className="text-small" aria-hidden="true">
                            Your rating:
                        </span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label
                                    key={value}
                                    className="cursor-pointer px-0.5 focus-within:outline-2 focus-within:outline-primary"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={value}
                                        checked={rating === value}
                                        onChange={() => setRating(value)}
                                        className="sr-only"
                                    />
                                    <span className="sr-only">{value} stars</span>
                                    <span
                                        aria-hidden="true"
                                        className={cn(
                                            "text-xxl leading-none",
                                            value <= rating ? "text-star" : "text-black/25",
                                        )}
                                    >
                                        ★
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <textarea
                        data-testid={TEST_IDS.reviewText}
                        value={text}
                        maxLength={MAX_LENGTH}
                        onChange={(event) => {
                            setText(event.target.value);
                            setError("");
                        }}
                        aria-label="Your review"
                        placeholder="Share what you think about this product"
                        rows={5}
                        className="w-full rounded bg-secondary p-4 text-mid outline-none focus:ring-2 focus:ring-primary"
                    />
                    {error && (
                        <p role="alert" className="text-small text-primary">
                            {error}
                        </p>
                    )}
                    {!user && (
                        <p className="text-small text-text-black/60">
                            You need to log in to post a review.
                        </p>
                    )}
                    <Button type="submit" data-testid={TEST_IDS.reviewSubmit}>
                        Send Review
                    </Button>
                </form>

                {reviews.length === 0 ? (
                    <p className="text-mid text-text-black/60">
                        No reviews yet. Be the first to review this product.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-6">
                        {reviews.map((review) => (
                            <li
                                key={review.id}
                                data-testid={TEST_IDS.review}
                                className="flex flex-col gap-2 border-b border-black/10 pb-6"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="font-medium">{review.author}</p>
                                    <time
                                        dateTime={review.createdAt}
                                        className="text-small text-text-black/50"
                                    >
                                        {formatDate(review.createdAt)}
                                    </time>
                                </div>
                                <Stars value={review.rating} />
                                <p className="text-small leading-[21px] break-words whitespace-pre-line">
                                    {review.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
