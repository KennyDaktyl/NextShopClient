// app/page.tsx

import { getProductsByCategory } from "@/app/produkty/[categorySlug]/actions";
import ProductListPage from "@/components/product/ProductListPage";

export default async function Page({ params }: { params: CategorySlug }) {
	const response = await getProductsByCategory(params.categorySlug);
	const products = response.data;
	return <ProductListPage products={products} containerName="product-list-by-category" />;
}
