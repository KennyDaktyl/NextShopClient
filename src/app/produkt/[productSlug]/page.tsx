import { getProductDetails } from "@/api/getProduct";
import { ProductDetailsResponse } from "@/app/types";
import ProductDetails from "@/components/product/ProductDetails";

export default async function Page({ params }: { params: { productSlug: string } }) {
	const productSlug = params.productSlug;
	const productDetails: ProductDetailsResponse | null = await getProductDetails({
		productSlug,
	});
	if (!productDetails) {
		throw new Error("Product not found");
	}

	return <ProductDetails product={productDetails} />;
}
