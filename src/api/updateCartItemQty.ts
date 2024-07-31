import { UUID } from "crypto";
import { fetchPostApiData } from "./fetchPostApiData";
import type { CartResponse } from "@/app/types";

export const updateCartItemQty = async ({
	itemId,
	quantity,
}: {
	itemId: UUID;
	quantity: number;
}): Promise<void> => {
	const variables = {
		item_id: itemId,
		quantity: quantity,
	};

	await fetchPostApiData<CartResponse, typeof variables>({
		query: "/api/carts/update-item-qty",
		variables,
		cache: "force-cache",
		next: {
			tags: ["cart"],
		},
	});
};
