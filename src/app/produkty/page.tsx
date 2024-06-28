// app/produkty/page.tsx
import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryLayout from "@/app/produkty/layout";
import { getProductsList } from "@/api/getProducts";
import { Product, ProductsResponse } from "@/app/types";
import { getMenuItems } from "@/api/getMenuItems";
import { Metadata, ResolvingMetadata } from "next";

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

const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
	const currentCategorySlug = "produkty";

	try {
		const response = await getProductsList({ params: searchParams });
		const menuItems = await getMenuItems({ categorySlug: currentCategorySlug });

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response as ProductsResponse;

			const products: Product[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 2);
			const nextPage: string | null = productsResponse.next;
			const prevPage: string | null = productsResponse.previous;

			return (
				<CategoryLayout>
					<SideBar menuItems={menuItems} isMenuActive={true} />
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
};

export default ProductsPage;
