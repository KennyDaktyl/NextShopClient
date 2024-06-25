"use client";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Undo2, ChevronDown, PanelsTopLeft } from "lucide-react";
import Link from "next/link";

export default function SideBar({ menuItems }: { menuItems: MenuItems }) {
	if (menuItems.name === "") {
		return (
			<div className="flex min-h-screen w-[200px] min-w-[200px] flex-col gap-4 pr-2">
				<div className="grow">
					<Command className="rounded-lg border shadow-md">
						<CommandList>
							<CommandGroup heading="Loading...">
								<PanelsTopLeft />

								<CommandSeparator />
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen w-[200px] min-w-[200px] flex-col gap-4 pr-2">
			<div className="grow">
				<Command className="rounded-lg border shadow-md">
					<CommandList>
						<CommandGroup>
							<Link href={menuItems.back_link} legacyBehavior>
								<a>
									<Undo2 className="cursor-pointer hover:bg-slate-100" />
								</a>
							</Link>
						</CommandGroup>
						<CommandGroup heading={menuItems.name}>
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
		</div>
	);
}
