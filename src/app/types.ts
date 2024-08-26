import { UUID } from "crypto";

export interface MenuItem {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	seo_text: string | null;
	has_parent: boolean;
	is_parent: boolean;
	products_count: number;
	has_children: boolean;
	full_path: string;
	back_link: string;
	image: Image | null;
}

export interface MenuItemsResponse {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	seo_text: string | null;
	back_link: string;
	has_children: boolean;
	full_path: string;
	image: Image | null;
	items: MenuItem[];
	status: number;
}
export interface Category {
	image: Image | null;
	name: string;
	description: string | null;
	seo_text: string | null;
	slug: string;
}

export interface CategoryDetailsProps {
	name: string;
	description: string;
	seo_text: string;
	image: Image | null;
	items: MenuItem[];
}

export interface Image {
	id: number;
	url: string;
	alt: string | null;
	title: string | null;
	width: number;
	height: number;
}

export interface ProductListItem {
	id: string;
	name: string;
	slug: string;
	qty: number;
	category: Category;
	description: string;
	image: Image | null;
	current_price: number;
	min_price_last_30: number;
	full_path: string;
	variant_label: string;
	show_variant_label: boolean;
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
	seo_text: string | null;
	qty: number;
	image: Image;
	current_price: number;
	min_price_last_30: number;
	full_: string;
}

export interface ProductsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ProductListItem[];
}

export interface CartTotalPrice {
	total_price: number;
}

export interface CartItem {
	id: number;
	item_id: UUID;
	slug: string;
	name: string;
	price: number;
	quantity: number;
	available_quantity: number;
	variant: string;
	selected_option: string;
	image: Image | null;
	url: string;
}

export interface CartItems {
	cart_items: CartItem[];
}

export interface ErrorResponse {
	status: number;
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
	tags: Tag[] | [];
	is_main: boolean;
}

export interface VariantList {
	id: number;
	name: string;
	slug: string;
	color: string;
	size: Size | null;
}

export interface Option {
	id: number;
	name: string;
}

export interface ProductOption {
	id: number;
	name: string;
	options: Option[];
}

export interface ProductDetails {
	id: number;
	name: string;
	slug: string;
	category: ProductCategory;
	description: string;
	seo_text: string | null;
	qty: number;
	images: Image[] | [];
	color: string;
	tags: Tag[] | [];
	size: Size | null;
	brand: Size | null;
	material: Size | null;
	current_price: number;
	min_price_last_30: number;
	full_path: string;
	variant_label: string;
	show_variant_label: boolean;
	variants: Variant[];
	product_option: ProductOption;
	free_delivery: boolean;
}

export interface CategoryMetaData {
	name: string;
	description: string;
	seo_text: string | null;
	has_children: boolean;
	full_path: string;
}

export interface GetCategoryMetaDataResponse {
	data: CategoryMetaData;
	status: number;
}

export interface ImageItem {
	id: number;
	width: number;
	height: number;
	url: string;
	alt: string | null;
	title: string | null;
}

export interface CategoryItem {
	id: number;
	name: string;
	slug: string;
	description: string;
	seo_text: string | null;
	has_parent: boolean;
	is_parent: boolean;
	products_count: number;
	has_children: boolean;
	full_path: string;
	back_link: string;
	image: ImageItem | null;
	items: CategoryItem[];
}

export interface BackLinkProps {
	full_path: string | null;
}

export interface CartResponse {
	cart_id: string;
	cart_items: CartItem[];
}

export interface SubCategoryOnFirstPage {
	id: number;
	name: string;
	slug: string;
	description: string;
	seo_text: string | null;
	products_count: number;
	full_path: string;
}

export interface CategoryOnFirstPage {
	id: number;
	name: string;
	slug: string;
	description: string;
	seo_text: string | null;
	image: Image | null;
	full_path: string;
	products_on_first_page: ProductListItem[];
	all_subcategories: SubCategoryOnFirstPage[];
}

export interface Hero {
	id: number;
	title: string;
	description: string;
	image: Image | null;
	link: string | null;
	link_text: string | null;
	is_active: boolean;
}

export interface FirstPageDataResponse {
	categories: CategoryOnFirstPage[];
	heros: Hero[];
}

export interface SendEmailVariables {
	title: string;
	email: string;
	message: string;
}

export interface SendEmailResponse {
	message: string;
}

export interface DeliveryMethod {
	id: number;
	name: string;
	image: Image;
	price: number;
	price_promo: number;
	inpost_box: boolean;
	in_store_pickup: boolean;
}

export interface ApiResponse {
	deliveryMethods: DeliveryMethod[];
}

export interface PaymentMethod {
	id: number;
	name: string;
	image: Image;
	price: number;
	payment_on_delivery: boolean;
}

export interface PaymentMethods {
	paymentMethods: PaymentMethod[];
}

export interface UserData {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	profile: null;
}

export interface CategoryPath {
	full_path: string;
}

export interface ProductPath {
	full_path: string;
}

export interface MappedProduct {
	id: string;
	name: string;
	images: Image[];
	description?: string;
	seo_text?: string;
	current_price: number;
	qty: number;
	full_path: string;
}
