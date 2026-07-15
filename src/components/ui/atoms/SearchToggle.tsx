"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import SearchInput from "./SearchInput";

export const SearchToggle = () => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const close = () => setOpen(false);

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				close();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div ref={wrapperRef} onBlur={close} className="flex items-center">
			{open ? (
				<SearchInput isSearchVisible={open} closeSearch={close} />
			) : (
				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Otwórz wyszukiwanie"
					aria-expanded={open}
					className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
				>
					<Search size={18} aria-hidden="true" />
				</button>
			)}
		</div>
	);
};

export default SearchToggle;
