"use server";
import { cookies } from "next/headers";
import { fetchPostApiData } from "@/api/fetchPostApiData";
import { revalidatePath, revalidateTag } from "next/cache";
import { CartResponse } from "@/app/types";

export async function addToCartAction(formData: FormData) {
    const productId = formData.get('product_id') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const variantId = formData.get('variant_id') as string | null;

    const cartId = cookies().get("cartId")?.value;
    let response: CartResponse;

    
    if (!cartId) {
        response = await fetchPostApiData<CartResponse, {
            product_id: string,
            quantity: number,
            variant_id: string | null,
        }>({
            query: "/api/carts/create",
            variables: {
                product_id: productId,
                quantity: quantity,
                variant_id: variantId,
            },
            token: cookies().get("token")?.value,
            
        });
    } else {
        response = await fetchPostApiData<CartResponse, {
            product_id: string,
            quantity: number,
            variant_id: string | null,
            cart_id: string | string 
        }>({
            query: "/api/carts/update",
            variables: {
                product_id: productId,
                quantity: quantity,
                variant_id: variantId,
                cart_id: cartId,
            },
            token: cookies().get("token")?.value,
        });
    }

    cookies().set("cartId", response.cart_id, {
        httpOnly: true,
        sameSite: "lax",
        // secure: true
    });
    revalidateTag("cart");
    revalidatePath("/");
}
