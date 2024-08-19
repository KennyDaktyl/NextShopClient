"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { handleContactFormSubmission } from "@/app/(static-pages)/kontakt/actions";
import { z } from "zod";

const contactFormSchema = z.object({
	title: z.string().min(1, "Tytuł jest wymagany"),
	email: z.string().email("Podaj poprawny adres email"),
	message: z.string().min(1, "Wiadomość jest wymagana"),
});

export const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState({
		title: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const validationResult = contactFormSchema.safeParse(formData);

		if (!validationResult.success) {
			validationResult.error.errors.forEach((err) => {
				toast.error(err.message);
			});
			setLoading(false);
			return;
		}

		const result = await handleContactFormSubmission(formData);

		if (result.success) {
			toast.success(result.message, {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setFormData({
				title: "",
				email: "",
				message: "",
			});
		} else {
			toast.error(result.message);
		}

		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 p-1">
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
				disabled={loading}
			>
				{loading ? "Wysyłanie..." : "Wyślij"}
			</Button>
		</form>
	);
};
