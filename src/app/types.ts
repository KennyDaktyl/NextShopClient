interface GetProductsResponse {
	data: any;
	status: number;
}

interface CategorySlug {
	categorySlug: string;
}

interface ProductSlug {
	productSlug: string;
}

interface SideBarProps {
	categorySlug: string | null;
}

interface MenuItem {
	name: string;
	slug: string;
	is_parent: boolean;
	has_parent: boolean;
	get_products_count: number;
	full_path: string;
}

interface MenuItems {
	name: string;
	back_link: string;
	items: MenuItem[];
}
