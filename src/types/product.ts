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

export interface ProductColor {
    name: string;
    hex: string;
    /** A sold-out colour is shown crossed out and cannot be chosen. */
    inStock: boolean;
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
    colors?: ProductColor[];
    sizes?: string[];
    inStock: boolean;
    isNew?: boolean;
    tags: ProductTag[];
}
