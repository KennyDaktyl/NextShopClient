import BreadCrumbs from "../components/ui/organism/BreadCrumbs";
import { NextAuthProvider } from "../components/auth/next-auth-provider";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ServerNavBar from "@/components/ui/organism/ServerNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "@/components/ui/organism/Footer";
import Script from "next/script";
import CookiesModal from "@/components/front/CookiesModal";
import { JsonLd, mappedMainMenuItemsToJsonLd } from "@/components/seo/LdJson";

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
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
			<head>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-7TMZLLG9YZ"
					strategy="lazyOnload"
				/>
				<Script id="google-analytics" strategy="lazyOnload">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-7TMZLLG9YZ');
					`}
				</Script>
				<link rel="icon" href="/images/favicon-180x180.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/images/favicon-180x180.png" />
			</head>
			<body className={montserrat.className} cz-shortcut-listen="false">
				<NextAuthProvider>
					<ServerNavBar />
				</NextAuthProvider>
				<main className="mx-auto mt-24 min-h-screen max-w-screen-xl overflow-hidden pl-5 pr-5 xl:pl-0 xl:pr-0">
					<BreadCrumbs />
					{children}
				</main>
				<CookiesModal />
				<Footer />
				<ToastContainer />
				{modal}
				<JsonLd jsonLd={mappedMainMenuItemsToJsonLd()} />
			</body>
		</html>
	);
}
