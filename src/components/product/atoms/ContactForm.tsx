"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { handleContactFormSubmission } from "@/app/(static-pages)/kontakt/actions";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactFormSchema = z.object({
	email: z.string().email("Podaj poprawny adres email"),
	message: z.string().min(1, "Wiadomość jest wymagana"),
});

type ContactFormData = z.infer<typeof contactFormSchema> & {
	gRecaptchaToken: string;
	title: string;
};

const ContactForm: React.FC<{ productTitle: string }> = ({ productTitle }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const methods = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			email: "",
			message: "",
			title: productTitle,
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const [loading, setLoading] = React.useState(false);
	const [submitStatus, setSubmitStatus] = React.useState<string>("");
	const [isRecaptchaReady, setIsRecaptchaReady] = React.useState(false);

	useEffect(() => {
		if (executeRecaptcha) {
			setIsRecaptchaReady(true);
		}
	}, [executeRecaptcha]);

	const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
		setSubmitStatus("");
		setLoading(true);

		if (!isRecaptchaReady) {
			toast.error("ReCAPTCHA not available. Please try again later.");
			setLoading(false);
			return;
		}

		try {
			const gRecaptchaToken = await executeRecaptcha!("contactSubmit");

			const dataToSubmit = {
				...data,
				gRecaptchaToken,
				title: productTitle,
			};

			const result = await handleContactFormSubmission(dataToSubmit);

			if (result.success) {
				toast.success("Wiadomość została wysłana.");
				methods.reset(); // Resetuje formularz po udanym wysłaniu
			} else {
				setSubmitStatus("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
				toast.error("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("Wystąpił błąd. Spróbuj ponownie.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-1">
				<div>
					<Label htmlFor="title" className="mb-1 text-sm font-semibold">
						Tytuł <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="title"
						{...register("title")}
						className="mt-1 block w-full rounded-md border p-2"
					/>
					{errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
				</div>
				<div>
					<Label htmlFor="email" className="mb-1 text-sm font-semibold">
						Adres e-mail <span className="text-red-500">*</span>
					</Label>
					<Input
						type="email"
						id="email"
						{...register("email")}
						className="mt-1 block w-full rounded-md border p-2"
					/>
					{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
				</div>
				<div>
					<Label htmlFor="message" className="mb-1 text-sm font-semibold">
						Wiadomość <span className="text-red-500">*</span>
					</Label>
					<textarea
						id="message"
						{...register("message")}
						className="mt-1 block w-full rounded-md border p-2"
						rows={5}
					/>
					{errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
				</div>

				<Button
					type="submit"
					className="w-full rounded-md px-4 py-2 text-white transition"
					disabled={loading || !isRecaptchaReady}
				>
					{loading ? "Wysyłanie..." : "Wyślij wiadomość"}
				</Button>

				{submitStatus && <p className="mt-4 text-center text-sm text-red-600">{submitStatus}</p>}
			</form>
		</FormProvider>
	);
};

export default ContactForm;
