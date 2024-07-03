"use client";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Undo2, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface MenuItem {
	name: string;
	full_path: string;
	is_parent: boolean;
	get_products_count: number;
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
			>
				<div className="flex min-w-[250px] flex-col gap-4 md:min-w-[200px]">
					<div className="flex items-center justify-between border-b p-2">
						<h2 className="text-xl font-bold">{menuItems.name}</h2>
						<button className="md:hidden" onClick={toggleSidebar}>
							<X className="cursor-pointer hover:bg-slate-100" />
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
									<CommandGroup>
										{menuItems.back_link != "/" && (
											<Link href={menuItems.back_link} legacyBehavior className="pl-2">
												<Undo2 className="cursor-pointer hover:bg-slate-100" />
											</Link>
										)}
									</CommandGroup>
									<CommandGroup>
										{menuItems.items.map((item: MenuItem, index: number) => (
											<Link key={index} href={item.full_path} legacyBehavior>
												<a className="flex cursor-pointer items-center justify-between hover:bg-slate-100">
													<CommandItem className="flex cursor-pointer items-center justify-between hover:bg-slate-100">
														{item.name}
														{item.is_parent ? (
															<ChevronDown />
														) : (
															<span>&nbsp; ({item.get_products_count})</span>
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
				>
					<Menu className="mr-2" /> Kategorie
				</Button>
			)}
		</div>
	);
}
