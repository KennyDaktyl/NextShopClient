import type { Metadata, ResolvingMetadata } from "next";

import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryLayout from "@/app/produkty/layout";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductsList } from "@/api/getProducts";
import { getMenuItems } from "@/api/getMenuItems";
import {
	CategoryMetaData,
	MenuItemsResponse,
	Product,
	ProductDetailsResponse,
	ProductsResponse,
} from "@/app/types";
import { getProductDetails } from "@/api/getProduct";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";

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
		const product = response as ProductDetailsResponse;

		return {
			title: product.name,
			description: product.description,
		};
	} else {
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
		try {
			const productDetails: ProductDetailsResponse | null = await getProductDetails({
				productSlug,
			});
			if (!productDetails) {
				throw new Error("Product not found");
			}

			const menuItems: MenuItemsResponse = await getMenuItems({
				categorySlug: productDetails.category.slug,
			});

			return (
				<CategoryLayout>
					<SideBar menuItems={menuItems} isMenuActive={false} />
					<ProductDetails product={productDetails} />
				</CategoryLayout>
			);
		} catch (error) {
			console.error("Error fetching product details or menu items:", error);
			return <div>Error fetching product details or menu items</div>;
		}
	} else {
		try {
			const currentCategorySlug = lastRoute;
			const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

			const response = await getProductsList({ params: searchParams });
			const menuItems = await getMenuItems({ categorySlug: currentCategorySlug });

			if (
				response &&
				typeof response === "object" &&
				"count" in response &&
				"results" in response
			) {
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
		} catch (error) {
			console.error("Error fetching products:", error);
			return <div>Error fetching products</div>;
		}
	}
}
