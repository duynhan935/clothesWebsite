/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCartItems, getAllProductDetailsById } from "../services/api.services";
import type { CartItem } from "../components/Client/Cart"

export const fetchAndEnrichCart = async (): Promise<CartItem[]> => {
    const res = await getCartItems();
    const cartRaw = res.data;

    const enrichedItems: CartItem[] = await Promise.all(
        cartRaw.map(async (item: any) => {
            const productRes = await getAllProductDetailsById(item.productDetailsId);
            const productDetails = productRes.data;

            const firstImage = productDetails.images?.[0];
            const imageUrl = firstImage
                ? `data:${firstImage.imageType};base64,${firstImage.imageData}`
                : "https://via.placeholder.com/64";

            return {
                id: productDetails.id,
                quantity: item.quantity,
                img: imageUrl,
                name: productDetails.name || "Unnamed Product",
                price: productDetails.price || 0,
                color: productDetails.color || "N/A",
                stockQuantity: productDetails.quantity || 0,
                cartId: item.id,
                productId: productDetails.productId,
            };
        })
    );

    return enrichedItems;
};
