"use client";
import { ReactNode } from "react";

interface CategoryLayoutProps {
	children: ReactNode;
}

export const CategoryLayout = ({ children }: CategoryLayoutProps) => {
	return <div className="flex">{children}</div>;
};

export default CategoryLayout;
