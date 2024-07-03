import { getProductDetails } from "@/api/getProduct";
import ProductDetailsComponent from "@/components/product/ProductDetails";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { productSlug: string };
}): Promise<Metadata | ResolvingMetadata> {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });
	return {
		title: `Produkt ${productDetailsResponse?.name}`,
		description: productDetailsResponse?.description,
	};
}

export default async function Page({ params }: { params: { productSlug: string } }) {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });
	if (!productDetailsResponse) {
		return <div>Loading...</div>;
	}

	return <ProductDetailsComponent product={productDetailsResponse} />;
}
