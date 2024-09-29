import { info } from "console";
import { UUID } from "crypto";

export interface MenuItem {
	id: number;
	name: string;
	item_label: string;
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
	meta_title: string | null;
	meta_description: string | null;
	name: string;
	item_label: string;
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
	meta_title: string | null;
	meta_description: string | null;
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
	height_expected: number;
	width_expected: number;
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
	is_service: boolean;
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
	free_delivery: boolean;
}

export interface ProductsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ProductListItem[];
}

export interface ArticlesResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ArticleListItem[];
}

export interface ArticleResponse {
	id: number;
	name: string;
	description: string | null;
	slug: string;
	created_date: string;
	category: ProductCategory;
	content: string;
	meta_description: string;
	meta_title: string;
	image: Image;
	gallery: Image[];
	full_path: string;
}

export interface ArticleListItem {
	id: number;
	name: string;
	description: string | null;
	slug: string;
	created_date: string;
	category: ProductCategory;
	image_listing: Image;
	full_path: string;
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
	variant: string | null;
	selected_option: string | null;
	image: Image | null;
	url: string;
	info: string | null;
}

export interface CartItems {
	cart_items: CartItem[];
	free_delivery: boolean;
	free_delivery_treshold: number;
}

export interface ContactData {
	image: Image | null;
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
	meta_title: string | null;
	meta_description: string | null;
	h1_tag: string | null;
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
	free_delivery_threshold: number;
	free_delivery_threshold_passed: boolean;
}

export interface CategoryMetaData {
	name: string;
	meta_title: string | null;
	meta_description: string | null;
	description: string;
	has_children: boolean;
	full_path: string;
	image: Image | null;
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
	payment_online: boolean;
}

export interface PaymentMethods {
	paymentMethods: PaymentMethod[];
}

export interface Invoice {
	pdf: string;
}

export interface Order {
	id: string;
	order_number: string;
	created_date: string;
	amount: string;
	status: string;
	payment_method: PaymentMethod;
	delivery_method: DeliveryMethod;
	inpost_box_id: string;
	delivery_address: string;
	delivery_price: string;
	payment_price: string;
	cart_items_price: string;
	is_paid: boolean;
	cart_items: string;
	invoice: Invoice | null;
	make_invoice: boolean;
	info: string | null;
}

export interface UserData {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	profile: {
		mobile?: string;
		street?: string;
		house_number?: string;
		local_number?: string;
		postal_code?: string;
		city?: string;
		make_invoice: boolean;
		company?: string;
		company_payer?: string;
		nip?: string;
		invoice_street?: string;
		invoice_house_number?: string;
		invoice_local_number?: string;
		invoice_city?: string;
		invoice_postal_code?: string;
	};
	orders: Order[] | [];
}

export interface CategoryPath {
	full_path: string;
	modified_date: string;
}

export interface ArticlePath {
	full_path: string;
	modified_date: string;
}

export interface ProductPath {
	full_path: string;
	modified_date: string;
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

export interface newOrderResponse {
	order_uid: string;
}

export interface OrderData {
	name: string;
	email: string;
	mobile: string;
	delivery_price: string;
	payment_price: string;
	cart_items: CartItem[];
	cart_items_price: string;
	delivery_method: string;
	payment_method: string;
	amount: string;
	inpost_box_id?: string;
	info?: string;
	make_invoice: boolean;
	company?: string;
	company_payer?: string;
	nip?: string;
	invoice_street?: string;
	invoice_house_number?: string;
	invoice_local_number?: string;
	invoice_city?: string;
	invoice_postal_code?: string;
	street?: string;
	house_number?: string;
	local_number?: string;
	city?: string;
	postal_code?: string;
}

export interface ErrorResponse {
	status: number;
	message?: string;
}

export interface CartClientProps {
	cartItems: CartItem[];
	freeDelivery: boolean;
	freeDeliveryTreshold: number;
	totalPrice: number;
	deliveryMethods: DeliveryMethod[];
	paymentMethods: PaymentMethod[];
	userData?: UserData;
	accessToken?: string;
}

export interface OrderStatusResponse {
	status: number;
}

export interface StatusResponse {
	status: number;
}

export interface Window {
	gtag: (event: string, action: string, params: Record<string, any>) => void;
}
