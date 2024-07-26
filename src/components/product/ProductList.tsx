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
		<div>
			{products.length > 0 ? (
				<ul
					data-testid={containerName}
					className="flex w-full grid-cols-2 flex-wrap gap-4 sm:grid-cols-3 xl:grid-cols-3"
				>
					{products.map((product) => (
						<ProductListItemContainer key={product.id} product={product} />
					))}
				</ul>
			) : (
				<p className="w-full text-center text-gray-500">Brak produktów w kategorii</p>
			)}
		</div>
	);
};

export default ProductList;
