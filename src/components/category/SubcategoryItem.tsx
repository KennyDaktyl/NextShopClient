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
			className="flex h-[450px] cursor-pointer flex-col items-center justify-start rounded-md border p-4 shadow-md transition duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg"
		>
			<h1 className="mt-2 text-2xl font-bold">{item.name}</h1>
			<p className="text-md mt-4 h-[100px]">{item.description}</p>
			{item.image_list_item && (
				<div className="mt-4 flex justify-center">
					<Image
						src={item.image_list_item.image_url || ""}
						alt={item.image_list_item.alt || "Category Image"}
						className="rounded-md object-cover"
						height={item.image_list_item.height || 150}
						width={item.image_list_item.width || 150}
					/>
				</div>
			)}
		</Link>
	);
};

export default SubcategoryItem;
