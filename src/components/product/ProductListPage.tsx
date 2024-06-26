// components/product/ProductListPage.tsx
"use client";
import { PaginationPage } from "@/components/product/Pagination";
import { ProductList } from "./ProductList";
import { Suspense } from "react";

export default function ProductListPage({
	products,
	containerName,
	currentPage,
	totalPages,
	nextPage,
	prevPage,
}: {
	products: Product[];
	containerName: string;
	currentPage: number;
	totalPages: number;
	nextPage: string;
	prevPage: string;
}) {
	return (
		<div className="flex w-full flex-wrap items-start justify-center">
			<div className="flex w-full flex-col items-center justify-start space-y-4 align-top md:flex-row md:items-start md:justify-center md:space-x-4 md:space-y-0">
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
