import { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import { getMenuItems } from "@/api/getMenuItems";
import CategoryDetails from "@/components/category/CategoryDetails";
import { MenuItemsResponse } from "@/app/types";
import { generateCategoryJsonLd, JsonLd } from "@/components/seo/LdJson";

export async function generateMetadata(): Promise<Metadata> {
	const currentCategorySlug = "uslugi";
	const menuItems: MenuItemsResponse = await getMenuItems({
		categorySlug: currentCategorySlug,
	});

	const category = {
		name: menuItems.name,
		description: menuItems.description || "",
		image: menuItems.image,
		full_path: menuItems.full_path,
	};

	return {
		alternates: {
			canonical: "/uslugi",
		},
		title: `Usługi wykonywane w punkcie w Rybnej`,
		description: category.description || "",

		openGraph: {
			title: `Usługa ${category.name}`,
			description: category.description?.slice(0, 160),
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
			title: `Usługa ${category.name}`,
			description: category.description?.slice(0, 160),
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
	const currentCategorySlug = "uslugi";
	try {
		const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: currentCategorySlug });

		const category = {
			id: menuItems.id,
			name: menuItems.name,
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
