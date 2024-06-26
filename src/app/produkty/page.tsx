// app/produkty/page.tsx

import { headers } from "next/headers";
import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryLayout from "@/app/produkty/layout";
import { getProducts } from "@/app/produkty/actions";
import { getSubMenuItems } from "@/app/actions/menuItems";

const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
	const currentCategorySlug = "produkty";

	try {
		const response = await getProducts({ params: searchParams });
		const products = response.data.results;
		const totalCount = response.data.count;
		const totalPages = Math.ceil(totalCount / 2);
		const nextPage = response.data.next;
		const prevPage = response.data.previous;

		const menuItems = await getSubMenuItems(currentCategorySlug);

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
	} catch (error) {
		console.error("Error fetching products:", error);
		return <div>Error fetching products</div>;
	}
};

export default ProductsPage;
