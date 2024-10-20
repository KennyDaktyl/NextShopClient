import { getArticlesList } from "@/api/getArticles";
import { ArticleListItem, ArticlesResponse } from "@/app/types";
import ArticleList from "@/components/articles/ArticleList";
import { PaginationPage } from "@/components/product/Pagination";
import { JsonLd, mappedArticlesToJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog o Pieczątkach, Kluczach Samochodowych i Naprawach Telefonów | serwiswrybnej.pl",
	description:
		"Znajdź przydatne informacje na naszym blogu dotyczące pieczątek firmowych, kluczy samochodowych, napraw telefonów oraz innych usług. Odkryj porady, nowości produktowe i praktyczne wskazówki dla Twojej firmy.",
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: "Blog o Pieczątkach, Kluczach Samochodowych i Naprawach Telefonów | serwiswrybnej.pl",
		description:
			"Nasze artykuły oferują szczegółowe porady dotyczące pieczątek firmowych, kluczy samochodowych i napraw telefonów. Odkryj nowości i praktyczne informacje na blogu.",
		url: "https://serwiswrybnej.pl/blog",
		siteName: "serwiswrybnej.pl",
		images: [
			{
				url: "https://serwiswrybnej.pl/images/profesjonalne-pieczatki-firmowe-i-imienne-na-zamowienie-online_350x350.webp",
				width: 350,
				height: 350,
				alt: "Blog o Pieczątkach, Kluczach Samochodowych i Naprawach Telefonów",
			},
		],
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog o Pieczątkach, Kluczach Samochodowych i Naprawach Telefonów | serwiswrybnej.pl",
		description:
			"Artykuły na temat pieczątek firmowych, kluczy samochodowych i napraw telefonów – wszystko, co musisz wiedzieć o naszych usługach.",
		images: [
			{
				url: "https://serwiswrybnej.pl/images/profesjonalne-pieczatki-firmowe-i-imienne-na-zamowienie-online_350x350.webp",
				alt: "Blog o Pieczątkach, Kluczach Samochodowych i Naprawach Telefonów",
			},
		],
	},
};

export default async function ArticlesPage({
	searchParams,
}: {
	searchParams: {
		page?: string;
		searchTerms?: string;
	};
}) {
	const page = searchParams.page || "1";
	const searchTerms = searchParams.searchTerms || "";

	const response = await getArticlesList({
		params: { page, searchTerms },
	});

	if (!response) {
		return <div>Brak artykułów</div>;
	}

	const articles = (response as ArticlesResponse).results as ArticleListItem[] | [];
	const count: number = (response as ArticlesResponse).count;
	const totalPages: number = Math.ceil(count / 20);
	const nextPage: string | null = (response as ArticlesResponse).next;
	const prevPage: string | null = (response as ArticlesResponse).previous;
	const currentPage: number = parseInt(page);

	return (
		<div className="mx-auto w-full">
			<h1 className="mb-8 text-center text-3xl font-bold">Lista Artykułów</h1>
			<ArticleList articles={articles} />
			{totalPages > 1 && (
				<PaginationPage
					currentPage={currentPage}
					totalPages={totalPages}
					nextPage={nextPage}
					prevPage={prevPage}
				/>
			)}
			<JsonLd jsonLd={mappedArticlesToJsonLd(articles)} />
		</div>
	);
}
