import { ProductsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getProductsList = async ({ params }: { params: { page: string } }) => {
	try {
		const response = await fetchGetApiData<ProductsResponse, { page: string }>({
			query: "/api/products/",
			variables: params,
			cache: "force-cache",
			next: { tags: ["products"] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
