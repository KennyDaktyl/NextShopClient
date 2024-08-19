"use server";

import { sendContactEmail } from "@/api/sendEmailByContactForm";

export const handleContactFormSubmission = async ({
	title,
	email,
	message,
}: {
	title: string;
	email: string;
	message: string;
}) => {
	try {
		const response = await sendContactEmail({ title, email, message });

		if ("message" in response) {
			return { success: true, message: "Wiadomość wysłana pomyślnie!" };
		} else {
			return { success: false, message: "Coś poszło nie tak, spróbuj ponownie później." };
		}
	} catch (error) {
		return { success: false, message: "Błąd podczas wysyłania wiadomości." };
	}
};
