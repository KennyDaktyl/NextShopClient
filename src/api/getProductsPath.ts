import { ProductPath } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getProductsPath = async () => {
	try {
		const response = await fetchGetApiData<ProductPath[], {}>({
			query: "/api/products/products-list-path/",
			variables: {},
			cache: "no-cache",
			next: { tags: ["products-path"] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
