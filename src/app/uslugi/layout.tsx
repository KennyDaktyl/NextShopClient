"use client";
import { ReactNode } from "react";

interface CategoryLayoutProps {
	children: ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps): JSX.Element {
	return <div className="flex w-full max-w-screen-xl items-start justify-between">{children}</div>;
}
