import { ReactNode } from "react";

interface ProductLayoutProps {
	children: ReactNode;
}

const ProductLayout = ({ children }: ProductLayoutProps) => {
	return (
		<div className="flex w-full max-w-screen-xl flex-wrap items-start justify-between">
			{children}
		</div>
	);
};

export default ProductLayout;
