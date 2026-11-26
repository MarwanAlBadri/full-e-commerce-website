import { useState } from "react";
import type { ProductColor } from "../types/product";

/** The chosen colour name, starting with the first colour that is in stock. */
export function useColorSelection(colors?: ProductColor[]) {
    return useState(() => colors?.find((color) => color.inStock)?.name);
}
