"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import StampLineRow from "./StampLineRow";
import StampPreview from "./StampPreview";
import SubmitDesignModal from "./SubmitDesignModal";
import {
	createEmptyLine,
	MAX_LINES,
	MIN_LINES,
	SHAPE_LABELS,
	StampDesignerSubmitPayload,
	StampLine,
	StampShape,
} from "./types";

interface StampDesignerProps {
	variant?: "embedded" | "page";
	onSubmit?: (payload: StampDesignerSubmitPayload) => void;
}

export const StampDesigner = ({ variant = "embedded", onSubmit }: StampDesignerProps) => {
	const [lines, setLines] = useState<StampLine[]>([createEmptyLine()]);
	const [shape, setShape] = useState<StampShape>("rectangle");
	const [modalOpen, setModalOpen] = useState(false);

	const updateLine = (id: string, patch: Partial<StampLine>) => {
		setLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
	};

	const removeLine = (id: string) => {
		setLines((prev) => (prev.length > MIN_LINES ? prev.filter((line) => line.id !== id) : prev));
	};

	const addLine = () => {
		if (lines.length >= MAX_LINES) return;
		setLines((prev) => [...prev, createEmptyLine()]);
	};

	const hasContent = lines.some((line) => line.text.trim().length > 0);

	return (
		<div className="rounded-lg bg-white">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div>
					<div className="mb-3 flex items-center justify-between">
						<Label className="text-sm font-semibold text-[#1f2937]">Kształt pieczątki</Label>
						<select
							value={shape}
							onChange={(e) => setShape(e.target.value as StampShape)}
							className="rounded-md border border-[#e5e7eb] bg-white px-2 py-1.5 text-sm text-[#1f2937]"
						>
							{Object.entries(SHAPE_LABELS).map(([key, label]) => (
								<option key={key} value={key}>
									{label}
								</option>
							))}
						</select>
					</div>

					<div className="space-y-3">
						{lines.map((line, index) => (
							<StampLineRow
								key={line.id}
								line={line}
								index={index}
								canRemove={lines.length > MIN_LINES}
								onChange={updateLine}
								onRemove={removeLine}
							/>
						))}
					</div>

					<div className="mt-3">
						<Button
							type="button"
							variant="outline"
							onClick={addLine}
							disabled={lines.length >= MAX_LINES}
							className={cn(
								"flex items-center gap-2",
								lines.length >= MAX_LINES && "cursor-not-allowed opacity-60",
							)}
						>
							<Plus className="h-4 w-4" aria-hidden="true" />
							Dodaj linię
						</Button>
						{lines.length >= MAX_LINES && (
							<p className="mt-2 text-sm text-[#6b7280]">Maksymalnie 8 linii</p>
						)}
					</div>
				</div>

				<div>
					<StampPreview lines={lines} shape={shape} />
					<Button
						type="button"
						className="mt-4 w-full"
						disabled={!hasContent}
						onClick={() => setModalOpen(true)}
					>
						Wyślij projekt do wyceny
					</Button>
				</div>
			</div>

			<SubmitDesignModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				payload={{ lines, shape, source: variant }}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default StampDesigner;
