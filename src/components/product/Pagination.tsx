"use client";
import { useRouter } from "next/navigation";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
	prevPage: string | null;
	nextPage: string | null;
	currentPage: number;
	totalPages: number;
}

export function PaginationPage({ prevPage, nextPage, currentPage, totalPages }: PaginationProps) {
	const router = useRouter();

	const createPaginationItems = () => {
		const items = [];
		for (let page = 1; page <= totalPages; page++) {
			items.push(
				<PaginationItem key={page}>
					<PaginationLink
						isActive={page === currentPage}
						onClick={() => router.push(`?page=${page}`)}
					>
						<Button
							variant="outline"
							className={
								page === currentPage ? "cursor-default text-gray-500" : "hover:text-gray-500"
							}
						>
							{page}
						</Button>
					</PaginationLink>
				</PaginationItem>,
			);
		}
		return items;
	};

	return (
		<Pagination className="mx-auto w-full">
			<PaginationContent>
				{prevPage && (
					<PaginationItem>
						<PaginationLink onClick={() => router.push(`?page=${currentPage - 1}`)}>
							<div
								aria-label="Go to previous page"
								className={cn("flex cursor-pointer items-center gap-1 pl-2.5 hover:text-gray-500")}
							>
								<ChevronLeftIcon className="h-4 w-4" />
								<span>Previous</span>
							</div>
						</PaginationLink>
					</PaginationItem>
				)}
				{createPaginationItems()}
				{nextPage && (
					<PaginationItem>
						<PaginationLink onClick={() => router.push(`?page=${currentPage + 1}`)}>
							<div
								aria-label="Go to next pag"
								className={cn("flex cursor-pointer items-center gap-1 pl-2.5 hover:text-gray-500")}
							>
								<span>Next</span>
								<ChevronRightIcon className="h-4 w-4" />
							</div>
						</PaginationLink>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
