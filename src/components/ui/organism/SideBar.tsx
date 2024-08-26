"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Undo2, ChevronDown, Menu, X } from "lucide-react";

import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface MenuItem {
	name: string;
	full_path: string;
	is_parent: boolean;
	products_count: number;
}

interface MenuItems {
	name: string;
	back_link: string;
	items: MenuItem[];
}

export default function SideBar({
	menuItems,
	isMenuActive,
}: {
	menuItems: MenuItems;
	isMenuActive: boolean;
}) {
	const toggleSidebar = () => setIsOpen(!isOpen);

	const [isOpen, setIsOpen] = useState(isMenuActive);

	useEffect(() => {
		setIsOpen(isMenuActive);
	}, [isMenuActive]);

	return (
		<div className="relative flex pt-2 md:mr-2 md:min-h-screen md:w-[200px]">
			<div
				className={`stransition-transform absolute left-0 top-0 z-40 bg-white duration-300 ease-in-out md:static md:w-[200px] md:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-150"
				}`}
				aria-expanded={isOpen}
				aria-hidden={!isOpen}
				role="dialog"
			>
				<div className="flex min-w-[250px] flex-col gap-4 md:min-w-[200px]">
					<div className="flex items-center justify-between border-b p-2">
						<p className="text-xl font-bold">{menuItems.name}</p>
						<button className="md:hidden" onClick={toggleSidebar} aria-label="Zamknij menu">
							<X className="cursor-pointer hover:bg-slate-100" aria-hidden="true" />
						</button>
					</div>
					{menuItems.name === "" ? (
						<div className="grow">
							<Command className="rounded-lg border shadow-md">
								<CommandList>
									<CommandGroup heading="Loading...">
										<CommandSeparator />
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					) : (
						<div className="grow">
							<Command className="rounded-lg border shadow-md">
								<CommandList>
									{menuItems.back_link !== "/" && (
										<CommandGroup>
											<Link href={menuItems.back_link} legacyBehavior>
												<a>
													<CommandItem className="cursor-pointer">
														<Undo2 className="mr-2" aria-hidden="true" />
														<span>Cofnij</span>
													</CommandItem>
												</a>
											</Link>
										</CommandGroup>
									)}
									<CommandGroup>
										{menuItems.items.map((item: MenuItem, index: number) => (
											<Link key={index} href={item.full_path} legacyBehavior>
												<a>
													<CommandItem className="flex w-full cursor-pointer items-center justify-between pl-0 pr-0 hover:bg-slate-100">
														<span className="w-4/5">{item.name}</span>
														{item.is_parent ? (
															<ChevronDown className="w-1/5" aria-hidden="true" />
														) : (
															<span className="w-1/5 text-center">({item.products_count})</span>
														)}
													</CommandItem>
												</a>
											</Link>
										))}
									</CommandGroup>
									<CommandSeparator />
								</CommandList>
							</Command>
						</div>
					)}
				</div>
			</div>

			{!isOpen && (
				<Button
					className="absolute left-0 top-0 z-10 md:hidden"
					onClick={toggleSidebar}
					variant="outline"
					aria-label="Otwórz menu"
				>
					<Menu className="mr-2" aria-hidden="true" /> Kategorie
				</Button>
			)}
		</div>
	);
}
