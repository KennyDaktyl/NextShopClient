"use server";
import axios from "axios";
import { RegisterSchema } from "@/app/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Niepoprawne dane logowania.",
		};
	}

	const url = `${process.env.API_URL}/auth/users/`;
	const headers = {
		"Content-Type": "application/json",
		accept: "application/json",
	};
	try {
		const response = await axios.post(url, validatedFields.data, { headers });
		if (response.status !== 201) {
			return {
				error: "Coś poszło nie tak.",
			};
		}
		return {
			success: "Rejestracja udana. Sprawdź email w celu aktywacji konta",
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response && error.response.status === 401) {
				return {
					error: "Niepoprawne dane logowania.",
				};
			}
		}
		return {
			error: "Login już istnieje.",
		};
	}
};
