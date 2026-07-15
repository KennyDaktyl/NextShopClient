export type StampFontKey = "arial" | "times" | "courier" | "georgia";
export type StampShape = "rectangle" | "circle" | "oval";

export interface StampLine {
	id: string;
	text: string;
	font: StampFontKey;
	size: number;
	bold: boolean;
	italic: boolean;
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
});

export interface StampDesignerSubmitPayload {
	email: string;
	phone: string;
	note: string;
	lines: StampLine[];
	shape: StampShape;
	source: "embedded" | "page";
}
