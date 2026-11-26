import { useState } from "react";
import CartRow, { cartColumns } from "../components/cart/CartRow";
import CouponForm from "../components/cart/CouponForm";
import TotalsList from "../components/cart/TotalsList";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import { ROUTES } from "../constants/routes";
import { useCart } from "../hooks/useCart";

export default function Cart() {
    const { lines } = useCart();
    const [message, setMessage] = useState("");

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Cart" }]} />
            <h1 className="sr-only">Shopping cart</h1>

            {lines.length === 0 ? (
                <EmptyState
                    title="Your cart is empty"
                    message="Add a product to your cart and it will show up here."
                />
            ) : (
                <>
                    <div
                        aria-hidden="true"
                        className={`hidden gap-4 rounded px-10 py-6 shadow-[0_1px_13px_rgba(0,0,0,0.08)] md:grid ${cartColumns}`}
                    >
                        <span>Product</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span className="w-24 text-right">Subtotal</span>
                    </div>
                    <ul className="mt-10 flex flex-col gap-10">
                        {lines.map((line) => (
                            <CartRow key={line.product.id} line={line} />
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <Button to={ROUTES.home} variant="outline">
                            Return To Shop
                        </Button>
                        {/* Quantities save as they change; this button confirms it. */}
                        <Button
                            variant="outline"
                            onClick={() => setMessage("Your cart is up to date.")}
                        >
                            Update Cart
                        </Button>
                    </div>
                    <p role="status" className="mt-2 text-right text-small">
                        {message}
                    </p>

                    <div className="mt-10 flex flex-col items-start justify-between gap-10 lg:flex-row">
                        <div className="w-full lg:w-auto">
                            <CouponForm />
                        </div>
                        <section className="w-full rounded border-[1.5px] border-black px-6 py-8 lg:w-[470px]">
                            <h2 className="mb-6 text-xl font-medium">Cart Total</h2>
                            <TotalsList />
                            <div className="mt-4 flex justify-center">
                                <Button to={ROUTES.checkout}>Process to checkout</Button>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </Container>
    );
}
