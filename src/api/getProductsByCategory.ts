import { ProductsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getProductsByCategory = async ({
	categorySlug,
	params,
}: {
	categorySlug: string;
	params: { page: string };
}) => {
	try {
		const response = await fetchGetApiData<ProductsResponse, { page: string }>({
			query: `/api/products/category/${categorySlug}/`,
			variables: params,
			cache: "force-cache",
			next: { tags: [`products-${categorySlug}`] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
