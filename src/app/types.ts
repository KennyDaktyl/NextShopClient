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
	image_list_item: Image | null;
}

export interface MenuItemsResponse {
	name: string;
	slug: string;
	back_link: string;
	has_children: boolean;
	image_list_item: Image | null;
	description: string | null;
	items: MenuItem[];
}

export interface Category {
	id: number;
	name: string;
	slug: string;
}

export interface Image {
	id: number;
	image_url: string;
	alt: string | null;
	title: string | null;
	width: number;
	height: number;
}

export interface ProductListItem {
	id: string;
	name: string;
	slug: string;
	category: Category;
	description: string;
	qty: number;
	image_list_item: Image | null;
	current_price: number;
	min_price_last_30: number;
	absolute_url: string;
	variants: VariantList[];
}

export interface Tag {
	id: number;
	name: string;
}

export interface Brand {
	id: number;
	name: string;
}

export interface Material {
	id: number;
	name: string;
}

export interface Size {
	id: number;
	name: string;
}

export interface Product {
	id: string;
	name: string;
	slug: string;
	category: Category;
	description: string;
	qty: number;
	image: Image;
	current_price: number;
	min_price_last_30: number;
	absolute_url: string;
}

export interface ProductsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ProductListItem[];
}

export interface ProductCategory {
	id: number;
	name: string;
	slug: string;
	full_path: string;
}

export interface Variant {
	id: number;
	name: string;
	slug: string;
	qty: number;
	images: Image[] | [];
	color: string;
	size: Size | null;
	brand: Brand | null;
	material: Material | null;
}

export interface VariantList {
	id: number;
	name: string;
	slug: string;
	color: string;
	size: Size | null;
}

export interface ProductDetails {
	id: number;
	name: string;
	slug: string;
	category: ProductCategory;
	description: string;
	qty: number;
	images: Image[] | [];
	color: string;
	tags: Tag[] | [];
	size: Size | null;
	brand: Size | null;
	material: Size | null;
	current_price: number;
	min_price_last_30: number;
	absolute_url: string;
	variants: Variant[];
}

export interface CategoryMetaData {
	name: string;
	description: string;
}

export interface GetCategoryMetaDataResponse {
	data: CategoryMetaData;
	status: number;
}

export interface ImageItem {
	id: number;
	width: number;
	height: number;
	image_url: string;
	alt: string | null;
	title: string | null;
}

export interface CategoryItem {
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
	image_list_item: ImageItem | null;
}

export interface CategoryItem {
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
	image_list_item: ImageItem | null;
	items: CategoryItem[];
}

export interface MenuItemsResponse {
	name: string;
	slug: string;
	description: string | null;
	back_link: string;
	has_children: boolean;
	full_path: string;
	image_list_item: Image | null;
	items: MenuItem[];
}

export interface BackLinkProps {
	full_path: string | "/";
}
