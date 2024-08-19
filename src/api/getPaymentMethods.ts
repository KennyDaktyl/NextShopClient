import { fetchGetApiData } from "@/api/fetchApiData";
import { PaymentMethod } from "@/app/types";

type ApiResponse = {
	deliveryMethods: PaymentMethod[];
};

export const getPaymentMethods = async (sessionid: string) => {
	try {
		const response = await fetchGetApiData<ApiResponse, {}>({
			query: "/api/payments/payment-methods",
			variables: {},
			cache: "force-cache",
			next: { tags: ["payment-methods"] },
			sessionid,
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
