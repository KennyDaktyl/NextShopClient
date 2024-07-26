import { ProductDetails } from "@/app/types";

const HeaderComponent = ({ product }: { product: ProductDetails }) => (
	<div>
		<h1 className="tx:xl mb-2 font-bold sm:text-2xl">{product.name}</h1>
		<span className="mb-4 block text-xs text-gray-500 sm:text-sm">{product.category.name}</span>
	</div>
);

export default HeaderComponent;
