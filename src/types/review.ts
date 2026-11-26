export interface Review {
    id: string;
    productId: string;
    userId: string;
    author: string;
    rating: number;
    text: string;
    /** ISO date string. */
    createdAt: string;
}
