import { getProductDetails } from "@/api/getProduct";
import { BackLinkProps, Product } from "@/app/types";
import HeaderComponent from "@/components/product/atoms/HeaderComponent";
import { ProductDetailsComponent as DefaultProductDetailsComponent } from "@/components/product/ProductDetails";
import { JsonLd, mappedProductToJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const slugsToGenerate = [
	"klucz-do-skrzynek-energetycznych-id-596",
	"klucz-energetyczny-lob-id-597",
	"pieczatka-colop-printer-c30-pro-id-601",
	"pieczatka-printer-compact-c20-pro-id-600",
	"pieczatka-printer-compact-c40-pro-logo-id-602",
];

export async function generateStaticParams() {
	return slugsToGenerate.map((slug) => ({
		productSlug: slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { productSlug: string };
}): Promise<Metadata> {
	const sessionId = cookies().get("sessionid")?.value ?? "";
	const productDetailsResponse = await getProductDetails({
		productSlug: params.productSlug,
		sessionid: sessionId,
	});

	if (!productDetailsResponse) {
		return {
			title: "Produkt nie znaleziony",
			description: "Przepraszamy, nie mogliśmy znaleźć tego produktu.",
			alternates: {
				canonical: `/produkt/${params.productSlug}`,
			},
		};
	}

	const { name, meta_title, meta_description, description, category, full_path, images } =
		productDetailsResponse;

	return {
		title: meta_title || `Produkt ${name} z kategorii ${category.name}`,
		description: meta_description || description?.slice(0, 160),
		alternates: {
			canonical: full_path,
		},
		openGraph: {
			title: meta_title || `Produkt ${name} z kategorii ${category.name}`,
			description: meta_description || description?.slice(0, 160),
			url: process.env.NEXT_PUBLIC_BASE_URL + full_path,
			siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
			images: images.map((image) => ({
				url: image.url || "",
				width: image.width || 0,
				height: image.height || 0,
				alt: image.alt || "",
			})),
			locale: "pl_PL",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: meta_title || `Produkt ${name} z kategorii ${category.name}`,
			description: meta_description || description?.slice(0, 160),
			images: images.map((image) => ({
				url: image.url || "",
				width: image.width || 0,
				height: image.height || 0,
				alt: image.alt || "",
			})),
		},
	};
}

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
	const sessionId = cookies().get("sessionid")?.value ?? "";
	const productDetailsResponse = await getProductDetails({
		productSlug: params.productSlug,
		sessionid: sessionId,
	});

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
