"use server";
import axios from "axios";
import { ActivateSchema } from "@/app/schemas";
import * as z from "zod";

export const activate = async (values: z.infer<typeof ActivateSchema>) => {
	const validatedFields = ActivateSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Niepoprawne dane aktywacji.",
		};
	}

	const url = `${process.env.API_URL}/auth/users/activation/`;
	const headers = {
		"Content-Type": "application/json",
		accept: "application/json",
	};
	try {
		const response = await axios.post(url, validatedFields.data, { headers });
		if (response.status !== 204) {
			return {
				error: "Błąd aktywacji konta.",
			};
		}
		return {
			success: "Konto aktywowane. Możesz się zalogować.",
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			if (error.response.status === 403) {
				return {
					error:
						"Aktywacja konta jest niedozwolona. Możliwe że token stracił ważność lub jest wykorzystany.",
				};
			}
		}
		return {
			error: "Coś poszło nie tak.",
		};
	}
};
