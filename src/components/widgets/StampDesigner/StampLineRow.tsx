import { AlignCenter, AlignLeft, AlignRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
	ALIGN_LABELS,
	FONT_LABELS,
	MAX_LINE_LENGTH,
	MAX_SIZE,
	MIN_SIZE,
	StampAlign,
	StampLine,
} from "./types";

const ALIGN_ICONS: Record<StampAlign, typeof AlignLeft> = {
	left: AlignLeft,
	center: AlignCenter,
	right: AlignRight,
};

interface StampLineRowProps {
	line: StampLine;
	index: number;
	canRemove: boolean;
	onChange: (id: string, patch: Partial<StampLine>) => void;
	onRemove: (id: string) => void;
}

export const StampLineRow = ({ line, index, canRemove, onChange, onRemove }: StampLineRowProps) => {
	return (
		<div className="rounded-md border border-[#e5e7eb] bg-white p-3">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
					Linia {index + 1}
				</span>
				{canRemove && (
					<button
						type="button"
						onClick={() => onRemove(line.id)}
						aria-label={`Usuń linię ${index + 1}`}
						className="text-[#6b7280] transition hover:text-red-600"
					>
						<Trash2 className="h-4 w-4" aria-hidden="true" />
					</button>
				)}
			</div>

			<Input
				value={line.text}
				maxLength={MAX_LINE_LENGTH}
				placeholder="Treść linii"
				onChange={(e) => onChange(line.id, { text: e.target.value })}
				className="mb-2"
			/>

			<div className="flex flex-wrap items-center gap-2">
				<select
					value={line.font}
					onChange={(e) => onChange(line.id, { font: e.target.value as StampLine["font"] })}
					className="rounded-md border border-[#e5e7eb] bg-white px-2 py-1.5 text-sm text-[#1f2937]"
				>
					{Object.entries(FONT_LABELS).map(([key, label]) => (
						<option key={key} value={key}>
							{label}
						</option>
					))}
				</select>

				<select
					value={line.size}
					onChange={(e) => onChange(line.id, { size: Number(e.target.value) })}
					className="rounded-md border border-[#e5e7eb] bg-white px-2 py-1.5 text-sm text-[#1f2937]"
					aria-label="Rozmiar czcionki"
				>
					{Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => MIN_SIZE + i).map((size) => (
						<option key={size} value={size}>
							Rozmiar {size}
						</option>
					))}
				</select>

				<button
					type="button"
					onClick={() => onChange(line.id, { bold: !line.bold })}
					aria-pressed={line.bold}
					aria-label="Pogrubienie"
					className={cn(
						"h-8 w-8 rounded-md border border-[#e5e7eb] text-sm font-bold transition",
						line.bold ? "bg-[#1f2937] text-white" : "bg-white text-[#1f2937] hover:bg-[#f3f4f6]",
					)}
				>
					B
				</button>
				<button
					type="button"
					onClick={() => onChange(line.id, { italic: !line.italic })}
					aria-pressed={line.italic}
					aria-label="Kursywa"
					className={cn(
						"h-8 w-8 rounded-md border border-[#e5e7eb] text-sm italic transition",
						line.italic ? "bg-[#1f2937] text-white" : "bg-white text-[#1f2937] hover:bg-[#f3f4f6]",
					)}
				>
					I
				</button>

				<div className="flex items-center gap-1 rounded-md border border-[#e5e7eb] p-0.5">
					{(Object.keys(ALIGN_LABELS) as StampAlign[]).map((align) => {
						const Icon = ALIGN_ICONS[align];
						const isActive = line.align === align;
						return (
							<button
								key={align}
								type="button"
								onClick={() => onChange(line.id, { align })}
								aria-pressed={isActive}
								aria-label={ALIGN_LABELS[align]}
								title={ALIGN_LABELS[align]}
								className={cn(
									"flex h-7 w-7 items-center justify-center rounded transition",
									isActive
										? "bg-[#1f2937] text-white"
										: "bg-white text-[#1f2937] hover:bg-[#f3f4f6]",
								)}
							>
								<Icon className="h-4 w-4" aria-hidden="true" />
							</button>
						);
					})}
				</div>
			</div>
			<p className="mt-1 text-right text-xs text-[#6b7280]">
				{line.text.length}/{MAX_LINE_LENGTH}
			</p>
		</div>
	);
};

export default StampLineRow;
