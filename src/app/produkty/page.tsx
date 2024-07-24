// app/produkty/page.tsx
import { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import { getMenuItems } from "@/api/getMenuItems";
import CategoryDetails from "@/components/category/CategoryDetails";
import { MenuItemsResponse } from "@/app/types";

export async function generateMetadata(): Promise<Metadata | ResolvingMetadata> {
	return {
		alternates: {
			canonical: "/produkty",
		},
		title: `Lista wszystkich produktów`,
		description:
			"Lista wszystkich produktów dostępnych w naszym sklepie internetowym. Sprawdź naszą ofertę i wybierz coś dla siebie!",
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
							image_url: menuItems.image_list_item?.image_url || null,
							alt: menuItems.image_list_item?.alt || null,
							height: menuItems.image_list_item?.height || null,
							width: menuItems.image_list_item?.width || null,
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
