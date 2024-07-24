// components/product/ProductListPage.tsx
"use client";
import { PaginationPage } from "@/components/product/Pagination";
import { ProductList } from "./ProductList";
import { ProductListItem } from "@/app/types";

export default function ProductListPage({
	products,
	containerName,
	currentPage,
	totalPages,
	nextPage,
	prevPage,
}: {
	products: ProductListItem[];
	containerName: string;
	currentPage: number;
	totalPages: number;
	nextPage: string | null;
	prevPage: string | null;
}) {
	return (
		<div className="mt-12 flex w-full flex-wrap items-start justify-center md:mt-0">
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
		</div>
	);
}
