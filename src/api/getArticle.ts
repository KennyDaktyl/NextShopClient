import { ArticleResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

interface GetArticleParams {
	slug: string;
	[key: string]: unknown;
}

export const getArticleBySlug = async (slug: string) => {
	try {
		const response = await fetchGetApiData<ArticleResponse, GetArticleParams>({
			query: `/api/articles/${slug}/`,
			cache: "force-cache",
			variables: { slug },
			next: { tags: [`article-${slug}`] },
		});
		return response;
	} catch (error) {
		console.error("API Error:", error);
		return null;
	}
};
