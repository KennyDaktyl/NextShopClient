"use server";

import { sendContactEmail } from "@/api/sendEmailByContactForm";
import { StampDesignLine } from "@/app/types";

export const handleContactFormSubmission = async ({
	title,
	email,
	message,
	phone,
	stampDesign,
}: {
	title: string;
	email: string;
	message: string;
	phone?: string;
	stampDesign?: StampDesignLine[];
}) => {
	try {
		const response = await sendContactEmail({ title, email, message, phone, stampDesign });

		if ("message" in response) {
			return { success: true, message: "Wiadomość wysłana pomyślnie!" };
		} else {
			return { success: false, message: "Coś poszło nie tak, spróbuj ponownie później." };
		}
	} catch (error) {
		return { success: false, message: "Błąd podczas wysyłania wiadomości." };
	}
};
