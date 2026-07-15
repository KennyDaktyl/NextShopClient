"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { StampLine, StampShape } from "./types";
import { fontFamily } from "./fonts";

const sizeToPx = (size: number) => {
	// maps typographic scale 7-14 to a readable 12-26px preview range
	const ratio = (size - 7) / (14 - 7);
	return Math.round(12 + ratio * (26 - 12));
};

const shapeClassName: Record<StampShape, string> = {
	rectangle: "rounded-lg aspect-[2/1]",
	circle: "rounded-full aspect-square",
	oval: "rounded-[50%] aspect-[3/2]",
};

const MAX_PREVIEW_WIDTH = 480;
const MIN_PREVIEW_WIDTH = 300;
const PREVIEW_HORIZONTAL_PADDING = 48; // p-6 (24px) on both sides

const buildFontString = (line: StampLine, fontPx: number): string => {
	const weight = line.bold ? "700" : "400";
	const style = line.italic ? "italic" : "normal";
	return `${style} ${weight} ${fontPx}px ${fontFamily[line.font]}`;
};

let measureCanvas: HTMLCanvasElement | null = null;

const measureTextWidth = (text: string, font: string): number => {
	if (typeof document === "undefined") return 0;
	if (!measureCanvas) measureCanvas = document.createElement("canvas");
	const ctx = measureCanvas.getContext("2d");
	if (!ctx) return 0;
	ctx.font = font;
	return ctx.measureText(text).width;
};

interface LineMetrics {
	line: StampLine;
	fontPx: number;
}

interface StampPreviewProps {
	lines: StampLine[];
	shape: StampShape;
}

export const StampPreview = ({ lines, shape }: StampPreviewProps) => {
	const [containerWidth, setContainerWidth] = useState(MIN_PREVIEW_WIDTH);
	const [metrics, setMetrics] = useState<LineMetrics[]>([]);

	const visibleLines = lines.filter((line) => line.text.trim().length > 0);

	useEffect(() => {
		if (visibleLines.length === 0) {
			setMetrics([]);
			setContainerWidth(MIN_PREVIEW_WIDTH);
			return;
		}

		const naturalWidths = visibleLines.map((line) =>
			measureTextWidth(line.text, buildFontString(line, sizeToPx(line.size))),
		);
		const widest = Math.max(...naturalWidths);
		const targetWidth = Math.min(
			Math.max(widest + PREVIEW_HORIZONTAL_PADDING, MIN_PREVIEW_WIDTH),
			MAX_PREVIEW_WIDTH,
		);
		const availableTextWidth = targetWidth - PREVIEW_HORIZONTAL_PADDING;

		const nextMetrics = visibleLines.map((line, index) => {
			const baseFontPx = sizeToPx(line.size);
			const naturalWidth = naturalWidths[index];
			const scale = naturalWidth > availableTextWidth && naturalWidth > 0
				? availableTextWidth / naturalWidth
				: 1;
			return { line, fontPx: Math.max(6, Math.floor(baseFontPx * scale)) };
		});

		setContainerWidth(targetWidth);
		setMetrics(nextMetrics);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lines, shape]);

	const hasContent = metrics.length > 0;

	return (
		<div className="flex flex-col items-center gap-3 rounded-lg bg-[#f3f4f6] p-6">
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-1 overflow-hidden border-2 border-[#1e3a5f] bg-white p-6 shadow-md",
					shapeClassName[shape],
				)}
				style={{ width: containerWidth }}
			>
				{hasContent ? (
					metrics.map(({ line, fontPx }) => (
						<p
							key={line.id}
							className="whitespace-nowrap leading-tight text-[#1e3a5f]"
							style={{
								fontFamily: fontFamily[line.font],
								fontSize: `${fontPx}px`,
								fontWeight: line.bold ? 700 : 400,
								fontStyle: line.italic ? "italic" : "normal",
							}}
						>
							{line.text}
						</p>
					))
				) : (
					<p className="text-sm text-[#6b7280]">Podgląd pieczątki pojawi się tutaj</p>
				)}
			</div>
			<p className="text-xs text-[#6b7280]">Podgląd poglądowy — kolory druku mogą się różnić</p>
		</div>
	);
};

export default StampPreview;
