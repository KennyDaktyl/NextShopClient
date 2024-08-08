import { ProductsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getProductsBySearch = async ({
	params,
}: {
	params: { page: string; search: string };
}) => {
	try {
		const response = await fetchGetApiData<ProductsResponse, { page: string; search: string }>({
			query: `/api/products/`,
			variables: params,
			cache: "no-cache",
		});
		return response ?? {};
	} catch (error) {
		console.error("API Error:", error);
		return {};
	}
};
