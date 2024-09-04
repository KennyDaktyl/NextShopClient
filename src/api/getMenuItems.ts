import { MenuItemsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";
import { notFound } from "next/navigation";

class SomeErrorClass {
	status: number;
	constructor(status: number) {
		this.status = status;
	}
}

const defaultMenuItemsResponse: MenuItemsResponse = {
	id: 0,
	name: "",
	item_label: "",
	slug: "",
	back_link: "",
	has_children: false,
	image: null,
	description: "",
	seo_text: "",
	items: [],
	full_path: "",
	status: 200,
};

export const getMenuItems = async ({
	categorySlug,
}: {
	categorySlug: string;
}): Promise<MenuItemsResponse> => {
	const response = await fetchGetApiData<MenuItemsResponse, {}>({
		query: `/api/categories/menu-items/${categorySlug}/`,
		variables: {},
		cache: "force-cache",
		next: { tags: [`menu-items-${categorySlug}`] },
	});

	if ("status" in response && response.status === 404) {
		notFound();
	}
	return response as MenuItemsResponse;
};
