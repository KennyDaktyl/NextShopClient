import { getArticleBySlug } from "@/api/getArticle";
import { ArticleResponse } from "@/app/types";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Metadane dla SEO
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
	return {
		title: article.meta_title || article.name,
		description: article.meta_description || article.description,
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
			<h1 className="mb-8 text-center text-4xl font-bold">{article.name}</h1>
			<ArticleDetail article={article} />
		</div>
	);
}
