import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

const SearchInput = ({
	isSearchVisible,
	closeSearch,
}: {
	isSearchVisible: boolean;
	closeSearch: () => void;
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	useEffect(() => {
		if (debouncedSearchTerm.length >= 3) {
			router.push(`/szukaj?search=${debouncedSearchTerm}`);
		} else if (debouncedSearchTerm.length === 0 && pathname === "/szukaj") {
			router.push(`/`);
		}
	}, [debouncedSearchTerm, router]);

	useEffect(() => {
		if (isSearchVisible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isSearchVisible]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const clearSearch = () => {
		setSearchTerm("");
		closeSearch();
	};

	return (
		<div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
			<input
				type="search"
				name="search"
				placeholder="Szukaj produktu..."
				value={searchTerm}
				onChange={handleChange}
				autoComplete="off"
				className="w-full bg-transparent text-sm outline-none sm:w-56"
				ref={inputRef}
			/>
			{searchTerm && (
				<X
					size={18}
					className="shrink-0 cursor-pointer text-gray-500"
					onMouseDown={(e) => e.preventDefault()}
					onClick={clearSearch}
				/>
			)}
		</div>
	);
};

export default SearchInput;
