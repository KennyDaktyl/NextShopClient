const ProductsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	return (
		<div>
			<h1>Regulamin</h1>
		</div>
	);
};

export default ProductsPage;
