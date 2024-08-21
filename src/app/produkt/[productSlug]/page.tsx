import { getProductDetails } from "@/api/getProduct";
import { BackLinkProps } from "@/app/types";
import { ProductDetailsComponent as DefaultProductDetailsComponent } from "@/components/product/ProductDetails";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { productSlug: string };
}): Promise<Metadata | ResolvingMetadata> {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });
	return {
		title: `Produkt ${productDetailsResponse?.name} z kategorii ${productDetailsResponse?.category.name}`,
		description: productDetailsResponse?.description,
	};
}

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });

	if (!productDetailsResponse) {
		return <div>Loading...</div>;
	}

	const back_link: BackLinkProps = { full_path: productDetailsResponse.category.full_path || "/" };

	return <DefaultProductDetailsComponent product={productDetailsResponse} back_link={back_link} />;
}
