import { FirstPageDataResponse } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { ProductItemOnFrontPageContainer } from "@/components/front/ProductItemOnFrontPage";

export const CategoryListOnFirstPage: React.FC<FirstPageDataResponse> = ({ categories }) => {
	return (
		<div className="mb-3 mt-5 flex w-full max-w-screen-xl flex-wrap items-start justify-between">
			<h2 className="mt-3 w-full text-2xl font-bold">Kategorie promowane</h2>
			{categories.map((category) => (
				<div key={category.id} className="w-full">
					<Link href={category.full_path} className="mb-3 mt-3 w-full hover:bg-slate-50">
						<div className="flex w-full flex-wrap items-center justify-center rounded-md shadow-md hover:bg-slate-50 md:h-[350px]">
							<div className="flex h-[200px] w-full items-center justify-center md:h-[350px] md:w-1/2">
								<div className="flex w-4/5 flex-wrap items-center justify-start">
									<h1 className="w-full text-xl font-bold">{category.name}</h1>
									<p className="mt-4 text-lg">{category.description}</p>
								</div>
							</div>
							{category.image ? (
								<div className="m-auto flex h-[200px] w-full items-center justify-center md:h-[320px] md:w-1/2">
									<Image
										src={category.image.url}
										alt={category.image.alt || "Category Image"}
										className="h-[180px] max-w-[350px] rounded-md object-cover"
										height={180}
										width={180}
									/>
								</div>
							) : (
								<div className="m-auto flex h-[200px] w-full items-center justify-center md:h-[320px] md:w-1/2"></div>
							)}
						</div>
					</Link>
					{category.products_on_first_page.length > 0 && (
						<div>
							<h3 className="text:2xl mb-3 mt-3 w-full font-bold">Promowane w {category.name}</h3>
							<ul
								data-testid={"products-promo-in-" + category.slug}
								className="flex w-full grid-cols-2 flex-wrap justify-between sm:grid-cols-3 md:gap-3 xl:grid-cols-4"
							>
								{category.products_on_first_page.map((product) => (
									<ProductItemOnFrontPageContainer key={product.id} product={product} />
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
