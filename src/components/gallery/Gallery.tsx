"use client";
import { useState } from "react";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Gallery({ images }: { images: any[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const pairedImages = images.reduce((acc: any[], image) => {
		if (image.width === 350) {
			const largeImage = images.find((img) => img.id === image.id + 1 && img.width === 650);

			if (largeImage) {
				acc.push({
					thumbnail: image,
					large: largeImage,
				});
			}
		}
		return acc;
	}, []);

	const openModal = (index: number) => {
		setCurrentIndex(index);
		setIsOpen(true);
	};

	const showPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? pairedImages.length - 1 : prevIndex - 1));
	};

	const showNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex === pairedImages.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<div>
			<div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{pairedImages.map(({ thumbnail }, index) => (
					<button
						key={thumbnail.id}
						onClick={() => openModal(index)}
						className="mx-auto w-full max-w-[350px] cursor-pointer rounded-lg border-2 border-transparent text-center hover:border-green-500"
					>
						<Image
							src={thumbnail.url}
							alt={thumbnail.alt || "Thumbnail"}
							title={thumbnail.title || "Thumbnail"}
							width={350}
							height={350}
							className="h-full w-full rounded-lg object-cover"
						/>
					</button>
				))}
			</div>

			{isOpen && (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogContent className="h-auto w-full max-w-[90vw] sm:h-[600px] sm:max-w-[700px]">
						<DialogHeader className="h-[100px]">
							<DialogTitle>Podgląd obrazu</DialogTitle>
							{pairedImages[currentIndex].large.title && (
								<p className="text-sm text-gray-600">{pairedImages[currentIndex].large.title}</p>
							)}
						</DialogHeader>

						<div className="relative h-[300px] w-full sm:h-[400px] sm:w-[650px]">
							<Image
								src={pairedImages[currentIndex].large.url}
								alt={pairedImages[currentIndex].large.alt || "Large Image"}
								title={pairedImages[currentIndex].large.title || "Large Image"}
								layout="fill"
								className="rounded-lg object-contain"
							/>
							<button
								className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-black p-2 text-white"
								onClick={showPrevious}
							>
								←
							</button>
							<button
								className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-black p-2 text-white"
								onClick={showNext}
							>
								→
							</button>
						</div>

						<DialogFooter>
							<Button onClick={() => setIsOpen(false)}>Zamknij</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
