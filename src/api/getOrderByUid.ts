import { fetchGetApiData } from "./fetchApiData";
import { Order, ErrorResponse } from "@/app/types";

function isErrorResponse(response: any): response is ErrorResponse {
	return response && typeof response.status === "number";
}

export const getOrderDetails = async ({
	orderUid,
}: {
	orderUid: string;
}): Promise<Order | null> => {
	try {
		const response = await fetchGetApiData<Order | ErrorResponse, Record<string, unknown>>({
			query: `/api/orders/by-uid/${orderUid}/`,
			variables: {},
			cache: "no-cache",
			next: {},
		});

		if (isErrorResponse(response)) {
			console.error(`Error: ${response.status}, ${response.message || "Unknown error"}`);
			return null;
		}

		return response as Order;
	} catch (error) {
		console.error("API Error:", error);
		return null;
	}
};
