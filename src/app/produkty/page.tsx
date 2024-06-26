// /products/page.tsx
import { getProducts } from "./actions";
import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryLayout from "@/app/produkty/layout";
import { getSubMenuItems } from "@/app/actions/menuItems";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(): Promise<Metadata | ResolvingMetadata> {
	return {
		title: `Lista produktów w sklepie`,
		description: "Lista produktów w sklepie internetowym.",
	};
}

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: {
		page: string;
	};
}) {
	const response = await getProducts({ params: searchParams });
	const products = response.data.results;
	const currentCategorySlug = "produkty";
	const menuItems = await getSubMenuItems(currentCategorySlug);

	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
	const totalCount = response.data.count;
	const nextPage = response.data.next;
	const prevPage = response.data.previous;
	const totalPages = Math.ceil(totalCount / 2);

	return (
		<CategoryLayout>
			<SideBar menuItems={menuItems} isMenuActive={true} />
			<ProductListPage
				products={products}
				containerName="product-list"
				nextPage={nextPage}
				prevPage={prevPage}
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</CategoryLayout>
	);
}
