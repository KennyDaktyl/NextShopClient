import { MenuItem, MenuItemsResponse } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export interface MegaMenuSection {
	name: string;
	full_path: string;
	subcategories: MenuItem[];
}

const fetchCategoryChildren = async (slug: string): Promise<MenuItemsResponse | null> => {
	try {
		const response = await fetchGetApiData<MenuItemsResponse, {}>({
			query: `/api/categories/menu-items/${slug}/`,
			variables: {},
			next: { tags: ["mega-menu"], revalidate: 3600 },
		});
		if ("status" in response) return null;
		return response;
	} catch (error) {
		console.error("Mega menu fetch error:", error);
		return null;
	}
};

export const getProductsMegaMenu = async (): Promise<MegaMenuSection[]> => {
	const root = await fetchCategoryChildren("produkty");
	if (!root) return [];

	const sections = await Promise.all(
		root.items.map(async (item): Promise<MegaMenuSection> => {
			const name = item.item_label || item.name;
			if (!item.has_children) {
				return { name, full_path: item.full_path, subcategories: [] };
			}
			const child = await fetchCategoryChildren(item.slug);
			return { name, full_path: item.full_path, subcategories: child?.items ?? [] };
		}),
	);

	return sections;
};
