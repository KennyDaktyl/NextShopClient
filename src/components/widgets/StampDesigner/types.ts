export type StampFontKey = "arial" | "times" | "courier" | "georgia";
export type StampShape = "rectangle" | "circle" | "oval";
export type StampAlign = "left" | "center" | "right";
export type StampColor = "black" | "red" | "green" | "blue";

export interface StampLine {
	id: string;
	text: string;
	font: StampFontKey;
	size: number;
	bold: boolean;
	italic: boolean;
	align: StampAlign;
}

export const MAX_LINES = 8;
export const MIN_LINES = 1;
export const MAX_LINE_LENGTH = 64;
export const MIN_SIZE = 7;
export const MAX_SIZE = 14;

export const FONT_LABELS: Record<StampFontKey, string> = {
	arial: "Arial",
	times: "Times New Roman",
	courier: "Courier New (maszynowa)",
	georgia: "Georgia (szeryfowa)",
};

export const SHAPE_LABELS: Record<StampShape, string> = {
	rectangle: "Prostokątna",
	circle: "Okrągła",
	oval: "Owalna",
};

export const ALIGN_LABELS: Record<StampAlign, string> = {
	left: "Do lewej",
	center: "Do środka",
	right: "Do prawej",
};

export const COLOR_LABELS: Record<StampColor, string> = {
	black: "Czarny",
	red: "Czerwony",
	green: "Zielony",
	blue: "Niebieski",
};

export const COLOR_HEX: Record<StampColor, string> = {
	black: "#1a1a1a",
	red: "#c81e1e",
	green: "#15803d",
	blue: "#1d4ed8",
};

export const createEmptyLine = (): StampLine => ({
	id:
		typeof crypto !== "undefined" && "randomUUID" in crypto
			? crypto.randomUUID()
			: `line-${Date.now()}-${Math.random().toString(36).slice(2)}`,
	text: "",
	font: "arial",
	size: 10,
	bold: false,
	italic: false,
	align: "center",
});

export interface StampDesignerSubmitPayload {
	email: string;
	phone: string;
	note: string;
	lines: StampLine[];
	shape: StampShape;
	color: StampColor;
	source: "embedded" | "page";
}
