"use server";

import { LoginSchema } from "@/app/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEAFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Dane nie walidują się!.",
		};
	}

	const { username, password } = validatedFields.data;

	try {
		await signIn("credentials", {
			username,
			password,
			redirectTo: DEAFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Niepoprawne dane logowania." };
				case "CallbackRouteError":
					return { error: "Niepoprawne dane logowania." };
				default:
					return { error: "Coś poszło nie tak." };
			}
		}

		throw error;
	}
	return { success: true };
};
