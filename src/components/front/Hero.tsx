import { Hero } from "@/app/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroItem: React.FC<{ heroData: Hero; isFirst: boolean }> = ({ heroData, isFirst }) => {
	return (
		<div
			className={`mt-2 flex w-full flex-wrap items-center rounded-md bg-gray-100 shadow-md ${
				isFirst ? "h-[1100px] md:h-[550px]" : "h-[800px] md:h-[380px]"
			}`}
		>
			<div
				className={`flex items-center justify-center p-1 ${
					isFirst ? "h-[500px] md:w-1/2" : "max-h-[440px] md:w-1/2"
				}`}
			>
				<div className="flex w-4/5 flex-wrap items-center justify-start">
					{isFirst ? (
						<h1 className="w-full text-xl font-bold">{heroData.title}</h1>
					) : (
						<h2 className="w-full text-xl font-bold">{heroData.title}</h2>
					)}
					<p className="mt-4 text-lg">{heroData.description}</p>
					{heroData.link && heroData.link_text && (
						<div className="mt-4">
							<Link href={heroData.link} role="link">
								<Button className="rounded-lg bg-black text-white hover:bg-gray-800">
									{heroData.link_text}
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
			<div
				className={`m-auto flex items-center justify-center p-3 ${
					isFirst ? "h-[500px] w-full md:w-1/2" : "h-[300px] w-full md:w-1/2"
				}`}
			>
				{heroData.image && (
					<div
						className={`relative h-full w-full ${
							isFirst ? "max-h-[500px] max-w-[500px]" : "max-h-[300px]"
						}`}
					>
						<Image
							src={heroData.image.url}
							alt={heroData.image.alt || ""}
							title={heroData.image.title || ""}
							loading="eager"
							className="rounded-md object-cover"
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
				)}
			</div>
		</div>
	);
};
