"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocials: boolean;
}

export const CardWrapperRegister = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocials,
}: CardWrapperProps) => {
	return (
		<Card className="w-[400px] border-emerald-50 bg-slate-100 shadow-xl">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{/* {showSocials && (
				<CardFooter>
					<Social />
				</CardFooter>
			)} */}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};
