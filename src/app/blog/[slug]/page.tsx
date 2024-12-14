import { getArticleBySlug } from "@/api/getArticle";
import { ArticleResponse } from "@/app/types";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { JsonLd, mappedArticleToJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const slugsToGenerate = [
	"czy-mozna-kupic-uniwersalny-klucz-do-skrzynek-elektrycznych-id-6",
	"naprawa-telefonow-komorkowych-w-rybnej-i-okolicach-wymiana-wyswietlaczy-naprawa-zlaczy-ladowania-i-wiecej-id-5",
	"dorobienie-klucza-mieszkaniowego-szybko-tanio-i-profesjonalnie-w-rybnej-i-okolicach-id-4",
	"wymiana-obudowy-pilota-samochodowego-profesjonalna-usluga-w-okolicach-czernichowa-liszek-alwerni-i-krzeszowic-id-3",
	"jak-zaprojektowac-pieczatke-firmowa-kompletny-przewodnik-id-2",
	"dorabianie-kluczy-mieszkaniowych-szybko-i-profesjonalnie-id-1",
];

export async function generateStaticParams() {
	return slugsToGenerate.map((slug) => ({
		slug: slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const response = await getArticleBySlug(params.slug);

	if (!response) {
		notFound();
	}

	const article = response as ArticleResponse;
	const title = article.meta_title || article.name;
	const description = article.meta_description || article.description;
	const image = article.image || "/images/no-image.webp";
	const link = `https://serwiswrybnej.pl/blog/${params.slug}`;
	return {
		title: title,
		description: description,

		openGraph: {
			title: title,
			description: title,
			url: link,
			type: "article",
			images: [
				{
					url: image.url,
					width: image.width || 1200,
					height: image.height || 630,
					alt: image.alt || title,
				},
			],
		},

		twitter: {
			card: "summary_large_image",
			title: title,
			description: description || title,
			images: [image.url],
		},
	};
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
	const response = await getArticleBySlug(params.slug);

	if (!response) {
		notFound();
	}

	const article = response as ArticleResponse;

	return (
		<div className="mx-auto max-w-6xl xl:p-6">
			<h1 className="mb-8 text-center text-2xl font-bold">{article.name}</h1>
			<ArticleDetail article={article} />
			<JsonLd jsonLd={mappedArticleToJsonLd(article)} />
		</div>
	);
}
