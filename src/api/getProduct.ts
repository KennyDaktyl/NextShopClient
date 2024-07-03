import { fetchGetApiData } from "./fetchApiData";
import { ProductDetails } from "@/app/types";

export const getProductDetails = async ({
	productSlug,
}: {
	productSlug: string;
}): Promise<ProductDetails | null> => {
	try {
		const response = await fetchGetApiData<ProductDetails, {}>({
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
