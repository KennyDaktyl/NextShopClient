"use server";

import { sendReviewForm } from "@/api/sendReview";
import { revalidatePath } from "next/cache";

export const handleReviewFormSubmission = async ({
	name,
	product,
	rating,
	message,
}: {
	name: string;
	product: number;
	rating: number;
	message: string;
}) => {
	try {
		const response = await sendReviewForm({ name, product, rating, message });
		console.log(response);
		if ("message" in response) {
			revalidatePath(`product-${product}`);
			return { success: true, message: "Opinia wysłana pomyślnie!" };
		} else {
			return { success: false, message: "Coś poszło nie tak, spróbuj ponownie później." };
		}
	} catch (error) {
		return { success: false, message: "Błąd podczas wysyłania opinii." };
	}
};
