import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

interface PaginationProps {
	prevPage: string | null;
	nextPage: string | null;
	currentPage: number;
	totalPages: number;
}

export function PaginationPage({ prevPage, nextPage, currentPage, totalPages }: PaginationProps) {
	const createPaginationItems = () => {
		const items = [];
		for (let page = 1; page <= totalPages; page++) {
			items.push(
				<PaginationItem key={page}>
					<Link href={`?page=${page}`} passHref>
						<PaginationLink isActive={page === currentPage}>{page}</PaginationLink>
					</Link>
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
						<Link href={`?page=${currentPage - 1}`} passHref>
							<PaginationPrevious />
						</Link>
					</PaginationItem>
				)}
				{createPaginationItems()}
				{nextPage && (
					<PaginationItem>
						<Link href={`?page=${currentPage + 1}`} passHref>
							<PaginationNext />
						</Link>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
