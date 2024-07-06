"use client";

import { usePathname } from "next/navigation";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export default function BreadcrumbsForProductPage() {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment);

	if (pathSegments.length === 0) {
		return <div className="mt-3 h-[20px] w-full"></div>;
	}

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/");
		const isLast = index === pathSegments.length - 1;

		return (
			<BreadcrumbItem key={href}>
				{!isLast ? (
					<ActiveLink role="link" href={href} aria-current="page" exact>
						{decodeURIComponent(segment)}
					</ActiveLink>
				) : (
					<span>{decodeURIComponent(segment)}</span>
				)}
				{!isLast && <span className="mx-2">/</span>}
			</BreadcrumbItem>
		);
	});

	return (
		<Breadcrumb className="mt-3">
			<BreadcrumbList>
				<BreadcrumbItem>
					<ActiveLink role="link" href="/" aria-current="page">
						Home
					</ActiveLink>
				</BreadcrumbItem>
				{breadcrumbs.length > 0 && <span className="mx-2">/</span>}
				{breadcrumbs}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
