import { getProductDetails } from "@/api/getProduct";
import { BackLinkProps } from "@/app/types";
import { ProductDetailsComponent as DefaultProductDetailsComponent } from "@/components/product/ProductDetails";
import { JsonLd, mappedProductToJsonLd } from "@/components/seo/LdJson";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { productSlug: string };
}): Promise<Metadata> {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });

	if (!productDetailsResponse) {
		return {
			title: "Produkt nie znaleziony",
			description: "Przepraszamy, nie mogliśmy znaleźć tego produktu.",
			alternates: {
				canonical: "/produkty",
			},
		};
	}

	const { name, description, category, full_path } = productDetailsResponse;

	return {
		title: `Produkt ${name} z kategorii ${category.name}`,
		description: description?.slice(0, 160) || "Opis produktu niedostępny.",
		alternates: {
			canonical: full_path,
		},
	};
}

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
	const productDetailsResponse = await getProductDetails({ productSlug: params.productSlug });

	if (!productDetailsResponse) {
		return <div>Loading...</div>;
	}

	const back_link: BackLinkProps = { full_path: productDetailsResponse.category.full_path || "/" };

	return (
		<>
			<DefaultProductDetailsComponent product={productDetailsResponse} back_link={back_link} />
			<JsonLd jsonLd={mappedProductToJsonLd(productDetailsResponse)} />
		</>
	);
}
