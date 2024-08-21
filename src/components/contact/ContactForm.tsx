"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { handleContactFormSubmission } from "@/app/(static-pages)/kontakt/actions";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const contactFormSchema = z.object({
	title: z.string().min(1, "Tytuł jest wymagany"),
	email: z.string().email("Podaj poprawny adres email"),
	message: z.string().min(1, "Wiadomość jest wymagana"),
});

type ContactFormData = {
	title: string;
	email: string;
	message: string;
	gRecaptchaToken: string;
};

export const ContactForm: React.FC = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [formData, setFormData] = useState({
		title: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [honeypot, setHoneypot] = useState("");
	const [submitStatus, setSubmitStatus] = useState<string>("");
	const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

	useEffect(() => {
		if (executeRecaptcha) {
			setIsRecaptchaReady(true);
		}
	}, [executeRecaptcha]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitStatus("");

		if (honeypot) {
			toast.error("Wykryto spam.");
			setLoading(false);
			return;
		}

		if (!isRecaptchaReady) {
			toast.error("ReCAPTCHA not available. Please try again later.");
			setLoading(false);
			return;
		}

		try {
			const gRecaptchaToken = await executeRecaptcha!("contactSubmit");

			const validationResult = contactFormSchema.safeParse(formData);

			if (!validationResult.success) {
				validationResult.error.errors.forEach((err) => {
					toast.error(err.message);
				});
				setLoading(false);
				return;
			}

			const dataToSubmit: ContactFormData = {
				...formData,
				gRecaptchaToken,
			};

			const result = await handleContactFormSubmission(dataToSubmit);

			if (result.success) {
				toast.success("Wiadomość została wysłana.");
				setFormData({
					title: "",
					email: "",
					message: "",
				});
			} else {
				setSubmitStatus("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
				toast.error("Nie udało się wysłać wiadomości. Spróbuj ponownie.", {
					position: "top-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("Wystąpił błąd. Spróbuj ponownie.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 p-1">
			<input
				type="text"
				name="honeypot"
				value={honeypot}
				onChange={(e) => setHoneypot(e.target.value)}
				style={{ display: "none" }}
				tabIndex={-1}
				autoComplete="off"
			/>

			<div>
				<label className="block text-sm font-medium text-gray-700">Tytuł</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleInputChange}
					className="mt-1 block w-full rounded-md border p-2"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					className="mt-1 block w-full rounded-md border p-2"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Wiadomość</label>
				<textarea
					name="message"
					value={formData.message}
					onChange={handleInputChange}
					className="mt-1 block w-full rounded-md border p-2"
					rows={5}
					required
				/>
			</div>

			<Button
				type="submit"
				className="w-full rounded-md px-4 py-2 text-white transition"
				disabled={loading || !isRecaptchaReady}
			>
				{loading ? "Wysyłanie..." : "Wyślij"}
			</Button>

			{submitStatus && <p className="mt-4 text-center text-sm text-red-600">{submitStatus}</p>}
		</form>
	);
};
