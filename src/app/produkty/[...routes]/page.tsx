import type { Metadata, ResolvingMetadata } from "next";

import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryLayout from "@/app/produkty/layout";
import { getMenuItems } from "@/api/getMenuItems";
import { CategoryMetaData, Product, ProductsResponse } from "@/app/types";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";
import { getProductsByCategory } from "@/api/getProductsByCategory";

export async function generateMetadata({
	params,
}: {
	params: { routes: [] };
}): Promise<Metadata | ResolvingMetadata> {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];

	const currentCategorySlug = lastRoute;
	const response = await getCategoryMetaData({
		currentCategorySlug,
	});
	const category = response as CategoryMetaData;
	return {
		title: `Produkty z kategorii ${category.name}`,
		description: category.description,
	};
}

export default async function Page({
	params,
	searchParams,
}: {
	params: { routes: [] };
	searchParams: {
		page: string;
	};
}) {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];

	const currentCategorySlug = lastRoute;
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	const response = await getProductsByCategory({
		categorySlug: currentCategorySlug,
		params: { page: currentPage.toString() },
	});
	const menuItems = await getMenuItems({ categorySlug: currentCategorySlug });

	if (response && typeof response === "object" && "count" in response && "results" in response) {
		const productsResponse: ProductsResponse = response as ProductsResponse;

		const products: Product[] = productsResponse.results;
		const totalPages: number = Math.ceil(productsResponse.count / 2);
		const nextPage: string | null = productsResponse.next;
		const prevPage: string | null = productsResponse.previous;

		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={menuItems.has_children} />
				<ProductListPage
					products={products}
					containerName="product-list-by-category"
					nextPage={nextPage}
					prevPage={prevPage}
					totalPages={totalPages}
					currentPage={currentPage}
				/>
			</CategoryLayout>
		);
	} else {
		throw new Error("Invalid response format");
	}
}
