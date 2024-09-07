import { getFirstPageData } from "@/api/getFirstPageData";
import { FirstPageDataResponse } from "@/app/types";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_SITE_TITLE,
	description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
	openGraph: {
		title:
			"Serwis w Rybnej. Sklep z pieczątkiami. Usługi dorabiania kluczy w tym kluczy samochodowych.",
		description:
			"Witamy w naszym serwisie w Rybnej, gdzie oferujemy szeroki wybór pieczątek firmowych, imiennych oraz specjalistycznych. W naszym sklepie znajdziesz pieczątki dopasowane do Twoich potrzeb, wykonane z najwyższą precyzją i w oparciu o najnowsze technologie. Zamów online i odbierz swoją pieczątkę w naszym punkcie lub skorzystaj z szybkiej dostawy na terenie całego kraju.",
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
		title: process.env.NEXT_PUBLIC_SITE_TITLE,
		description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
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
