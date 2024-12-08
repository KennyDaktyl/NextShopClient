import { CategoryDetailsProps } from "@/app/types";
import Image from "next/image";
import SubcategoryItem from "./SubcategoryItem";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";

const CategoryDetails = ({ category }: { category: CategoryDetailsProps }) => {
	return (
		<div className="mb-5 mt-10 w-full md:mt-0">
			<div className="flex w-full flex-wrap items-center justify-center rounded-md bg-gray-100 shadow-md md:h-[350px]">
				<div className="flex w-full items-center justify-center md:h-[350px] md:w-1/2">
					<div className="flex flex-wrap items-center justify-start px-2 py-4">
						<h1 className="w-full text-lg font-bold">{category.name}</h1>
						<p className="mt-4 text-sm leading-6">{category.description}</p>
					</div>
				</div>
				{category.image && (
					<div className="flex h-[250px] w-full items-center justify-center p-3 px-2 py-4 md:h-[320px] md:w-1/2">
						<div className="relative h-full max-h-[320px] w-full">
							<Image
								src={category.image.url || ""}
								alt={category.image.alt || category.name}
								title={category.image.title || category.name}
								loading="eager"
								className="rounded-md object-contain"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
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
			<DescriptionComponent title="Szczegóły kategorii" description={category.seo_text} />
		</div>
	);
};

export default CategoryDetails;
