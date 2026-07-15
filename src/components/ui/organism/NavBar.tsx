"use client";

import { Suspense, useState } from "react";
import { ChevronDown, Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ActiveLink } from "../atoms/ActiveLink";
import AuthIcons from "@/components/auth/auth-icons";
import SearchToggle from "@/components/ui/atoms/SearchToggle";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ProductsMegaMenuContent from "./ProductsMegaMenuContent";
import MobileServicesMenuContent from "./MobileServicesMenuContent";
import { MegaMenuSection } from "@/api/getProductsMegaMenu";
import { formatMoney } from "@/utils";

type NavBarProps = {
	totalPrice: number;
	productsMenu: MegaMenuSection[];
};

const triggerClassName =
	"group inline-flex items-center gap-1 border-b-2 border-transparent py-1 text-[15px] font-medium text-gray-900 transition hover:text-gray-600 data-[state=open]:text-gray-600";

export default function NavBar({ totalPrice, productsMenu }: NavBarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [mobileSection, setMobileSection] = useState<"produkty" | "uslugi" | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
		setMobileSection(null);
	};

	const toggleMobileSection = (section: "produkty" | "uslugi") => {
		setMobileSection((prev) => (prev === section ? null : section));
	};

	return (
		<nav className="fixed top-0 z-50 w-full bg-white shadow-md md:p-0">
			<div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between p-5 xl:pl-0 xl:pr-0">
				<div className="flex items-center gap-8">
					<ActiveLink role="link" href="/" aria-label="Przejdź do strony głównej">
						<Image src="/images/logo-serwiswrybnej-pl.webp" alt="Logo serwiswrybnej.pl" width={96} height={48} />
					</ActiveLink>

					<NavigationMenu className="hidden xl:block" delayDuration={100}>
						<NavigationMenuList className="gap-6">
							<NavigationMenuItem>
								<NavigationMenuTrigger className={triggerClassName}>
									Produkty
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ProductsMegaMenuContent sections={productsMenu} />
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger className={triggerClassName}>
									Usługi mobilne
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<MobileServicesMenuContent />
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<ActiveLink role="link" href="/blog" exact>
									Blog
								</ActiveLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<ActiveLink role="link" href="/kontakt" exact>
									Kontakt
								</ActiveLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="hidden items-center gap-2 xl:flex">
					<Suspense>
						<SearchToggle />
					</Suspense>
					<Link
						href="/koszyk"
						className="group m-2 flex h-full items-center p-2"
						aria-label={`Koszyk, łączna kwota: ${formatMoney(totalPrice)}`}
					>
						<Suspense>
							<ShoppingCart className="ml-2 h-6 w-6 flex-shrink" aria-hidden="true" />
							<span className="w-20 text-right">{formatMoney(totalPrice)}</span>
						</Suspense>
					</Link>
					<AuthIcons />
				</div>

				<div className="flex items-center gap-2 xl:hidden">
					<Suspense>
						<SearchToggle />
					</Suspense>
					<Link
						href="/koszyk"
						className="group relative m-2 flex h-full items-center p-2 text-center"
						aria-label={`Koszyk, łączna kwota: ${formatMoney(totalPrice)}`}
					>
						<Suspense>
							<ShoppingCart className="h-6 w-6 flex-shrink text-center" aria-hidden="true" />
							<span className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border border-black bg-white p-1 text-xs text-black">
								{formatMoney(totalPrice)}
							</span>
						</Suspense>
					</Link>
					<button
						onClick={toggleMenu}
						aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Fullscreen mobile menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white">
					<div className="sticky top-0 flex h-24 w-full flex-shrink-0 items-center justify-between bg-white p-5 text-xl font-bold shadow-md">
						<ActiveLink role="link" href="/" aria-label="Przejdź do strony głównej">
							<Image src="/images/logo-serwiswrybnej-pl.webp" alt="Logo serwiswrybnej.pl" width={96} height={48} />
						</ActiveLink>
						<button onClick={toggleMenu} aria-label="Zamknij menu" aria-expanded={isMenuOpen}>
							<X size={24} />
						</button>
					</div>

					<div className="flex flex-1 flex-col gap-2 px-5 py-6">
						<div className="border-b border-gray-100 pb-2">
							<button
								type="button"
								onClick={() => toggleMobileSection("produkty")}
								className="flex w-full items-center justify-between py-3 text-xl font-semibold"
								aria-expanded={mobileSection === "produkty"}
							>
								Produkty
								<ChevronDown
									className={`h-5 w-5 transition-transform ${
										mobileSection === "produkty" ? "rotate-180" : ""
									}`}
									aria-hidden="true"
								/>
							</button>
							{mobileSection === "produkty" && (
								<ProductsMegaMenuContent sections={productsMenu} onNavigate={toggleMenu} />
							)}
						</div>

						<div className="border-b border-gray-100 pb-2">
							<button
								type="button"
								onClick={() => toggleMobileSection("uslugi")}
								className="flex w-full items-center justify-between py-3 text-xl font-semibold"
								aria-expanded={mobileSection === "uslugi"}
							>
								Usługi mobilne
								<ChevronDown
									className={`h-5 w-5 transition-transform ${
										mobileSection === "uslugi" ? "rotate-180" : ""
									}`}
									aria-hidden="true"
								/>
							</button>
							{mobileSection === "uslugi" && (
								<MobileServicesMenuContent onNavigate={toggleMenu} />
							)}
						</div>

						<div className="py-3 text-xl font-semibold">
							<ActiveLink role="link" href="/blog" exact>
								<span onClick={toggleMenu}>Blog</span>
							</ActiveLink>
						</div>
						<div className="py-3 text-xl font-semibold">
							<ActiveLink role="link" href="/kontakt" exact>
								<span onClick={toggleMenu}>Kontakt</span>
							</ActiveLink>
						</div>
					</div>

					<div className="flex justify-center pb-10" onClick={toggleMenu}>
						<AuthIcons />
					</div>
				</div>
			)}
		</nav>
	);
}
