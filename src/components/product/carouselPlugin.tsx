"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Image {
	id: number;
	image_url: string;
	alt: string | null;
	title: string | null;
	width: number;
	height: number;
}

export function CarouselPlugin({ images }: { images: Image[] }) {
	const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<Carousel
			plugins={[plugin.current]}
			className="max-w-4/5 relative mx-auto flex items-center justify-center overflow-hidden rounded-md"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent className="mx-auto">
				{images.map((image, index) => (
					<CarouselItem key={index} className="flex h-[650px] items-center justify-center">
						<Image
							src={image.image_url}
							alt={image.alt || ""}
							className="mx-auto rounded-md object-cover"
							width={image.width}
							height={image.height}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	);
}