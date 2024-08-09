import { Hero } from "@/app/types";
import Image from "next/image";

export const HeroItem: React.FC<{ heroData: Hero }> = ({ heroData }) => {
	return (
		<div className="mt-2 flex h-[1000px] w-full flex-wrap items-center rounded-md bg-gray-100 shadow-md md:h-[500px]">
			<div className="flex h-[500px] w-full items-center justify-center p-1 md:w-1/2">
				<div className="flex w-4/5 flex-wrap items-center justify-start">
					<h1 className="w-full text-3xl font-bold">{heroData.title}</h1>
					<p className="mt-4 text-xl">{heroData.description}</p>
				</div>
			</div>
			<div className="m-auto flex h-[500px] w-full items-center justify-center p-3 md:w-1/2">
				{heroData.image && (
					<div className="relative h-full max-h-[500px] w-full max-w-[500px]">
						<Image
							src={heroData.image.url}
							alt={heroData.image.alt || ""}
							className="rounded-md object-cover"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				)}
			</div>
		</div>
	);
};
