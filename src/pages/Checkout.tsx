import { useState } from "react";
import { Link } from "react-router-dom";
import CouponForm from "../components/cart/CouponForm";
import TotalsList from "../components/cart/TotalsList";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import ProductPhoto from "../components/ui/ProductPhoto";
import TextField from "../components/ui/TextField";
import { ROUTES } from "../constants/routes";
import { TEST_IDS } from "../constants/testIds";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useFormState } from "../hooks/useFormState";
import * as orderService from "../services/orderService";
import type { Order, PaymentMethod } from "../types/order";
import type { User } from "../types/user";
import { formatPrice } from "../utils/format";
import { calculateTotals } from "../utils/pricing";
import { isEmail, validateBilling, type BillingValues } from "../utils/validation";

const billingFields = [
    { name: "firstName", label: "First Name", autoComplete: "given-name", required: true },
    { name: "companyName", label: "Company Name", autoComplete: "organization" },
    {
        name: "streetAddress",
        label: "Street Address",
        autoComplete: "address-line1",
        required: true,
    },
    {
        name: "apartment",
        label: "Apartment, floor, etc. (optional)",
        autoComplete: "address-line2",
    },
    { name: "city", label: "Town/City", autoComplete: "address-level2", required: true },
    { name: "phone", label: "Phone Number", autoComplete: "tel", type: "tel", required: true },
    { name: "email", label: "Email Address", autoComplete: "email", type: "email", required: true },
] as const;

const paymentOptions: { value: PaymentMethod; label: string }[] = [
    { value: "bank", label: "Bank" },
    { value: "cash", label: "Cash on delivery" },
];

/** Saved details win; otherwise prefill what the account already knows. */
function getInitialBilling(user: User | null): BillingValues {
    const saved = orderService.readSavedBilling();
    if (saved) return saved;

    const identifier = user?.identifier ?? "";
    return {
        firstName: user?.name.split(" ")[0] ?? "",
        companyName: "",
        streetAddress: user?.address ?? "",
        apartment: "",
        city: "",
        phone: "",
        email: isEmail(identifier) ? identifier : "",
    };
}

function OrderSuccess({ order }: { order: Order }) {
    return (
        <div
            data-testid={TEST_IDS.orderSuccess}
            role="status"
            className="flex flex-col items-center gap-6 py-16 text-center"
        >
            <span className="flex size-20 items-center justify-center rounded-full bg-[#00aa44] text-[40px] text-white">
                ✓
            </span>
            <h1 className="font-inter text-heading-small font-semibold">Order placed</h1>
            <p className="max-w-[460px] text-mid leading-6">
                Thank you, {order.billing.firstName}. Your order <strong>{order.id}</strong> for{" "}
                {formatPrice(order.total)} has been received. This is a demo store, so nothing was
                charged.
            </p>
            <Button to={ROUTES.home}>Continue shopping</Button>
        </div>
    );
}

export default function Checkout() {
    const { user } = useAuth();
    const { lines, subtotal, couponCode, clearCart } = useCart();
    const [initialBilling] = useState(() => getInitialBilling(user));
    const { field, handleSubmit } = useFormState(initialBilling, validateBilling);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [shouldSave, setShouldSave] = useState(true);
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
    const [cartError, setCartError] = useState("");

    const placeOrder = (billing: BillingValues) => {
        if (!orderService.canPlaceOrder(lines)) {
            setCartError("Your cart is empty. Add a product before placing the order.");
            return;
        }
        const order = orderService.createOrder({
            userId: user?.id ?? null,
            items: lines.map(({ product, quantity }) => ({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
            })),
            total: calculateTotals(subtotal, couponCode).total,
            paymentMethod,
            billing,
        });
        orderService.saveBilling(shouldSave ? billing : null);
        clearCart();
        setPlacedOrder(order);
        window.scrollTo({ top: 0 });
    };

    if (placedOrder) {
        return (
            <Container className="pb-16">
                <OrderSuccess order={placedOrder} />
            </Container>
        );
    }

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs
                items={[
                    { label: "Home", to: ROUTES.home },
                    { label: "Cart", to: ROUTES.cart },
                    { label: "CheckOut" },
                ]}
            />
            <h1 className="mb-10 font-inter text-heading-small font-medium tracking-[1.44px]">
                Billing Details
            </h1>

            {lines.length === 0 && (
                <p className="mb-8 rounded border border-primary p-4 text-mid">
                    Your cart is empty.{" "}
                    <Link to={ROUTES.home} className="font-medium text-primary underline">
                        Return To Shop
                    </Link>
                </p>
            )}

            <form
                data-testid={TEST_IDS.checkoutForm}
                noValidate
                onSubmit={handleSubmit(placeOrder)}
                className="grid grid-cols-1 gap-12 lg:grid-cols-[470px_minmax(0,1fr)] lg:gap-[170px]"
            >
                <div className="flex flex-col gap-8">
                    {billingFields.map(({ name, ...props }) => (
                        <TextField key={name} {...props} {...field(name)} />
                    ))}
                    <label className="flex cursor-pointer items-center gap-4 text-mid">
                        <input
                            type="checkbox"
                            checked={shouldSave}
                            onChange={(event) => setShouldSave(event.target.checked)}
                            className="size-5 accent-primary"
                        />
                        Save this information for faster check-out next time
                    </label>
                </div>

                <div className="flex flex-col gap-8">
                    <ul className="flex flex-col gap-8">
                        {lines.map(({ product, quantity, total }) => (
                            <li key={product.id} className="flex items-center gap-6">
                                <span className="flex size-14 shrink-0 items-center justify-center">
                                    <ProductPhoto image={product.images[0]} alt="" scale={0.28} />
                                </span>
                                <span className="min-w-0 flex-1">
                                    {product.name} × {quantity}
                                </span>
                                <span>{formatPrice(total)}</span>
                            </li>
                        ))}
                    </ul>

                    <TotalsList />

                    <fieldset className="flex flex-col gap-4">
                        <legend className="sr-only">Payment method</legend>
                        {paymentOptions.map(({ value, label }) => (
                            <label key={value} className="flex cursor-pointer items-center gap-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={value}
                                    checked={paymentMethod === value}
                                    onChange={() => setPaymentMethod(value)}
                                    className="size-5 accent-black"
                                />
                                {label}
                            </label>
                        ))}
                    </fieldset>

                    <CouponForm />

                    {cartError && lines.length === 0 && (
                        <p role="alert" className="text-small text-primary">
                            {cartError}
                        </p>
                    )}
                    <Button type="submit" data-testid={TEST_IDS.placeOrder} className="self-start">
                        Place Order
                    </Button>
                </div>
            </form>
        </Container>
    );
}
