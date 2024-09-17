import { ArticleListItem } from "@/app/types";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function ArticleCard({ article }: { article: ArticleListItem }) {
	return (
		<Link
			role="link"
			aria-label={article.name}
			href={article.full_path}
			className="transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
		>
			{/* Karta artykułu */}
			<Card className="flex h-[400px] w-full flex-col p-4 shadow-lg transition-shadow duration-300 hover:bg-slate-50 hover:shadow-xl md:flex-row">
				{/* Obrazek - mobilnie nad treścią */}
				<div className="mb-4 h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg md:h-full md:w-1/3">
					{article.image_listing && (
						<Image
							src={article.image_listing.url}
							alt={article.image_listing.alt || article.name}
							title={article.image_listing.alt || article.name}
							width={350}
							height={350}
							className="h-full w-full rounded-lg object-cover"
						/>
					)}
				</div>

				{/* Treść artykułu */}
				<div className="flex h-full flex-grow flex-col justify-between">
					<CardHeader className="mb-2">
						<h2 className="w-full text-xl font-bold text-gray-800">{article.name}</h2>
						<span className="text-gray-600">{article.category.name}</span>
					</CardHeader>
					<CardContent className="flex-grow">
						<p className="text-gray-600">
							{article.description ? article.description : "Brak opisu"}
						</p>
					</CardContent>
					<CardFooter className="mt-4 text-sm text-gray-500">
						Data utworzenia: {new Date(article.created_date).toLocaleDateString()}
					</CardFooter>
				</div>
			</Card>
		</Link>
	);
}
