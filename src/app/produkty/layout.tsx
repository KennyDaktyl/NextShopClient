"use client";
import { ReactNode } from "react";

interface CategoryLayoutProps {
	children: ReactNode;
}

export const CategoryLayout = ({ children }: CategoryLayoutProps) => {
	return <div className="flex w-full max-w-screen-xl justify-between">{children}</div>;
};

export default CategoryLayout;
