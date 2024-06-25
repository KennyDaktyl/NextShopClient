// components/product/ProductListPage.tsx
"use client";
import { PaginationPage } from "@/components/product/Pagination";
import { ProductList } from "./ProductList";

export default function ProductListPage({
	products,
	containerName,
	currentPage,
	totalPages,
	nextPage,
	prevPage,
}: {
	products: {
		id: string;
		name: string;
		slug: string;
		current_price: number;
		category: {
			name: string;
			slug: string;
			id: string;
		};
		full_image_url: string;
	}[];
	containerName: string;
	currentPage: number;
	totalPages: number;
	nextPage: string;
	prevPage: string;
}) {
	return (
		<div className="flex w-full flex-wrap items-start justify-center">
			<div className="flex w-full flex-col items-center justify-start space-y-4 align-top md:flex-row md:items-start md:justify-start md:space-x-4 md:space-y-0">
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
