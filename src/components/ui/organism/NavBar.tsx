"use client";

import { useState } from "react";
import { ActiveLink } from "../atoms/ActiveLink";
import AuthIcons from "../../auth/auth-icons";
import { Menu, X } from "lucide-react";
import React from "react";

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

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="z-50 w-full bg-white p-5 shadow-md md:p-0">
			<div className="mx-auto flex max-w-screen-xl items-center justify-between">
				<div className="flex items-center">
					<div className="text-xl font-bold">
						<ActiveLink role="link" href="/">
							Shopik
						</ActiveLink>
					</div>
					<ul className="ml-4 hidden h-16 flex-wrap items-center justify-start space-x-4 md:flex">
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
				<div className="flex items-center md:hidden">
					<button onClick={toggleMenu}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
				</div>
			</div>
			{/* Fullscreen mobile menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
					<div className="absolute left-0 top-0 flex w-full items-center justify-between p-5 text-xl font-bold shadow-md">
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
