/** Percentages describing how the source photo is cropped inside its frame (taken from Figma). */
export interface Crop {
    w: number;
    h: number;
    left: number;
    top: number;
}

export interface ProductImage {
    src: string;
    /** Visible photo frame in px, centred inside the 250px card image area. */
    frame: [width: number, height: number];
    crop?: Crop;
}

export type ProductTag = "flash-sale" | "best-selling" | "explore";

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    categoryIds: string[];
    price: number;
    oldPrice?: number;
    discountPercent?: number;
    rating: 3 | 4 | 4.5 | 5;
    reviewCount: number;
    images: [ProductImage, ...ProductImage[]];
    /** Hex values of the available colours. */
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
    isNew?: boolean;
    tags: ProductTag[];
}
