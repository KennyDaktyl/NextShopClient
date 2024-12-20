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
	url: string;
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
					<CarouselItem key={index} className="flex items-center justify-center md:h-[650px]">
						<Image
							src={image.url}
							alt={image.alt || ""}
							title={image.title || ""}
							className="xs:w-[240px] mx-auto rounded-md object-cover"
							width={image.width}
							height={image.height}
							loading={index === 0 ? "eager" : "lazy"}
							sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
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
