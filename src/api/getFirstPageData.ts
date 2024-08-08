// getMenuItems.ts
import { FirstPageDataResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getFirstPageData = async (): Promise<FirstPageDataResponse> => {
	try {
		const response = await fetchGetApiData<FirstPageDataResponse, {}>({
			query: `/api/front/first-page`,
			variables: {},
			cache: "force-cache",
			next: { tags: [`first-page`] },
		});

		if ("categories" in response) {
			return { categories: response.categories, heros: response.heros };
		} else {
			throw new Error("Unexpected API response format");
		}
	} catch (error) {
		console.error("API Error:", error);
		return { categories: [], heros: [] };
	}
};
