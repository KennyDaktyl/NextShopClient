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
import { Badge } from "lucide-react";

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

export const ProductListItemContainer = ({ product }: { product: ProductListItem }) => {
	const productImage = getProductImage(product, 350, 350);
	return (
		<Link
			role="link"
			href={product.absolute_url}
			aria-current="page"
			className="mb-8 w-[150px] cursor-pointer sm:mb-4 md:w-[346px]"
		>
			<Card
				key={product.id}
				className="product-list-item h-[350px] w-full overflow-hidden bg-slate-50 md:h-[490px]"
			>
				<CardContent className="m-0 p-0">
					<div className="flex h-[200px] items-center justify-center overflow-hidden md:h-[330px] md:w-[350px]">
						<Image
							src={productImage.url}
							alt={productImage.alt ? productImage.alt : ""}
							title={productImage.title ? productImage.title : ""}
							className="h-[150px] w-[150px] rounded-md object-cover md:h-[330px] md:w-[350px]"
							width={productImage.width}
							height={productImage.height}
						/>
					</div>
				</CardContent>
				<CardHeader className="z-10 p-1">
					<CardTitle className="text-md h-[40px] text-sm">{product.name}</CardTitle>
					<CardDescription className="h-[20px] text-xs">{product.category.name}</CardDescription>
				</CardHeader>
				<CardFooter className="m-0 pb-2 pl-1 pr-0 pt-2">
					<p className="text-sm">
						Cena: <span className="text-bold">{formatMoney(product.current_price)}</span>
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

export default ProductListItemContainer;
