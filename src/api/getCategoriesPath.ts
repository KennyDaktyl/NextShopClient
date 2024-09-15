import { CategoryPath } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getCategoriesPath = async () => {
	try {
		const response = await fetchGetApiData<CategoryPath[], {}>({
			query: "/api/categories/categories-path-list/",
			variables: {},
			cache: "no-store",
			next: { tags: ["categories-path"] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
