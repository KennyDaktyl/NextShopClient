import BreadCrumbs from "../components/ui/organism/BreadCrumbs";
import { NextAuthProvider } from "../components/auth/next-auth-provider";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ServerNavBar from "@/components/ui/organism/ServerNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "@/components/ui/organism/Footer";

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title:
		"Pieczątki Firmowe i Dorabianie Kluczy | Profesjonalne Pieczątki i Klucze do Skrzynek Energetycznych – Serwis w Rybnej",
	description: "Serwis w Rybnej. Usługi i produkty. Sprawdź naszą ofertę!",
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
	alternates: {
		canonical: "/",
		languages: {
			"pl-PL": "/pl-PL",
		},
	},
	robots: "index, follow",
};

export default function Layout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body className={montserrat.className} cz-shortcut-listen="false">
				<NextAuthProvider>
					<ServerNavBar />
				</NextAuthProvider>
				<main className="mx-auto mt-24 min-h-screen max-w-screen-xl overflow-hidden pl-5 pr-5 xl:pl-0 xl:pr-0">
					<BreadCrumbs />
					{children}
				</main>
				<Footer />
				<ToastContainer />
				{modal}
			</body>
		</html>
	);
}
