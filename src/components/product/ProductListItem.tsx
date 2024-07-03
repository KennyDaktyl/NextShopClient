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

export const ProductListItemContainer = ({ product }: { product: ProductListItem }) => {
	const productImage = getProductImage(product, 350, 350);
	return (
		<Link
			role="link"
			href={product.absolute_url}
			aria-current="page"
			className="mb-8 w-full sm:mb-4 md:w-[350px]"
		>
			<Card
				key={product.id}
				className="product-list-item w-full cursor-pointer bg-slate-50 hover:bg-slate-100"
			>
				<CardContent className="m-0 p-0">
					<div className="flex items-center justify-center overflow-hidden md:h-[350px] md:w-[350px]">
						<Image
							src={productImage.url}
							alt={productImage.alt ? productImage.alt : ""}
							title={productImage.title ? productImage.title : ""}
							className="rounded-md object-cover"
							width={productImage.width}
							height={productImage.height}
						/>
					</div>
				</CardContent>
				<CardHeader className="m-0 pl-1 pr-0 pt-2">
					<CardTitle className="text-md">{product.name}</CardTitle>
					<CardDescription className="text-sm">{product.category.name}</CardDescription>
				</CardHeader>
				<CardFooter className="m-0 pb-2 pl-1 pr-0 pt-2">
					<p className="text-sm">
						Cena: <span className="text-bold">{formatMoney(product.current_price)}</span>
					</p>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductListItemContainer;
