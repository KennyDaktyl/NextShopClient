import type { Metadata, ResolvingMetadata } from "next";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryDetails from "@/components/category/CategoryDetails";
import ProductListPage from "@/components/product/ProductListPage";
import { getMenuItems } from "@/api/getMenuItems";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import {
	MenuItemsResponse,
	ProductsResponse,
	ProductListItem,
	CategoryMetaData,
} from "@/app/types";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";

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

	if (menuItems.has_children) {
		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<CategoryDetails
					category={{
						name: menuItems.name,
						description: menuItems.description || "",
						image: menuItems.image_list_item
							? {
									image_url: menuItems.image_list_item.image_url,
									alt: menuItems.image_list_item.alt,
									height: menuItems.image_list_item.height,
									width: menuItems.image_list_item.width,
								}
							: null,
						items: menuItems.items,
					}}
				/>
			</CategoryLayout>
		);
	} else {
		const response = await getProductsByCategory({
			categorySlug: currentCategorySlug,
			params: { page: currentPage.toString() },
		});

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response as ProductsResponse;
			const products: ProductListItem[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 20);
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
				</CategoryLayout>
			);
		} else {
			throw new Error("Invalid response format");
		}
	}
}
