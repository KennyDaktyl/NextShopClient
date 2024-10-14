// app/produkty/page.tsx
import { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import { getMenuItems } from "@/api/getMenuItems";
import CategoryDetails from "@/components/category/CategoryDetails";
import { MenuItemsResponse } from "@/app/types";
import { generateCategoryJsonLd, JsonLd } from "@/components/seo/LdJson";

export async function generateMetadata(): Promise<Metadata> {
	const currentCategorySlug = "produkty";
	const menuItems: MenuItemsResponse = await getMenuItems({
		categorySlug: currentCategorySlug,
	});

	const category = {
		name: menuItems.name,
		meta_title: menuItems.meta_title || null,
		meta_description: menuItems.meta_description || null,
		description: menuItems.description || "",
		image: menuItems.image,
		full_path: menuItems.full_path,
	};
	const title = category.meta_title
		? category.meta_title
		: `Lista głównych kategorii produktów w sklepie internetowym`;
	const description = category.meta_description
		? category.meta_description
		: "Lista wszystkich głównych kategorii dostępnych w naszym sklepie internetowym. Sprawdź naszą ofertę i wybierz coś dla siebie!";
	return {
		alternates: {
			canonical: "/produkty",
		},
		title: title,
		description: description,

		openGraph: {
			title: title,
			description: description,
			url: process.env.NEXT_PUBLIC_BASE_URL + category.full_path,
			siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
			images: [
				{
					url: category.image?.url || "",
					width: category.image?.width || 0,
					height: category.image?.height || 0,
					alt: category.image?.alt || "",
				},
			],
			locale: "pl_PL",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: [
				{
					url: category.image?.url || "",
					width: category.image?.width || 0,
					height: category.image?.height || 0,
					alt: category.image?.alt || "",
				},
			],
		},
	};
}

export default async function Page() {
	const currentCategorySlug = "produkty";
	try {
		const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: currentCategorySlug });

		const category = {
			id: menuItems.id,
			name: menuItems.name,
			meta_title: menuItems.meta_title || menuItems.name,
			meta_description: menuItems.meta_description || menuItems.description,
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
