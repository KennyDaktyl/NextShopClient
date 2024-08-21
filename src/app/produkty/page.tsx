// app/produkty/page.tsx
import { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import { getMenuItems } from "@/api/getMenuItems";
import CategoryDetails from "@/components/category/CategoryDetails";
import { MenuItemsResponse } from "@/app/types";

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
		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<CategoryDetails
					category={{
						name: menuItems.name,
						description: menuItems.description || "",
						image: {
							url: menuItems.image?.url || null,
							alt: menuItems.image?.alt || null,
							height: menuItems.image?.height || null,
							width: menuItems.image?.width || null,
						},
						items: menuItems.items,
					}}
				/>
			</CategoryLayout>
		);
	} catch (error) {
		console.error("Error fetching products:", error);
		return <div>Error fetching products</div>;
	}
}
