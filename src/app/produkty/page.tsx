// app/produkty/page.tsx
import { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import { getMenuItems } from "@/api/getMenuItems";
import CategoryDetails from "@/components/category/CategoryDetails";
import { MenuItemsResponse } from "@/app/types";
import { generateCategoryJsonLd, JsonLd } from "@/components/seo/LdJson";

export function generateMetadata(): Metadata | ResolvingMetadata {
	return {
		alternates: {
			canonical: "/produkty",
		},
		title: `Lista głównych kategorii produktów w sklepie internetowym`,
		description:
			"Lista wszystkich głównych kategorii dostępnych w naszym sklepie internetowym. Sprawdź naszą ofertę i wybierz coś dla siebie!",
	};
}

export default async function Page() {
	const currentCategorySlug = "produkty";
	try {
		const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: currentCategorySlug });

		const category = {
			id: menuItems.id,
			name: menuItems.name,
			item_label: menuItems.item_label || menuItems.name,
			description: menuItems.description || "",
			seo_text: menuItems.seo_text || "",
			image: menuItems.image,
			items: menuItems.items,
		};
		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<CategoryDetails category={category} />
				<JsonLd jsonLd={generateCategoryJsonLd(category)} />
			</CategoryLayout>
		);
	} catch (error) {
		console.error("Error fetching products:", error);
		return <div>Error fetching products</div>;
	}
}
