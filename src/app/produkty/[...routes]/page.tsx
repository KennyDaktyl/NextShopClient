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

export async function generateMetadata({
	params,
}: {
	params: { routes: string[] };
}): Promise<Metadata | ResolvingMetadata> {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];

	const currentCategorySlug = lastRoute;
	const response = await getCategoryMetaData({
		currentCategorySlug,
	});
	const category = response;

	if (category.has_children) {
		return {
			title: `Kategoria ${category.name} i lista jej podkategorii`,
			description: `Lista podkategorii dla kategorii ${category.description}`,
			alternates: {
				canonical: category.full_path,
			},
		};
	}

	return {
		title: `Produkty z kategorii ${category.name}`,
		description: `Lista produktów w kategorii ${category.description}`,
		alternates: {
			canonical: category.full_path,
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
		name: menuItems.name,
		description: menuItems.description || "",
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

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response;
			const products: ProductListItem[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 2);
			const nextPage: string | null = productsResponse.next;
			const prevPage: string | null = productsResponse.previous;

			return (
				<CategoryLayout>
					<SideBar menuItems={menuItems} isMenuActive={false} />
					<ProductListPage
						products={products}
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
			throw new Error("Invalid response format");
		}
	}
}
