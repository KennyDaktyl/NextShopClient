import { UUID } from "crypto";
import { fetchPostApiData } from "./fetchPostApiData";
import type { CartResponse } from "@/app/types";

export const removeItem = async ({ itemId }: { itemId: UUID }): Promise<void> => {
	const variables = {
		item_id: itemId,
	};

	await fetchPostApiData<CartResponse, typeof variables>({
		query: "/api/carts/remove-item",
		variables,
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
};
