import { MenuItem } from "@/app/types";
import Image from "next/image";
import SubcategoryItem from "./SubcategoryItem";

interface ImageProps {
	url: string | null;
	alt: string | null;
	height: number | null;
	width: number | null;
}

interface CategoryDetailsProps {
	name: string;
	description: string;
	image: ImageProps | null;
	items: MenuItem[];
}

const CategoryDetails = ({ category }: { category: CategoryDetailsProps }) => {
	return (
		<div className="mt-10 w-full md:mt-0">
			<div className="flex w-full flex-wrap items-center justify-center rounded-md bg-gray-100 shadow-md md:h-[350px]">
				<div className="flex h-[200px] w-full items-center justify-center md:h-[350px] md:w-1/2">
					<div className="flex w-4/5 flex-wrap items-center justify-start">
						<h1 className="w-full text-xl font-bold">{category.name}</h1>
						<p className="mt-4 text-lg">{category.description}</p>
					</div>
				</div>
				{category.image && (
					<div className="flex h-[200px] w-full items-center justify-center p-3 md:h-[320px] md:w-1/2">
						<div className="relative h-full max-h-[320px] w-full max-w-[350px]">
							<Image
								src={category.image.url || ""}
								alt={category.image.alt || "Category Image"}
								className="rounded-md object-cover"
								layout="fill"
								objectFit="cover"
							/>
						</div>
					</div>
				)}
			</div>
			<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{category.items.map((item) => (
					<SubcategoryItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default CategoryDetails;
