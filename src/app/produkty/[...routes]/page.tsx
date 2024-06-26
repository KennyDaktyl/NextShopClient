import type { Metadata, ResolvingMetadata } from "next";

import { getCategoryMetaData, getProductDetails, getProductsByCategory } from "./actions";
import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import { getSubMenuItems } from "@/app/actions/menuItems";
import CategoryLayout from "@/app/produkty/layout";
import ProductDetails from "@/components/product/ProductDetails";

export async function generateMetadata({
	params,
}: {
	params: { routes: [] };
}): Promise<Metadata | ResolvingMetadata> {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];

	const isProductSlug = (slug: string) => {
		return /-id-\d+$/.test(slug);
	};

	if (isProductSlug(lastRoute)) {
		const productSlug = lastRoute;
		const response = await getProductDetails({ productSlug });
		const product = response.data;

		return {
			title: product.name,
			description: product.description,
		};
	} else {
		const currentCategorySlug = lastRoute;
		const response = await getCategoryMetaData({
			currentCategorySlug,
		});
		const category = response.data;
		return {
			title: `Produkty z kategorii ${category.name}`,
			description: category.description,
		};
	}
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

	const isProductSlug = (slug: string) => {
		return /-id-\d+$/.test(slug);
	};

	if (isProductSlug(lastRoute)) {
		const productSlug = lastRoute;
		const response = await getProductDetails({ productSlug });
		const product = response.data;

		const menuItems = await getSubMenuItems(product.category.slug);

		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<ProductDetails product={product} />
			</CategoryLayout>
		);
	} else {
		const currentCategorySlug = lastRoute;
		const response = await getProductsByCategory({
			categorySlug: currentCategorySlug,
			searchParams,
		});
		const products = response.data.results;
		const menuItems = await getSubMenuItems(currentCategorySlug);

		const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
		const totalCount = response.data.count;
		const nextPage = response.data.next;
		const prevPage = response.data.previous;
		const totalPages = Math.ceil(totalCount / 2);

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
	}
}
