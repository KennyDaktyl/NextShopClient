"use client";

import { useState } from "react";
import { ActiveLink } from "../atoms/ActiveLink";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import AuthIcons from "@/components/auth/auth-icons";
import { formatMoney } from "@/utils";
import SearchInput from "@/components/ui/atoms/SearchInput";

type NavLink = {
	href: string;
	role: string;
	label: string;
	exact: boolean;
};

const NavLinks: NavLink[] = [
	{
		href: "/produkty",
		label: "Produkty",
		exact: true,
		role: "link",
	},
	{
		href: "/produkty/klucze",
		label: "Usługi",
		exact: true,
		role: "link",
	},
	{
		href: "/regulamin",
		label: "Regulamin",
		exact: true,
		role: "link",
	},
];

type NavBarProps = {
	totalPrice: number;
};

export default function NavBar({ totalPrice }: NavBarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchVisible, setSearchVisible] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleSearch = () => {
		setSearchVisible(!isSearchVisible);
	};

	const closeSearch = () => {
		setSearchVisible(false);
	};

	return (
		<nav className="fixed top-0 z-50 w-full bg-white shadow-md md:p-0">
			<div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between pb-5 pl-2 pr-2 pt-5 xl:pl-0 xl:pr-0">
				<div className="flex items-center">
					<div className="text-xl font-bold">
						<ActiveLink role="link" href="/">
							Shopik
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
					<SearchInput isSearchVisible={isSearchVisible} closeSearch={closeSearch} />
					<Link href="/cart" className="group m-2 flex h-full items-center p-2">
						<ShoppingCart className="ml-4 h-6 w-6 flex-shrink" aria-hidden="true" />
						<span className="w-20 text-right">{formatMoney(totalPrice)}</span>
						<span className="sr-only"></span>
					</Link>
					<AuthIcons />
				</div>
				<div className="flex items-center xl:hidden">
					<Search
						size={20}
						className={`cursor-pointer ${isSearchVisible ? "hidden" : "block"}`}
						onClick={toggleSearch}
					/>
					<div
						className={`absolute left-0 top-1/2 z-50 -translate-y-1/2 transform ${isSearchVisible ? "block" : "hidden"}`}
					>
						<SearchInput isSearchVisible={isSearchVisible} closeSearch={closeSearch} />
					</div>
					<Link href="/cart" className="group m-2 flex h-full items-center p-2">
						<ShoppingCart className="ml-4 h-6 w-6 flex-shrink" aria-hidden="true" />
						<span className="hidden w-20 text-right md:block">{formatMoney(totalPrice)}</span>
						<span className="sr-only hidden md:block"></span>
					</Link>
					<button onClick={toggleMenu}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
				</div>
			</div>
			{/* Fullscreen mobile menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
					<div className="absolute left-0 top-0 z-50 flex h-24 w-full items-center justify-between bg-white pb-5 pl-2 pr-2 pt-5 text-xl font-bold shadow-md md:pl-0 md:pr-0">
						<ActiveLink role="link" href="/">
							Shopik
						</ActiveLink>
						<button onClick={toggleMenu}>
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
