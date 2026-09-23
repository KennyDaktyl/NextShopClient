import { COLOR_HEX, StampColor, StampLine, StampShape } from "./types";
import { fontFamily } from "./fonts";

const RENDER_SCALE = 3;
const BASE_MIN_WIDTH = 300;
const BASE_MAX_WIDTH = 480;
const BASE_PADDING = 48; // matches p-6 (24px each side) used in the live preview

const sizeToPx = (size: number) => {
	const ratio = (size - 7) / (14 - 7);
	return Math.round(12 + ratio * (26 - 12));
};

const buildFontString = (line: StampLine, fontPx: number): string => {
	const weight = line.bold ? "700" : "400";
	const style = line.italic ? "italic" : "normal";
	return `${style} ${weight} ${fontPx}px ${fontFamily[line.font]}`;
};

const shapeAspect: Record<StampShape, number> = {
	rectangle: 2 / 1,
	circle: 1,
	oval: 3 / 2,
};

const drawShapePath = (
	ctx: CanvasRenderingContext2D,
	shape: StampShape,
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	ctx.beginPath();
	if (shape === "circle" || shape === "oval") {
		ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
	} else {
		const r = width * 0.06;
		ctx.moveTo(x + r, y);
		ctx.arcTo(x + width, y, x + width, y + height, r);
		ctx.arcTo(x + width, y + height, x, y + height, r);
		ctx.arcTo(x, y + height, x, y, r);
		ctx.arcTo(x, y, x + width, y, r);
	}
	ctx.closePath();
};

/**
 * Renders the stamp design onto an offscreen canvas using the same sizing
 * rules as the live preview, so the exported JPEG matches what the customer saw.
 */
export const renderStampToJpegDataUrl = (
	lines: StampLine[],
	shape: StampShape,
	color: StampColor,
): string | null => {
	if (typeof document === "undefined") return null;

	const inkColor = COLOR_HEX[color];

	const visibleLines = lines.filter((line) => line.text.trim().length > 0);
	if (visibleLines.length === 0) return null;

	const measureCanvas = document.createElement("canvas");
	const measureCtx = measureCanvas.getContext("2d");
	if (!measureCtx) return null;

	const naturalWidths = visibleLines.map((line) => {
		measureCtx.font = buildFontString(line, sizeToPx(line.size) * RENDER_SCALE);
		return measureCtx.measureText(line.text).width;
	});

	const padding = BASE_PADDING * RENDER_SCALE;
	const widest = Math.max(...naturalWidths);
	const boxWidth = Math.min(
		Math.max(widest + padding, BASE_MIN_WIDTH * RENDER_SCALE),
		BASE_MAX_WIDTH * RENDER_SCALE,
	);
	const availableTextWidth = boxWidth - padding;
	const boxHeight = Math.round(boxWidth / shapeAspect[shape]);

	const metrics = visibleLines.map((line, index) => {
		const baseFontPx = sizeToPx(line.size) * RENDER_SCALE;
		const naturalWidth = naturalWidths[index];
		const scale =
			naturalWidth > availableTextWidth && naturalWidth > 0 ? availableTextWidth / naturalWidth : 1;
		return { line, fontPx: Math.max(6 * RENDER_SCALE, Math.floor(baseFontPx * scale)) };
	});

	const margin = Math.round(padding / 2);
	const canvas = document.createElement("canvas");
	canvas.width = boxWidth + margin * 2;
	canvas.height = boxHeight + margin * 2;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	drawShapePath(ctx, shape, margin, margin, boxWidth, boxHeight);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.lineWidth = 2 * RENDER_SCALE;
	ctx.strokeStyle = inkColor;
	ctx.stroke();

	ctx.save();
	drawShapePath(ctx, shape, margin, margin, boxWidth, boxHeight);
	ctx.clip();

	const lineHeight = Math.max(...metrics.map((m) => m.fontPx)) * 1.2;
	const totalTextHeight = metrics.length * lineHeight;
	let cursorY = margin + boxHeight / 2 - totalTextHeight / 2 + lineHeight / 2;

	const leftX = margin + padding / 2;
	const rightX = margin + boxWidth - padding / 2;
	const centerX = margin + boxWidth / 2;

	metrics.forEach(({ line, fontPx }) => {
		ctx.font = buildFontString(line, fontPx);
		ctx.fillStyle = inkColor;
		ctx.textBaseline = "middle";
		if (line.align === "left") {
			ctx.textAlign = "left";
			ctx.fillText(line.text, leftX, cursorY);
		} else if (line.align === "right") {
			ctx.textAlign = "right";
			ctx.fillText(line.text, rightX, cursorY);
		} else {
			ctx.textAlign = "center";
			ctx.fillText(line.text, centerX, cursorY);
		}
		cursorY += lineHeight;
	});

	ctx.restore();

	return canvas.toDataURL("image/jpeg", 0.92);
};
