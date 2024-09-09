"use server";

import axios from "axios";
import { RegisterSchema } from "@/app/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	// Walidacja pól formularza
	if (!validatedFields.success) {
		return {
			error: "Niepoprawne dane logowania.",
			details: validatedFields.error.errors, // Zwracanie szczegółowych błędów walidacji
		};
	}

	const url = `${process.env.API_URL}/auth/users/`;
	const headers = {
		"Content-Type": "application/json",
		accept: "application/json",
	};

	try {
		const response = await axios.post(url, validatedFields.data, { headers });

		// Sprawdzenie, czy serwer zwrócił status 201 (utworzony)
		if (response.status !== 201) {
			return {
				error: "Coś poszło nie tak.",
			};
		}

		// Sukces: Zwracamy komunikat o poprawnej rejestracji
		return {
			success: "Rejestracja udana. Sprawdź email w celu aktywacji konta",
		};
	} catch (error) {
		// Sprawdzenie, czy błąd pochodzi z Axiosa i czy mamy dostęp do odpowiedzi serwera
		if (axios.isAxiosError(error) && error.response) {
			const { status, data } = error.response;

			// Obsługa błędu 400: Walidacja pól formularza
			if (status === 400) {
				const errors = data; // Djoser zwraca błędy walidacyjne w odpowiedzi

				// Możliwe szczegółowe błędy, np. login lub hasło
				let errorMessage = "Niepoprawne dane logowania.";
				if (errors.username) {
					errorMessage = `Błąd w polu nazwa użytkownika: ${errors.username.join(" ")}`;
				} else if (errors.email) {
					errorMessage = `Błąd w polu email: ${errors.email.join(" ")}`;
				} else if (errors.password) {
					errorMessage = `Błąd w polu hasło: ${errors.password.join(" ")}`;
				}

				return {
					error: errorMessage,
				};
			}

			// Obsługa błędu 401: Nieautoryzowane
			if (status === 401) {
				return {
					error: "Niepoprawne dane logowania.",
				};
			}

			// Obsługa innych błędów z serwera
			if (status >= 500) {
				return {
					error: "Błąd serwera. Spróbuj ponownie później.",
				};
			}
		}

		// Domyślna obsługa błędów: np. użytkownik już istnieje
		return {
			error: "Login lub email już istnieje.",
		};
	}
};
