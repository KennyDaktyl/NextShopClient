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
import { handleContactFormSubmission } from "@/app/(static-pages)/kontakt/actions";
import { StampDesignerSubmitPayload } from "./types";

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

interface SubmitDesignModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	payload: Omit<StampDesignerSubmitPayload, "email" | "phone" | "note">;
	onSubmit?: (payload: StampDesignerSubmitPayload) => void;
}

export const SubmitDesignModal = ({ open, onOpenChange, payload, onSubmit }: SubmitDesignModalProps) => {
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
		setLoading(true);
		setErrorMessage("");

		try {
			const fullPayload: StampDesignerSubmitPayload = {
				...payload,
				email: data.email,
				phone: data.phone,
				note: data.note ?? "",
			};

			if (onSubmit) {
				onSubmit(fullPayload);
				setSuccess(true);
				return;
			}

			const messageLines = [
				`Zgłoszenie projektu pieczątki (źródło: ${fullPayload.source}).`,
				fullPayload.note ? `Uwagi: ${fullPayload.note}` : null,
			].filter(Boolean);

			const stampDesign = fullPayload.lines
				.filter((line) => line.text.trim().length > 0)
				.map((line) => ({
					text: line.text,
					font: line.font,
					size: line.size,
					bold: line.bold,
					italic: line.italic,
				}));

			const result = await handleContactFormSubmission({
				title: "Nowe zgłoszenie: projekt pieczątki",
				email: data.email,
				message: messageLines.join("\n"),
				phone: data.phone,
				stampDesign,
			});

			if (result.success) {
				setSuccess(true);
				reset();
			} else {
				setErrorMessage("Nie udało się wysłać zgłoszenia. Spróbuj ponownie.");
			}
		} catch (error) {
			console.error("Error submitting stamp design:", error);
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
						<p className="text-sm text-[#4b5563]">Odezwiemy się w ciągu 24h z wyceną projektu.</p>
						<Button className="mt-4" onClick={() => onOpenChange(false)}>
							Zamknij
						</Button>
					</div>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Wyślij projekt do wyceny</DialogTitle>
							<DialogDescription>
								Podaj dane kontaktowe — odpowiemy z wyceną i terminem realizacji.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
							<div>
								<Label htmlFor="stamp-email" className="mb-1 text-sm font-semibold">
									Adres e-mail <span className="text-red-500">*</span>
								</Label>
								<Input id="stamp-email" type="email" {...register("email")} />
								{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
							</div>
							<div>
								<Label htmlFor="stamp-phone" className="mb-1 text-sm font-semibold">
									Telefon <span className="text-red-500">*</span>
								</Label>
								<Input id="stamp-phone" type="tel" {...register("phone")} />
								{errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
							</div>
							<div>
								<Label htmlFor="stamp-note" className="mb-1 text-sm font-semibold">
									Uwagi (opcjonalnie)
								</Label>
								<Textarea id="stamp-note" rows={3} {...register("note")} />
							</div>
							{errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Wysyłanie..." : "Wyślij projekt do wyceny"}
							</Button>
						</form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SubmitDesignModal;
