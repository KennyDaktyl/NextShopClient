"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { ActiveLink } from "../atoms/ActiveLink";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import AuthIcons from "@/components/auth/auth-icons";
import { formatMoney } from "@/utils";
import SearchInput from "@/components/ui/atoms/SearchInput";
import Image from "next/image";

type NavLink = {
	href: string;
	role: string;
	label: string;
	exact: boolean;
};

const NavLinks: NavLink[] = [
	{ href: "/produkty", label: "Produkty", exact: true, role: "link" },
	{ href: "/uslugi", label: "Usługi", exact: true, role: "link" },
	{ href: "/blog", label: "Blog", exact: true, role: "link" },
	{ href: "/kontakt", label: "Kontakt", exact: true, role: "link" },
];

type NavBarProps = {
	totalPrice: number;
};

export default function NavBar({ totalPrice }: NavBarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchVisible, setSearchVisible] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const toggleSearch = () => setSearchVisible(!isSearchVisible);

	const closeSearch = () => {
		setSearchVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				closeSearch();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white shadow-md md:p-0">
			<div className="mx-auto bg-red-500 p-2 text-center text-white">
				<p className="font-bold">
					Uwaga przerwa urlopowa!!! Sklep nieczynny w dniach 12-07-2025 do 27-07-2025
				</p>
			</div>
			<div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between p-5 xl:pl-0 xl:pr-0">
				<div className="flex items-center">
					<div className="text-xl font-bold">
						<ActiveLink role="link" href="/" aria-label="Przejdź do strony głównej">
							<Image
								src="/images/logo-serwiswrybnej-pl.webp"
								// src="/images/favicon-180x180.png"
								alt="Logo serwiswrybnej.pl"
								width={96}
								height={48}
							/>
						</ActiveLink>
					</div>
					<ul className="ml-4 hidden h-16 flex-wrap items-center justify-start space-x-4 xl:flex">
						{NavLinks.map((link, index) => (
							<li
								key={index}
								className="ml-2 flex items-center border-b-2 border-transparent text-center"
							>
								<ActiveLink role={link.role} href={link.href} exact={link.exact}>
									<span>{link.label}</span>
								</ActiveLink>
							</li>
						))}
					</ul>
				</div>

				<div className="hidden items-center xl:flex">
					<Suspense>
						<SearchInput isSearchVisible={isSearchVisible} closeSearch={closeSearch} />
					</Suspense>
					<Link
						href="/koszyk"
						className="group m-2 flex h-full items-center p-2"
						aria-label={`Koszyk, łączna kwota: ${formatMoney(totalPrice)}`}
					>
						<Suspense>
							<ShoppingCart className="ml-4 h-6 w-6 flex-shrink" aria-hidden="true" />
							<span className="w-20 text-right">{formatMoney(totalPrice)}</span>
						</Suspense>
					</Link>
					<AuthIcons />
				</div>
				<div className="flex items-center xl:hidden" ref={searchRef}>
					<Suspense>
						<Search
							size={20}
							className={`cursor-pointer ${isSearchVisible ? "hidden" : "block"}`}
							onClick={toggleSearch}
							aria-label="Otwórz wyszukiwanie"
							role="button"
							aria-expanded={isSearchVisible}
						/>
						<div
							className={`absolute left-0 top-1/2 z-50 -translate-y-1/2 transform pl-5 ${
								isSearchVisible ? "block" : "hidden"
							}`}
						>
							<SearchInput isSearchVisible={isSearchVisible} closeSearch={closeSearch} />
						</div>
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
							<span className="sr-only hidden md:block"></span>
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
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
					<div className="absolute left-0 top-0 z-50 flex h-24 w-full items-center justify-between bg-white p-5 text-xl font-bold shadow-md md:pl-0 md:pr-0">
						<ActiveLink role="link" href="/" aria-label="Przejdź do strony głównej">
							<Image
								src="/images/logo-serwiswrybnej-pl.webp"
								alt="Logo serwiswrybnej.pl"
								width={96}
								height={48}
							/>
						</ActiveLink>
						<button onClick={toggleMenu} aria-label="Zamknij menu" aria-expanded={isMenuOpen}>
							<X size={24} />
						</button>
					</div>
					<ul className="space-y-4 text-center">
						{NavLinks.map((link, index) => (
							<li key={index} className="text-xl">
								<ActiveLink role={link.role} href={link.href} exact={link.exact}>
									<span onClick={toggleMenu}>{link.label}</span>
								</ActiveLink>
							</li>
						))}
					</ul>
					<div className="absolute bottom-10 text-center" onClick={toggleMenu}>
						<AuthIcons />
					</div>
				</div>
			)}
		</nav>
	);
}
