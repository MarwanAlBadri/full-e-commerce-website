import { useState, type KeyboardEvent } from "react";
import { useCart } from "../../hooks/useCart";
import Button from "../ui/Button";

/** Not a `<form>`, so it can sit inside the checkout form without submitting it. */
export default function CouponForm() {
    const { couponCode, applyCoupon } = useCart();
    const [code, setCode] = useState(couponCode ?? "");
    const [message, setMessage] = useState("");

    const apply = () => {
        setMessage(
            applyCoupon(code)
                ? "Coupon applied: 10% off."
                : "That coupon code isn't valid. Try SAVE10.",
        );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        apply();
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Coupon code"
                    placeholder="Coupon Code"
                    className="w-full min-w-0 rounded border border-black px-6 py-4 text-mid outline-none focus:ring-2 focus:ring-primary sm:w-[300px]"
                />
                <Button onClick={apply}>Apply Coupon</Button>
            </div>
            <p role="status" className="min-h-5 text-small">
                {message}
            </p>
        </div>
    );
}
