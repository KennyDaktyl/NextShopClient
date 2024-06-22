"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbWithCustomSeparator() {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment);

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/");
		const isLast = index === pathSegments.length - 1;

		return (
			<BreadcrumbItem key={href}>
				{!isLast ? (
					<Link role="link" href={href} aria-current="page">
						{decodeURIComponent(segment)}
					</Link>
				) : (
					<span>{decodeURIComponent(segment)}</span>
				)}
				{!isLast && <span className="mx-2">/</span>}
			</BreadcrumbItem>
		);
	});

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<Link role="link" href="/" aria-current="page">
						Home
					</Link>
				</BreadcrumbItem>
				{breadcrumbs.length > 0 && <span className="mx-2">/</span>}
				{breadcrumbs}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
