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
import COLOR_CLASSES from "../../constans/colorClasses";

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
						<Badge
							key={"variant_key" + "_" + variant.id + "_" + product.id + "_" + variant.color}
							className={`mb-2 mr-2 cursor-pointer rounded-full p-2 ${COLOR_CLASSES[variant.color]}`}
						></Badge>
					))}
				</div>
			</Card>
		</Link>
	);
};

export default ProductListItemContainer;
