import NavBar from "../components/ui/organism/NavBar";
import BreadCrumbs from "../components/ui/atoms/BreadCrumbs";
import { NextAuthProvider } from "../components/auth/next-auth-provider";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "Pieczątki firmowe",
	description: "Zamów pieczątki firmowe online",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body className={montserrat.className} cz-shortcut-listen="false">
				<NextAuthProvider>
					<NavBar />
				</NextAuthProvider>
				<div className="mx-auto mt-1 max-w-screen-xl p-5 md:p-0">
					<BreadCrumbs />
				</div>
				<main className="mx-auto mt-10 min-h-screen max-w-screen-xl p-5 md:p-0">{children}</main>
				<footer className="mx-auto max-w-md text-center">&copy;2024</footer>
			</body>
		</html>
	);
}
