"use client";

import { ActiveLink } from "../atoms/ActiveLink";
import AuthIcons from "../../auth/auth-icons";
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
		href: "/uslugi",
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
	return (
		<nav className="w-full bg-white p-5 shadow-md md:p-0">
			<div className="mx-auto flex max-w-screen-xl justify-between">
				<ul className="flex h-16 flex-wrap items-center justify-start space-x-4">
					<li
						key="shopik"
						className="text-centersm:w-32 flex items-center border-b-2 border-transparent"
					>
						<ActiveLink role="link" href="/">
							<span className="text-xl font-bold">Shopik</span>
						</ActiveLink>
					</li>
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
				<AuthIcons />
			</div>
		</nav>
	);
}
