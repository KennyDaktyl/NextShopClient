import { getProductsBySearch } from "@/api/getProductsBySearch";
import { ProductListItem, ProductsResponse } from "@/app/types";
import ProductListPage from "@/components/product/ProductListPage";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: {
		page: string;
		search: string;
	};
}) {
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	if (!searchParams.search) {
		redirect("/");
	}

	const response = await getProductsBySearch({
		params: { page: currentPage.toString(), search: searchParams.search },
	});

	if (response && typeof response === "object" && "count" in response && "results" in response) {
		const productsResponse: ProductsResponse = response as ProductsResponse;
		const products: ProductListItem[] = productsResponse.results;
		const totalPages: number = Math.ceil(productsResponse.count / 20);
		const nextPage: string | null = productsResponse.next;
		const prevPage: string | null = productsResponse.previous;

		return (
			<div className="justify-left flex w-full flex-wrap items-center">
				<h1 className="text-xl font-bold leading-none tracking-tight text-foreground">
					Lista produktów dla frazy: {searchParams.search}
				</h1>
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
		return <div>Error</div>;
	}
}
