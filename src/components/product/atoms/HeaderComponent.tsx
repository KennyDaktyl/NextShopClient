import { ProductDetails } from "@/app/types";

const HeaderComponent = ({ product }: { product: ProductDetails }) => (
	<div>
		<h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
		<span className="mb-4 block text-sm text-gray-500">{product.category.name}</span>
	</div>
);

export default HeaderComponent;
