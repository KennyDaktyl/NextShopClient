import { ArticleResponse } from "@/app/types";
import Gallery from "@/components/gallery/Gallery";
import Image from "next/image";

export default function ArticleDetail({ article }: { article: ArticleResponse }) {
	return (
		<div>
			<div className="mb-8">
				<Image
					src={article.image.url}
					alt={article.image.alt || article.name}
					title={article.image.title || article.name}
					width={article.image.width}
					height={article.image.height}
					className="rounded-lg"
				/>
				<div className="mt-4">
					<span className="text-sm text-gray-600">{article.category.name}</span>
					<div
						className="mt-4 text-justify text-lg"
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>
				</div>
			</div>

			<Gallery images={article.gallery} />
		</div>
	);
}
