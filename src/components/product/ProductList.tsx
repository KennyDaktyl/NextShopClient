import { ProductListItem } from "./ProductListItem";

interface Product {
	id: string;
	name: string;
	slug: string;
	current_price: number;
	full_image_url: string;
	category: {
		id: string;
		name: string;
		slug: string;
	};
}

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
			className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => (
				<ProductListItem
					key={product.id}
					id={product.id}
					name={product.name}
					slug={product.slug}
					category={product.category}
					price={product.current_price}
					image={{ url: product.full_image_url, alt: product.name }}
				/>
			))}
		</ul>
	);
};

export default ProductList;
