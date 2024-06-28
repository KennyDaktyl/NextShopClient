export interface MenuItem {
	id: number;
	name: string;
	slug: string;
	description: string;
	has_parent: boolean;
	is_parent: boolean;
	get_products_count: number;
	has_children: boolean;
	full_path: string;
	back_link: string;
}

export interface MenuItemsResponse {
	name: string;
	slug: string;
	back_link: string;
	has_children: boolean;
	items: MenuItem[];
}

export interface Category {
	id: number;
	name: string;
	slug: string;
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	category: Category;
	description: string;
	qty: number;
	full_image_url: string;
	current_price: string;
	min_price_last_30: string;
	absolute_url: string;
}

export interface ProductsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Product[];
}

export interface ProductCategory {
	id: number;
	name: string;
	slug: string;
}

export interface ProductDetails {
	id: number;
	name: string;
	slug: string;
	category: ProductCategory;
	description: string;
	qty: number;
	full_image_url: string;
	current_price: string;
	min_price_last_30: string;
	absolute_url: string;
}

export interface ProductDetailsResponse {
	id: number;
	name: string;
	slug: string;
	category: Category;
	description: string;
	qty: number;
	full_image_url: string;
	current_price: number;
	min_price_last_30: number;
	absolute_url: string;
}

export interface CategoryMetaData {
	name: string;
	description: string;
}

export interface GetCategoryMetaDataResponse {
	data: CategoryMetaData;
	status: number;
}
