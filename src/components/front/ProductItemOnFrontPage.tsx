import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatMoney, getProductImage } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { ProductListItem } from "@/app/types";

const COLOR_CLASSES: { [key: string]: string } = {
	"Brak koloru": "bg-gray-300 text-gray-800",
	Biały: "bg-white text-gray-800",
	Szary: "bg-gray-500 text-white",
	Czerwony: "bg-red-500 text-white",
	Niebieski: "bg-blue-500 text-white",
	Zielony: "bg-green-500 text-white",
	Żółty: "bg-yellow-500 text-gray-800",
	Pomarańczowy: "bg-orange-500 text-white",
	Brązowy: "bg-brown-500 text-white",
	Różowy: "bg-pink-500 text-white",
	Fioletowy: "bg-purple-500 text-white",
	Beżowy: "bg-orange-100	text-gray-800",
	Czarny: "bg-black text-white",
};

export const ProductItemOnFrontPageContainer = ({ product }: { product: ProductListItem }) => {
	const productImage = getProductImage(product, 350, 350);
	return (
		<Link
			role="link"
			href={product.full_path}
			aria-current="page"
			className="mb-8 cursor-pointer pl-1 pr-1 sm:mb-4"
		>
			<Card
				key={product.id}
				className="product-list-item h-[320px] w-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg md:h-[520px]"
			>
				<CardContent className="m-0 p-0">
					<div className="] flex h-[150px] items-center justify-center overflow-hidden md:h-[350px]">
						<Image
							loading="lazy"
							src={productImage.url}
							alt={productImage.alt ? productImage.alt : ""}
							title={productImage.title ? productImage.title : ""}
							className="rounded-md object-cover"
							width={productImage.width}
							height={productImage.height}
						/>
					</div>
				</CardContent>
				<CardHeader className="z-10 p-1">
					<CardTitle className="text-md h-[70px] text-sm font-semibold text-gray-800">
						{product.name}
					</CardTitle>
					<CardDescription className="h-[20px] text-xs text-gray-500">
						{product.category.name}
					</CardDescription>
				</CardHeader>
				<CardFooter className="m-0 pb-2 pl-1 pr-0 pt-2">
					<p className="text-sm">
						Cena:{" "}
						<span className="text-bold text-gray-900">{formatMoney(product.current_price)}</span>
					</p>
				</CardFooter>
				<div className="flex w-full items-center justify-start p-1">
					{product.variants.map((variant) => (
						<div
							key={"variant_key" + "_" + variant.id + "_" + product.id + "_" + variant.color}
							className={`mb-2 mr-2 cursor-pointer rounded-full ${COLOR_CLASSES[variant.color]}`}
							style={{ width: "20px", height: "20px" }}
						></div>
					))}
				</div>
			</Card>
		</Link>
	);
};

export default ProductItemOnFrontPageContainer;
