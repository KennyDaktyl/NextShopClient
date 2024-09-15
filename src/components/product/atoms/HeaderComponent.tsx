import { ProductDetails } from "@/app/types";

const HeaderComponent = ({ product }: { product: ProductDetails }) => (
	<div className="w-full">
		<h1 className="tx:xl mb-2 w-full text-center font-bold uppercase sm:text-2xl">
			{product.h1_tag ? product.h1_tag : product.name}
		</h1>
	</div>
);

export default HeaderComponent;
