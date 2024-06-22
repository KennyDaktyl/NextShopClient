import { type ReactNode } from "react";

export default function CategoryLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<h1>Kategoria test layoutu</h1>
			{children}
		</div>
	);
}
