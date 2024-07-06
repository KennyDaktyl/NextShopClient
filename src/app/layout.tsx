import NavBar from "../components/ui/organism/NavBar";
import BreadCrumbs from "../components/ui/organism/BreadCrumbs";
import { NextAuthProvider } from "../components/auth/next-auth-provider";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "Serwis w Rybnej. Usługi i produkty",
	description: "Serwis w Rybnej. Usługi i produkty. Sprawdź naszą ofertę!",
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
	alternates: {
		canonical: "/",
		languages: {
			"pl-PL": "/pl-PL",
		},
	},
	robots: "index, no-follow",
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
				<main className="mx-auto min-h-screen max-w-screen-xl overflow-hidden pl-5 pr-5 md:p-0 xl:mt-3">
					{children}
				</main>
				<footer className="mt-4 h-28 w-full bg-gray-100 text-center">&copy;2024</footer>
			</body>
		</html>
	);
}
