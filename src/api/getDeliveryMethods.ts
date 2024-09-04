import { fetchGetApiData } from "@/api/fetchApiData";
import { DeliveryMethod } from "@/app/types";

type ApiResponse = {
	deliveryMethods: DeliveryMethod[];
};

export const getDeliveryMethods = async (sessionid: string) => {
	try {
		const response = await fetchGetApiData<ApiResponse, {}>({
			query: "/api/deliveries/delivery-methods",
			variables: {},
			cache: "no-store",
			next: { tags: ["delivery-methods"] },
			sessionid,
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
