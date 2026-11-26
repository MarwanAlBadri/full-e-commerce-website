import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/format";
import { calculateTotals } from "../../utils/pricing";

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4 border-b border-black/40 pb-4 last:border-0 last:pb-0">
            <dt>{label}</dt>
            <dd>{value}</dd>
        </div>
    );
}

export default function TotalsList() {
    const { subtotal, couponCode } = useCart();
    const { discount, total } = calculateTotals(subtotal, couponCode);

    return (
        <dl className="flex flex-col gap-4 text-mid leading-6">
            <Row label="Subtotal:" value={formatPrice(subtotal)} />
            {discount > 0 && (
                <Row label={`Discount (${couponCode}):`} value={`-${formatPrice(discount)}`} />
            )}
            <Row label="Shipping:" value="Free" />
            <Row label="Total:" value={formatPrice(total)} />
        </dl>
    );
}
