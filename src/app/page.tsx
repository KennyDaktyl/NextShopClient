import { getProductsList } from "@/api/getProducts";
import { ProductListItem, ProductsResponse } from "@/app/types";
import ProductListPage from "@/components/product/ProductListPage";
import Image from "next/image";

export default async function Home() {
	const response = await getProductsList({ params: { page: "1" } });
	const productsResponse: ProductsResponse = response as ProductsResponse;

	const products: ProductListItem[] = productsResponse.results;
	const totalPages: number = Math.ceil(productsResponse.count / 2);
	const nextPage: string | null = productsResponse.next;
	const prevPage: string | null = productsResponse.previous;
	return (
		<section>
			<div className="flex w-full flex-wrap rounded-md bg-gray-100 shadow-md">
				<div className="flex w-1/2 items-center justify-center">
					<div className="flex w-4/5 flex-wrap items-center justify-start">
						<h1 className="w-full text-3xl font-bold">Welcome to the Next.js Starter</h1>
						<p className="mt-4 text-lg">
							This is a starter template for Next.js with TypeScript, Tailwind CSS, and ESLint.
						</p>
					</div>
				</div>
				<div className="m-auto flex w-1/2 items-center justify-center">
					<Image
						src="https://new-serwiswrybnej-api.resto-app.pl/media/thumbnails/pieczatka-colop-c20-new-id-4_350x350.webp"
						alt=""
						className="max-h-[350px] max-w-[350px] rounded-md object-cover"
						height={263}
						width={340}
					/>
				</div>
			</div>
			<div className="mt-4 flex w-full flex-wrap">
				<h2 className="w-full text-left text-xl font-bold">Produktu promowane</h2>
				<ProductListPage
					products={products}
					containerName="product-list-by-category"
					nextPage={nextPage}
					prevPage={prevPage}
					totalPages={totalPages}
					currentPage={1}
				/>
			</div>
		</section>
	);
}
