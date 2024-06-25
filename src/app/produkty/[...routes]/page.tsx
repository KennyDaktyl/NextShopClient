import { getProductsByCategory } from "./actions";
import ProductListPage from "@/components/product/ProductListPage";
import SideBar from "@/components/ui/organism/SideBar";
import { getSubMenuItems } from "@/app/actions/menuItems";
import CategoryLayout from "@/app/produkty/layout";

export default async function Page({
	params,
	searchParams,
}: {
	params: { routes: [] };
	searchParams: {
		page: string;
	};
}) {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];

	const currentCategorySlug = lastRoute;
	const response = await getProductsByCategory({
		categorySlug: currentCategorySlug,
		searchParams,
	});
	const products = response.data.results;
	const menuItems = await getSubMenuItems(currentCategorySlug);

	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
	const totalCount = response.data.count;
	const nextPage = response.data.next;
	const prevPage = response.data.previous;
	const totalPages = Math.ceil(totalCount / 2);

	return (
		<CategoryLayout>
			<SideBar menuItems={menuItems} />
			<ProductListPage
				products={products}
				containerName="product-list-by-category"
				nextPage={nextPage}
				prevPage={prevPage}
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</CategoryLayout>
	);
}
