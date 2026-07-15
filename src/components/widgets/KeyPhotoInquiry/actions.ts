"use server";

import { sendKeyPhotoInquiry } from "@/api/sendKeyPhotoInquiry";

export const handleKeyPhotoInquirySubmission = async (formData: FormData) => {
	try {
		const response = await sendKeyPhotoInquiry(formData);
		if ("message" in response) {
			return { success: true, message: response.message };
		}
		return { success: false, message: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie." };
	} catch (error) {
		console.error("Error submitting key photo inquiry:", error);
		return { success: false, message: "Wystąpił błąd. Spróbuj ponownie." };
	}
};
