import type { NextAuthConfig } from "next-auth";
import { AuthorizeSchema } from "@/app/schemas";
import Credentials from "next-auth/providers/credentials";

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = AuthorizeSchema.safeParse(credentials);
				if (validatedFields.success) {
					const user = {
						email: validatedFields.data.username,
					};
					return {
						...user,
						accessToken: validatedFields.data.token,
					};
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
