import { DEFAULT_IMAGE_URL, formatMoney } from "@/utils";
import { ProductDetails } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import { QuantityControl } from "@/components/cart/ QuantityControl";
import { Button } from "@/components/ui/button";

export const ProductDetailsComponent = ({ product }: { product: ProductDetails }) => {
	const images =
		product.images.length > 0
			? product.images
			: [
					{
						id: 0,
						image_url: DEFAULT_IMAGE_URL,
						alt: product.name,
						title: product.name,
						width: 650,
						height: 650,
					},
				];
	return (
		<div className="relative flex w-full min-w-full flex-wrap items-start justify-center rounded-lg bg-white shadow-lg">
			<ButtonBack />
			<div className="w-full md:w-2/3">
				<CarouselPlugin images={images} />
			</div>
			<div className="w-full p-4 md:w-1/3">
				<h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
				<span className="mb-4 block text-sm text-gray-500">{product.category.name}</span>
				<p className="mb-4">{product.description}</p>
				<p className="mb-1 text-xl font-semibold">Cena: {formatMoney(product.current_price)}</p>
				<small className="mb-4 block">
					Cena z ostatnich 30 dni: {formatMoney(product.min_price_last_30)}
				</small>
				<QuantityControl maxQuantity={product.qty} />
				<p className="mb-4">Dostępna ilość: {product.qty}</p>
				<Button className="w-full rounded-md text-white transition hover:bg-gray-500">
					Dodaj do koszyka
				</Button>
			</div>
		</div>
	);
};

export default ProductDetailsComponent;
