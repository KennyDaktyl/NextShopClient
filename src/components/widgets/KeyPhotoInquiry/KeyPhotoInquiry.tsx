"use client";

import { useRef, useState } from "react";
import { Camera, ImageUp, KeyRound, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubmitPhotoModal from "./SubmitPhotoModal";

const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10 MB

export const KeyPhotoInquiry = () => {
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [photoError, setPhotoError] = useState<string>("");
	const [modalOpen, setModalOpen] = useState(false);
	const [sent, setSent] = useState(false);

	const cameraInputRef = useRef<HTMLInputElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const applyPhoto = (file: File | undefined) => {
		setPhotoError("");
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setPhotoError("Dozwolone są tylko pliki graficzne.");
			return;
		}
		if (file.size > MAX_PHOTO_SIZE) {
			setPhotoError("Zdjęcie jest za duże (limit 10 MB).");
			return;
		}

		setSent(false);
		setPhotoFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	const removePhoto = () => {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setPhotoFile(null);
		setPreviewUrl(null);
		setSent(false);
		if (cameraInputRef.current) cameraInputRef.current.value = "";
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	if (sent) {
		return (
			<div className="rounded-lg border border-[#a7f3d0] bg-[#ecfdf5] p-6 text-center">
				<p className="mb-3 font-semibold text-[#065f46]">
					Dziękujemy! Otrzymaliśmy zdjęcie klucza i zgłoszenie.
				</p>
				<p className="mb-4 text-sm text-[#065f46]">Odezwiemy się z oceną w ciągu 24h.</p>
				<Button onClick={removePhoto}>Wyślij kolejne zgłoszenie</Button>
			</div>
		);
	}

	return (
		<div className="rounded-lg bg-white">
			<div className="mb-4 flex items-start gap-3 rounded-lg bg-[#fafafa] p-4">
				<KeyRound className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1f2937]" aria-hidden="true" />
				<p className="text-sm text-[#4b5563]">
					<strong className="text-[#1f2937]">Jak ułożyć klucz do zdjęcia:</strong> połóż klucz
					poziomo, główką w prawo, tak aby cały mieścił się w kadrze. Zrób zdjęcie w dobrym
					oświetleniu, najlepiej na jednolitym tle.
				</p>
			</div>

			{previewUrl ? (
				<div className="mb-4 flex items-center gap-4 rounded-lg border border-[#d1d5db] p-4">
					<div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md bg-[#fafafa]">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={previewUrl}
							alt="Podgląd zdjęcia klucza"
							className="h-full w-full object-contain"
						/>
					</div>
					<div className="flex-1">
						<p className="mb-2 text-sm text-[#4b5563]">{photoFile?.name}</p>
						<button
							type="button"
							onClick={removePhoto}
							className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline"
						>
							<Trash2 className="h-4 w-4" aria-hidden="true" />
							Usuń / zmień zdjęcie
						</button>
					</div>
				</div>
			) : (
				<div className="mb-4 rounded-lg border-2 border-dashed border-[#d1d5db] bg-[#fafafa] p-6">
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
						<Button type="button" onClick={() => cameraInputRef.current?.click()}>
							<Camera className="mr-2 h-4 w-4" aria-hidden="true" />
							Zrób zdjęcie telefonem
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => fileInputRef.current?.click()}
							className="hover:border-blue-600 hover:text-blue-600"
						>
							<ImageUp className="mr-2 h-4 w-4" aria-hidden="true" />
							Dodaj plik z komputera
						</Button>
					</div>
					<input
						ref={cameraInputRef}
						type="file"
						accept="image/*"
						capture="environment"
						className="hidden"
						onChange={(e) => applyPhoto(e.target.files?.[0])}
					/>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={(e) => applyPhoto(e.target.files?.[0])}
					/>
				</div>
			)}
			{photoError && <p className="mb-4 text-sm text-red-600">{photoError}</p>}

			<Button className="w-full" disabled={!photoFile} onClick={() => setModalOpen(true)}>
				Wyślij zapytanie i zdjęcie
			</Button>

			<SubmitPhotoModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				photoFile={photoFile}
				onSuccess={() => setSent(true)}
			/>
		</div>
	);
};

export default KeyPhotoInquiry;
