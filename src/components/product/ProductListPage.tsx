// components/product/ProductListPage.tsx
"use client";
import { ProductList } from "./ProductList";

export default function ProductListPage({
	products,
	containerName,
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
}) {
	return (
		<div className="flex flex-col items-center justify-start space-y-4 align-top md:flex-row md:items-start md:justify-start md:space-x-4 md:space-y-0">
			<ProductList products={products} containerName={containerName} />
		</div>
	);
}
