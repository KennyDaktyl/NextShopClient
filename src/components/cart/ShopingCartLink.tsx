import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const ShopingCartLink = () => {
	return (
		<Link href="/koszyk" className="group m-2 flex h-full items-center p-2">
			<ShoppingCart className="ml-4 h-6 w-6 flex-shrink" aria-hidden="true" />
		</Link>
	);
};
