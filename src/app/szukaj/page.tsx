import { getProductsBySearch } from "@/api/getProductsBySearch";
import { ProductListItem, ProductsResponse } from "@/app/types";
import ProductItemOnFrontPageContainer from "@/components/front/ProductItemOnFrontPage";
import { PaginationPage } from "@/components/product/Pagination";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Serwis w Rybnej. Szukaj produktów",
	description: "Serwis w Rybnej. Strona wyszukiwania produktów",
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
	robots: "index, no-follow",
};

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
		console.log("redirecting");
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
				<h1 className="w-full text-xl font-bold leading-none tracking-tight text-foreground">
					Lista produktów dla frazy: {searchParams.search}
				</h1>
				{productsResponse.count > 20 && (
					<span className="mt-4 w-full font-normal">
						Zawęź frazę wyszukiwania - znaleziono {productsResponse.count} produkty/ów.{" "}
					</span>
				)}
				<div className="mt-2 grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((product) => (
						<ProductItemOnFrontPageContainer key={product.id} product={product} />
					))}
				</div>
				{totalPages > 1 && (
					<span className="mx-auto mb-4 mt-4 font-semibold">
						Pierwsze 20 produktów. Wyświetlono {products.length} z {productsResponse.count}{" "}
					</span>
				)}
			</div>
		);
	} else {
		return <div>Error</div>;
	}
}
