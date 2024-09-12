import { ArticlesResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

interface GetArticlesParams {
	page: string;
	searchTerms?: string;
	[key: string]: unknown;
}

export const getArticlesList = async ({ params }: { params: GetArticlesParams }) => {
	try {
		const queryParams = new URLSearchParams({
			page: params.page,
			...(params.searchTerms ? { search: params.searchTerms } : {}),
		}).toString();

		const response = await fetchGetApiData<ArticlesResponse, GetArticlesParams>({
			query: `/api/articles/?${queryParams}`,
			variables: params,
			cache: "force-cache",
			next: { tags: ["articles"] },
		});

		return response ?? [];
	} catch (error) {
		console.error("API Error:", error);
		return [];
	}
};
