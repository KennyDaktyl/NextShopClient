import { ArticlePath } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getArticlesPath = async () => {
	try {
		const response = await fetchGetApiData<ArticlePath[], {}>({
			query: "/api/articles/articles-path-list/",
			variables: {},
			cache: "no-cache",
			next: { tags: ["articles-path"] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
