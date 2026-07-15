"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleKeyPhotoInquirySubmission } from "./actions";

const polishPhoneRegex = /^(\+48[\s-]?)?(\d[\s-]?){9}$/;

const submitSchema = z.object({
	email: z.string().email("Podaj poprawny adres email"),
	phone: z
		.string()
		.min(1, "Telefon jest wymagany")
		.regex(polishPhoneRegex, "Podaj poprawny numer telefonu (np. 123 456 789 lub +48 123 456 789)"),
	note: z.string().optional(),
});

type SubmitFormData = z.infer<typeof submitSchema>;

interface SubmitPhotoModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	photoFile: File | null;
	onSuccess: () => void;
}

export const SubmitPhotoModal = ({ open, onOpenChange, photoFile, onSuccess }: SubmitPhotoModalProps) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SubmitFormData>({
		resolver: zodResolver(submitSchema),
		defaultValues: { email: "", phone: "", note: "" },
	});

	useEffect(() => {
		if (open) {
			setSuccess(false);
			setErrorMessage("");
		}
	}, [open]);

	const onValidSubmit = async (data: SubmitFormData) => {
		if (!photoFile) {
			setErrorMessage("Brak zdjęcia klucza. Zamknij okno i dodaj zdjęcie ponownie.");
			return;
		}

		setLoading(true);
		setErrorMessage("");

		try {
			const formData = new FormData();
			formData.append("photo", photoFile);
			formData.append("email", data.email);
			formData.append("phone", data.phone);
			if (data.note) formData.append("note", data.note);

			const result = await handleKeyPhotoInquirySubmission(formData);
			if (result.success) {
				setSuccess(true);
				reset();
				onSuccess();
			} else {
				setErrorMessage(result.message);
			}
		} catch (error) {
			console.error("Error submitting key photo inquiry:", error);
			setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				{success ? (
					<div className="py-4 text-center">
						<DialogTitle className="mb-2">Dziękujemy!</DialogTitle>
						<p className="text-sm text-[#4b5563]">
							Otrzymaliśmy zdjęcie klucza i zgłoszenie. Odezwiemy się z oceną w ciągu 24h.
						</p>
						<Button className="mt-4" onClick={() => onOpenChange(false)}>
							Zamknij
						</Button>
					</div>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Wyślij zapytanie i zdjęcie</DialogTitle>
							<DialogDescription>
								Podaj dane kontaktowe — ocenimy zdjęcie i odezwiemy się z odpowiedzią.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
							<div>
								<Label htmlFor="key-photo-email" className="mb-1 text-sm font-semibold">
									Adres e-mail <span className="text-red-500">*</span>
								</Label>
								<Input id="key-photo-email" type="email" {...register("email")} />
								{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
							</div>
							<div>
								<Label htmlFor="key-photo-phone" className="mb-1 text-sm font-semibold">
									Telefon <span className="text-red-500">*</span>
								</Label>
								<Input id="key-photo-phone" type="tel" {...register("phone")} />
								{errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
							</div>
							<div>
								<Label htmlFor="key-photo-note" className="mb-1 text-sm font-semibold">
									Notatka (opcjonalnie)
								</Label>
								<Textarea
									id="key-photo-note"
									rows={3}
									placeholder="Napis na kluczu, marka zamka, inne szczegóły..."
									{...register("note")}
								/>
							</div>
							{errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Wysyłanie..." : "Wyślij zapytanie i zdjęcie"}
							</Button>
						</form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SubmitPhotoModal;
