import { fetchGetApiData } from "./fetchApiData";
import { ProductDetailsResponse } from "@/app/types";

export const getProductDetails = async ({
	productSlug,
}: {
	productSlug: string;
}): Promise<ProductDetailsResponse | null> => {
	try {
		const response = await fetchGetApiData<ProductDetailsResponse, {}>({
			query: `/api/products/${productSlug}/`,
			variables: {},
			cache: "force-cache",
			next: { tags: [`product-${productSlug}`] },
		});
		if ("status" in response) {
			return null;
		}
		return response;
	} catch (error) {
		console.error("API Error:", error);
		return null;
	}
};
