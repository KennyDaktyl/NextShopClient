import { getProductsList } from "@/api/getProducts";
import { Product, ProductsResponse } from "@/app/types";
import ProductListPage from "@/components/product/ProductListPage";

const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
	try {
		const response = await getProductsList({ params: searchParams });

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response as ProductsResponse;

			const products: Product[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 10);
			const nextPage: string | null = productsResponse.next;
			const prevPage: string | null = productsResponse.previous;

			return (
				<div>
					<h1>Products</h1>
					<ProductListPage
						products={products}
						containerName="product-list-by-category"
						nextPage={nextPage}
						prevPage={prevPage}
						totalPages={totalPages}
						currentPage={currentPage}
					/>
				</div>
			);
		} else {
			throw new Error("Invalid response format");
		}
	} catch (error: any) {
		console.error("API Error:", error);
		return (
			<div>
				<h1>API Error</h1>
				<p>{error.message}</p>
			</div>
		);
	}
};

export default ProductsPage;
