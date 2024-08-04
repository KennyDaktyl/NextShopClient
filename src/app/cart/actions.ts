"use server";
import { cookies } from "next/headers";
import { fetchPostApiData } from "@/api/fetchPostApiData";
import { revalidatePath, revalidateTag } from "next/cache";
import { UUID } from "crypto";
import { updateCartItemQty } from "@/api/updateCartItemQty";
import { CartResponse } from "@/app/types";
import { removeCart } from "@/api/removeCart";
import { removeItem } from "@/api/removeItemFromCart";

export async function addToCartAction(
	formData: FormData,
): Promise<{ success: boolean; message?: string }> {
	const productId = formData.get("product_id") as string;
	const quantity = parseInt(formData.get("quantity") as string);
	const variantId = formData.get("variant_id") as string | null;

	const cartId = cookies().get("cartId")?.value;
	let response: CartResponse;

	try {
		if (!cartId) {
			response = await fetchPostApiData<
				CartResponse,
				{
					product_id: string;
					quantity: number;
					variant_id: string | null;
				}
			>({
				query: "/api/carts/create",
				variables: {
					product_id: productId,
					quantity: quantity,
					variant_id: variantId,
				},
				token: cookies().get("token")?.value,
			});
		} else {
			response = await fetchPostApiData<
				CartResponse,
				{
					product_id: string;
					quantity: number;
					variant_id: string | null;
					cart_id: string;
				}
			>({
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
		return { success: true };
	} catch (error: unknown) {
		console.error("Error in addToCartAction:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred while adding to cart";
		return { success: false, message: errorMessage };
	}
}

export async function removeCartAction() {
	await removeCart();
	cookies().set("cartId", "", { maxAge: 0 });
	revalidatePath("/cart");
	revalidatePath("/");
}

export const changeItemQuantity = async ({
	itemId,
	quantity,
}: {
	itemId: UUID;
	quantity: number;
}): Promise<void> => {
	await updateCartItemQty({ itemId, quantity });
	revalidateTag("cart");
	revalidatePath("/cart");
};

export const removeItemAction = async ({ itemId }: { itemId: UUID }): Promise<void> => {
	await removeItem({ itemId });
	revalidateTag("cart");
	revalidatePath("/cart");
};
