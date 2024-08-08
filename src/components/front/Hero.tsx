import { Hero, Image as ImageType } from "@/app/types";
import Image from "next/image";

export const HeroItem: React.FC<{ heroData: Hero }> = ({ heroData }) => {
	return (
		<div className="mt-2 flex h-[500px] w-full flex-wrap rounded-md bg-gray-100 shadow-md">
			<div className="flex w-full items-center justify-center p-1 md:w-1/2">
				<div className="flex w-4/5 flex-wrap items-center justify-start">
					<h1 className="w-full text-3xl font-bold">{heroData.title}</h1>
					<p className="mt-4 text-xl">{heroData.description}</p>
				</div>
			</div>
			<div className="m-auto flex w-1/2 items-center justify-center">
				{heroData.image && (
					<Image
						src={heroData.image.url}
						alt={heroData.image.alt || ""}
						className="max-h-[350px] max-w-[350px] rounded-md object-cover"
						height={heroData.image.height}
						width={heroData.image.width}
					/>
				)}
			</div>
		</div>
	);
};
