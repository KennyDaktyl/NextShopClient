import { ProductListItem } from "./ProductListItem";

export const ProductList = ({
	products,
	containerName,
}: {
	products: Product[];
	containerName: string;
}) => {
	return (
		<ul
			data-testid={containerName}
			className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-4 md:pl-4 xl:grid-cols-3"
		>
			{products.map((product) => (
				<ProductListItem
					key={product.id}
					id={product.id}
					link={product.absolute_url}
					name={product.name}
					category={product.category.name}
					price={product.current_price}
					image={{ url: product.full_image_url, alt: product.name }}
				/>
			))}
		</ul>
	);
};

export default ProductList;
