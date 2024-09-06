import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

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
	const inputRef = useRef<HTMLInputElement>(null); // Referencja do inputa

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

	// Ustawia focus na input po otwarciu
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
		<div className={`flex items-center ${isSearchVisible ? "block" : "hidden"} md:flex`}>
			<Search size={20} className="hidden md:block" />
			<input
				type="search"
				name="search"
				placeholder="Szukaj produktu"
				value={searchTerm}
				onChange={handleChange}
				autoComplete="off"
				className="rounded-md border p-2"
				ref={inputRef}
			/>
			<div className="w-6">
				{(searchTerm || isSearchVisible) && (
					<X size={20} className="ml-2 cursor-pointer text-gray-500" onClick={clearSearch} />
				)}
			</div>
		</div>
	);
};

export default SearchInput;
