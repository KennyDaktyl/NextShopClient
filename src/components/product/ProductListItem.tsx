import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatMoney } from "@/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import Image from "next/image";

export const ProductListItem = ({
	id,
	name,
	link,
	price,
	image,
	category,
}: {
	id: string;
	name: string;
	link: string;
	price: number;
	category: string;
	image: {
		url: string;
		alt: string;
	};
}) => {
	return (
		<Link role="link" href={link} aria-current="page" className="mb-8 sm:mb-4 md:w-[350px]">
			<Card
				key={id}
				className="product-list-item w-full cursor-pointer bg-slate-50 hover:bg-slate-100"
			>
				<CardContent className="m-0 p-0">
					<AspectRatio ratio={1 / 1} className="bg-muted overflow-hidden">
						<Image src={image.url} alt={image.alt} className="rounded-md object-cover" fill />
					</AspectRatio>
				</CardContent>
				<CardHeader className="m-0 pl-1 pr-0 pt-2">
					<CardTitle className="text-md">{name}</CardTitle>
					<CardDescription className="text-sm">{category}</CardDescription>
				</CardHeader>
				<CardFooter className="m-0 pb-2 pl-1 pr-0 pt-2">
					<p className="text-sm">
						Cena: <span className="text-bold">{formatMoney(price)}</span>
					</p>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductListItem;
