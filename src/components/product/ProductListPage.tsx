"use client";
import { PaginationPage } from "@/components/product/Pagination";
import { ProductList } from "./ProductList";
import { Category, ProductListItem } from "@/app/types";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";

export default function ProductListPage({
	products,
	category,
	containerName,
	currentPage,
	totalPages,
	nextPage,
	prevPage,
}: {
	products: ProductListItem[];
	category: Category;
	containerName: string;
	currentPage: number;
	totalPages: number;
	nextPage: string | null;
	prevPage: string | null;
}) {
	return (
		<div className="mt-12 flex w-full flex-wrap items-start justify-center pt-2 md:mt-0">
			<h1 className="tx:xl mb-2 mt-2 w-full font-bold">Produkty z kategorii {category.name}</h1>
			<div className="flex w-full flex-col items-center justify-center space-y-4 align-top md:flex-row md:items-start md:justify-center md:space-x-4 md:space-y-0">
				<ProductList products={products} containerName={containerName} />
			</div>
			{totalPages > 1 && (
				<PaginationPage
					currentPage={currentPage}
					totalPages={totalPages}
					nextPage={nextPage}
					prevPage={prevPage}
				/>
			)}
			<DescriptionComponent title="Szczegóły kategorii" description={category.seo_text ?? ""} />
		</div>
	);
}
