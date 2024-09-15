import type { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryDetails from "@/components/category/CategoryDetails";
import ProductListPage from "@/components/product/ProductListPage";
import { getMenuItems } from "@/api/getMenuItems";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { MenuItemsResponse, ProductsResponse, ProductListItem } from "@/app/types";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";
import { generateCategoryJsonLd, JsonLd, mappedProductsToJsonLd } from "@/components/seo/LdJson";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
	searchParams,
}: {
	params: { routes: string[] };
	searchParams: { page?: string };
}): Promise<Metadata | ResolvingMetadata> {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];
	const currentCategorySlug = lastRoute;

	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	const response = await getCategoryMetaData({
		currentCategorySlug,
	});
	const category = response;

	let title = category.meta_title || `Usługi z kategorii ${category.name}`;
	let description = category.meta_description || `Lista usług w kategorii ${category.name}`;
	let alternates = {
		canonical: category.full_path,
	};

	if (category.has_children) {
		title = category.meta_title || `Usługa ${category.name} i lista jej podkategorii`;
		description =
			category.meta_description || `Lista usług dla kategorii Usługi - ${category.description}`;
	}

	return {
		title,
		description,
		alternates,
		openGraph: {
			title: category.meta_title || `Usługa ${category.name}`,
			description: category.meta_description || category.description?.slice(0, 160),
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
			title: category.meta_title || `Usługa ${category.name}`,
			description: category.meta_description || category.description?.slice(0, 160),
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

export default async function Page({
	params,
	searchParams,
}: {
	params: { routes: string[] };
	searchParams: {
		page: string;
	};
}) {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];
	const currentCategorySlug = lastRoute;
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: currentCategorySlug });

	const category = {
		slug: menuItems.slug,
		meta_title: menuItems.meta_title || menuItems.name,
		meta_description: menuItems.meta_description || menuItems.description,
		name: menuItems.name,
		description: menuItems.description || "",
		seo_text: menuItems.seo_text || "",
		image: menuItems.image || null,
		items: menuItems.items,
	};

	if (menuItems.has_children) {
		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<CategoryDetails category={category} />
				<JsonLd jsonLd={generateCategoryJsonLd(category)} />
			</CategoryLayout>
		);
	} else {
		const response = await getProductsByCategory({
			categorySlug: currentCategorySlug,
			params: { page: currentPage.toString() },
		});

		if (Array.isArray(response) && response.length === 0) {
			notFound();
		}

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response;
			const products: ProductListItem[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 20);
			const nextPage: string | null = productsResponse.next;
			const prevPage: string | null = productsResponse.previous;

			return (
				<CategoryLayout>
					<SideBar menuItems={menuItems} isMenuActive={false} />

					<ProductListPage
						products={products}
						category={category}
						containerName="product-list-by-category"
						nextPage={nextPage}
						prevPage={prevPage}
						totalPages={totalPages}
						currentPage={currentPage}
					/>
					<JsonLd jsonLd={mappedProductsToJsonLd(products)} />
				</CategoryLayout>
			);
		} else {
			console.error("Error fetching products:", response);
			return <div>Error fetching products</div>;
		}
	}
}
