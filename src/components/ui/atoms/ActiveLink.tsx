"use client";

import type { UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ActiveLinkProps {
	href: string | UrlObject;
	role: string;
	children: ReactNode;
	exact?: boolean;
}

export const ActiveLink = ({ href, role, children, exact = false }: ActiveLinkProps) => {
	const pathname = usePathname();
	const resolvedHref = typeof href === "string" ? { pathname: href } : href;
	let isActive = pathname === resolvedHref.pathname;

	if (!exact && resolvedHref.pathname) {
		isActive = pathname.startsWith(resolvedHref.pathname);
	}

	return (
		<Link
			href={resolvedHref}
			role={role}
			className={clsx(
				!isActive && "font-small text-md sm:text-md lg:text-md text-gray-500",
				isActive && "text-gray-900",
			)}
			aria-current={isActive ? "page" : undefined}
		>
			{children}
			{isActive}
		</Link>
	);
};
