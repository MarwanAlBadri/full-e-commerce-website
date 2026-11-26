const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: false,
});

/** Formats a price the way the design writes it, e.g. `$1160`. */
export function formatPrice(value: number): string {
    return priceFormatter.format(value);
}

export function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString("en-US", { dateStyle: "medium" });
}
