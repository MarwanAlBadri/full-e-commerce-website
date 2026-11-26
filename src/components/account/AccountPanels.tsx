import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getOrdersByUser } from "../../services/orderService";
import { getProductById } from "../../services/productService";
import { getReviewsByUser } from "../../services/reviewService";
import { formatDate, formatPrice } from "../../utils/format";
import Stars from "../ui/Stars";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-primary">{title}</h2>
            {children}
        </div>
    );
}

export function OrdersPanel({ userId }: { userId: string }) {
    const orders = getOrdersByUser(userId);

    return (
        <Panel title="My Orders">
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <li key={order.id} className="rounded border border-black/20 p-4">
                            <p className="flex flex-wrap justify-between gap-2 font-medium">
                                <span>{order.id}</span>
                                <span>{formatPrice(order.total)}</span>
                            </p>
                            <p className="text-small text-text-black/50">
                                {formatDate(order.createdAt)}
                            </p>
                            <ul className="mt-2 text-small">
                                {order.items.map((item) => (
                                    <li key={item.productId}>
                                        {item.name} × {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </Panel>
    );
}

export function ReviewsPanel({ userId }: { userId: string }) {
    const reviews = getReviewsByUser(userId);

    return (
        <Panel title="My Reviews">
            {reviews.length === 0 ? (
                <p>You haven't reviewed any products yet.</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {reviews.map((review) => (
                        <li key={review.id} className="flex flex-col gap-2">
                            <Link
                                to={ROUTES.product(review.productId)}
                                className="font-medium hover:text-primary"
                            >
                                {getProductById(review.productId)?.name ?? "Product"}
                            </Link>
                            <Stars value={review.rating} />
                            <p className="text-small break-words">{review.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </Panel>
    );
}

export function MessagePanel({ title, message }: { title: string; message: string }) {
    return (
        <Panel title={title}>
            <p>{message}</p>
        </Panel>
    );
}
