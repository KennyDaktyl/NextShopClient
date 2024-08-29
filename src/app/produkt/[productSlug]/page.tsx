import { getProductDetails } from "@/api/getProduct";
import { BackLinkProps } from "@/app/types";
import HeaderComponent from "@/components/product/atoms/HeaderComponent";
import { ProductDetailsComponent as DefaultProductDetailsComponent } from "@/components/product/ProductDetails";
import { JsonLd, mappedProductToJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
				canonical: `/produkt/${params.productSlug}`,
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
		return notFound();
	}

	const back_link: BackLinkProps = { full_path: productDetailsResponse.category.full_path || "/" };

	return (
		<section className="flex w-full flex-wrap">
			<HeaderComponent product={productDetailsResponse} />
			<DefaultProductDetailsComponent product={productDetailsResponse} back_link={back_link} />
			<JsonLd jsonLd={mappedProductToJsonLd(productDetailsResponse)} />
		</section>
	);
}
