import { CategoryMetaData } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

const defaultCategoryMetaData: CategoryMetaData = {
	name: "",
	description: "",
};

export const getCategoryMetaData = async ({
	currentCategorySlug,
}: {
	currentCategorySlug: string;
}): Promise<CategoryMetaData> => {
	try {
		const response = await fetchGetApiData<CategoryMetaData, {}>({
			query: `/api/categories/category-meta/${currentCategorySlug}/`,
			variables: {},
			cache: "force-cache",
			next: { tags: ["category-meta"] },
		});
		if ("status" in response) {
			return defaultCategoryMetaData;
		}
		return response;
	} catch (error) {
		console.error("API Error:", error);
		return defaultCategoryMetaData;
	}
};
