// getMenuItems.ts
import { MenuItemsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

const defaultMenuItemsResponse: MenuItemsResponse = {
	name: "",
	slug: "",
	back_link: "",
	has_children: false,
	image_list_item: null,
	description: "",
	items: [],
	full_path: "",
};

export const getMenuItems = async ({
	categorySlug,
}: {
	categorySlug: string;
}): Promise<MenuItemsResponse> => {
	try {
		const response = await fetchGetApiData<MenuItemsResponse, {}>({
			query: `/api/categories/menu-items/${categorySlug}/`,
			variables: {},
			cache: "force-cache",
			next: { tags: [`menu-items-${categorySlug}`] },
		});
		if ("status" in response) {
			return defaultMenuItemsResponse;
		}

		return response;
	} catch (error) {
		console.error("API Error:", error);
		return defaultMenuItemsResponse;
	}
};
