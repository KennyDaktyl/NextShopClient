import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

// const font = Poppins({
// 	subsets: ["latin"],
// 	weight: ["600"],
// });

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-y-4">
			<h1 className="text-3xl, font-semibold">Autoryzacja</h1>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
};
