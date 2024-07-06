"use client";
import BreadcrumbsForProductPage from "@/components/product/ProductBreadcrumbs";
import { ReactNode } from "react";

interface ProductLayoutProps {
	children: ReactNode;
	pageProps: any;
}

export const ProductLayout = ({ children }: ProductLayoutProps) => {
	return (
		<div className="flex w-full max-w-screen-xl flex-wrap items-start justify-between">
			{children}
		</div>
	);
};

export default ProductLayout;
