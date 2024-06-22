import { getProducts } from "./actions";
import ProductListPage from "@/components/product/ProductListPage";

export default async function Page() {
	const response = await getProducts();
	const products = response.data;
	return <ProductListPage products={products} containerName="profile" />;
}
