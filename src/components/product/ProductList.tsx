import { ProductListItem } from "@/app/types";
import ProductListItemContainer from "@/components/product/ProductListItem";

export const ProductList = ({
	products,
	containerName,
}: {
	products: ProductListItem[];
	containerName: string;
}) => {
	return (
		<ul
			data-testid={containerName}
			className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-4 md:pl-4 xl:grid-cols-3"
		>
			{products.map((product) => (
				<ProductListItemContainer key={product.id} product={product} />
			))}
		</ul>
	);
};

export default ProductList;
