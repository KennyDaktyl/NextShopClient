"use client";

import { Button } from "@/components/ui/button";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect", asChild = false }: LoginButtonProps) => {
	const onClick = () => {
		console.log("LoginButton clicked");
	};

	if (mode === "modal") {
		return <span>TODO: Implement modal login</span>;
	}
	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
