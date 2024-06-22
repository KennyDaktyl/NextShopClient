import { getProductDetails } from "./actions";

export default async function Page({
	params,
}: {
	params: { categorySlug: string; productSlug: string };
}) {
	const response = await getProductDetails(params.categorySlug, params.productSlug);
	const product = response.data;
	return (
		<div>
			<h1>{product.name}</h1>
			<h1>{product.id}</h1>
		</div>
	);
}
