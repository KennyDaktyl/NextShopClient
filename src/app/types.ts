interface GetProductsResponse {
	data: any;
	status: number;
}

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

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
	has_children: boolean;
	items: MenuItem[];
}

interface ProductCategory {
	id: number;
	name: string;
	slug: string;
}

interface Product {
	id: string;
	name: string;
	slug: string;
	category: ProductCategory;
	description: string;
	qty: number;
	full_image_url: string;
	current_price: number;
	min_price_last_30: number;
	absolute_url: string;
}
