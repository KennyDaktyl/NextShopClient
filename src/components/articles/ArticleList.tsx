// components/ArticleList.js
import { ArticleListItem } from "@/app/types";
import ArticleCard from "./ArticleCard";
import { notFound } from "next/navigation";

export default function ArticleList({ articles }: { articles: ArticleListItem[] }) {
	if (!articles || articles.length === 0) {
		notFound();
		return null;
	}
	return (
		<div className="grid grid-cols-1 gap-6">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}
