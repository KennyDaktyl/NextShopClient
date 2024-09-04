import { MenuItem } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface SubcategoryItemProps {
	item: MenuItem;
}

const SubcategoryItem = ({ item }: SubcategoryItemProps) => {
	return (
		<Link
			href={item.full_path}
			className="subcategory-list-item flex h-[450px] cursor-pointer flex-col items-center justify-start rounded-md border shadow-md transition duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg md:h-[520px]"
		>
			<div className="flex w-full flex-wrap justify-center p-2">
				<h2 className="mt-2 h-[40px] text-center text-sm font-bold md:text-xl">{item.name}</h2>
				<p className="mt-2 h-[100px] text-center text-xs md:text-sm">{item.description}</p>
			</div>
			{item.image && (
				<div className="mb-4 mt-auto flex w-full items-center justify-center">
					<div className="relative flex h-[125px] w-[125px] items-center justify-center overflow-hidden sm:h-[200px] sm:w-[200px]">
						<Image
							src={item.image.url || ""}
							alt={item.image.alt || item.name}
							title={item.image.title || item.name}
							loading="lazy"
							className="rounded-md object-cover"
							fill
							sizes="(max-width: 768px) 100vw, 200px"
						/>
					</div>
				</div>
			)}
		</Link>
	);
};

export default SubcategoryItem;
