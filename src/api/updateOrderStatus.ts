import { UUID } from "crypto";
import { fetchPostApiData } from "./fetchPostApiData";
import type { OrderStatusResponse } from "@/app/types";

export const updateOrderStatus = async ({
	status,
	orderUid,
	checkoutSessionId,
}: {
	status: number;
	orderUid: string;
	checkoutSessionId?: string;
}): Promise<void> => {
	const variables = {
		status: status,
		checkout_session_id: checkoutSessionId,
	};

	await fetchPostApiData<OrderStatusResponse, typeof variables>({
		query: `/api/orders/update-status/${orderUid}/`,
		variables,
		cache: "force-cache",
		next: {
			tags: ["order-status"],
		},
	});
};
