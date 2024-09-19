import { getFirstPageData } from "@/api/getFirstPageData";
import { FirstPageDataResponse } from "@/app/types";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
	description:
		"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
	openGraph: {
		title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
		description:
			"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
		url: process.env.NEXT_PUBLIC_BASE_URL,
		siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
		images: [
			{
				url: "https://new-serwiswrybnej-api.resto-app.pl/media/thumbnails/dorabianie-kluczy-samochodowych-i-mieszkaniowych-szybko-i-profesjonalnie_650x650.webp",
				width: 650,
				height: 650,
				alt: "Sklep z pieczątkiami - Profesjonalne Pieczątki Firmowe i Imienne na Zamówienie Online",
			},
		],
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
		description:
			"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
		images: [
			{
				url: "https://new-serwiswrybnej-api.resto-app.pl/media/thumbnails/dorabianie-kluczy-samochodowych-i-mieszkaniowych-szybko-i-profesjonalnie_650x650.webp",
				width: 650,
				height: 650,
				alt: "Sklep z pieczątkiami - Profesjonalne Pieczątki Firmowe i Imienne na Zamówienie Online",
			},
		],
	},
};

export default async function Home() {
	const res = await getFirstPageData();

	const { categories, heros }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	return (
		<section className="mt-5">
			{heros.map((hero, index) => (
				<div key={hero.id} className="mb-10 rounded-lg shadow-lg">
					<HeroItem heroData={hero} isFirst={index === 0} />
				</div>
			))}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<CategoryListOnFirstPage categories={categories} heros={[]} />
			</div>
			<JsonLd jsonLd={ownerWebsiteJsonLd()} />
		</section>
	);
}
