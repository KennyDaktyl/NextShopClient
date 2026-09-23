"use server";

import { sendContactEmail } from "@/api/sendEmailByContactForm";
import { StampDesignLine } from "@/app/types";

export const handleContactFormSubmission = async ({
	title,
	email,
	message,
	phone,
	stampDesign,
	stampImage,
	stampColor,
}: {
	title: string;
	email: string;
	message: string;
	phone?: string;
	stampDesign?: StampDesignLine[];
	stampImage?: string;
	stampColor?: string;
}) => {
	try {
		const response = await sendContactEmail({
			title,
			email,
			message,
			phone,
			stampDesign,
			stampImage,
			stampColor,
		});

		if ("message" in response) {
			return { success: true, message: "Wiadomość wysłana pomyślnie!" };
		} else {
			return { success: false, message: "Coś poszło nie tak, spróbuj ponownie później." };
		}
	} catch (error) {
		return { success: false, message: "Błąd podczas wysyłania wiadomości." };
	}
};
