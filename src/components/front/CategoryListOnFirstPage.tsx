import { CategoriesFirstResponse } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { ProductItemOnFrontPageContainer } from "@/components/front/ProductItemOnFrontPage";
import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export const CategoryListOnFirstPage: React.FC<CategoriesFirstResponse> = ({ categories }) => {
	return (
		<div className="mb-3 flex w-full max-w-screen-xl flex-wrap items-start justify-between">
			<p className="mb-6 w-full border-b-2 border-gray-300 pb-2 text-2xl font-bold">
				Kategorie promowane
			</p>
			{categories.map((category) => (
				<div
					key={category.id}
					className="mb-8 w-full rounded-lg bg-white shadow-md hover:shadow-lg md:p-6"
				>
					<Link href={category.full_path} className="block rounded-lg hover:bg-slate-50">
						<div className="flex w-full flex-wrap items-center justify-center md:h-[350px]">
							<div className="flex w-full items-center justify-center p-1 px-2 py-4 md:h-[350px] md:w-1/2 xl:p-4">
								<div className="flex w-full flex-wrap items-center justify-start">
									<h2 className="w-full text-xl font-bold text-gray-800">{category.name}</h2>
									<p className="mt-4 text-sm text-gray-600">{category.description}</p>
								</div>
							</div>
							{category.image ? (
								<div className="flex h-[200px] w-full items-center justify-center p-2 md:h-[350px] md:w-1/2">
									<div className="relative h-full max-h-[320px] w-full max-w-[350px] overflow-hidden rounded-lg shadow-md">
										<Image
											loading="lazy"
											src={category.image.url}
											alt={category.image.alt || "Category Image"}
											className="h-full w-full object-cover"
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>
							) : (
								<div className="flex h-[200px] w-full items-center justify-center md:h-[320px] md:w-1/2"></div>
							)}
						</div>
					</Link>
					{category.all_subcategories.length > 0 && (
						<div className="mt-9 w-full p-2">
							<p className="mb-4 text-lg font-semibold">Podkategorie</p>
							<div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
								{category.all_subcategories.map((subcategory) => (
									<ActiveLink
										role="link"
										key={subcategory.id}
										href={subcategory.full_path}
										className="flex flex-col items-center justify-between gap-2 rounded-md border p-4 shadow-sm hover:bg-slate-100"
									>
										<h3 className="text-center font-semibold">{subcategory.name}</h3>
										{/* {subcategory.products_count > 0 && (
											<Badge variant="outline">{subcategory.products_count} produktów</Badge>
										)} */}
									</ActiveLink>
								))}
							</div>
						</div>
					)}
					{category.products_on_first_page.length > 0 && (
						<div className="mb-3 mt-9 w-full p-2">
							<p className="text:2xl mb-3 mt-5 w-full font-bold text-gray-800">
								Promowane produkty w kategorii {category.name}
							</p>
							<div
								data-testid={"products-promo-in-" + category.slug}
								className="mt-2 grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
							>
								{category.products_on_first_page.map((product) => (
									<ProductItemOnFrontPageContainer key={product.id} product={product} />
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
