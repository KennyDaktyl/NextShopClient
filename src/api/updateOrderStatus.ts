import { fetchPostApiData } from "./fetchPostApiData";
import type { OrderStatusResponse } from "@/app/types";

export const updateOrderStatus = async ({
	status,
	orderId,
	checkoutSessionId,
}: {
	status: number;
	orderId: number;
	checkoutSessionId?: string;
}): Promise<void> => {
	const variables = {
		status: status,
		checkout_session_id: checkoutSessionId,
	};

	await fetchPostApiData<OrderStatusResponse, typeof variables>({
		query: `/api/orders/update-status/${orderId}/`,
		variables,
		cache: "force-cache",
		next: {
			tags: ["order-status"],
		},
	});
};
