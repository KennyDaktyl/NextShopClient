import { z } from "zod";

export const LoginSchema = z.object({
	username: z.string().email({ message: "Niepoprawny adres email" }),
	password: z.string().min(1, { message: "Hasło jest wymagane" }),
});

export const AuthorizeSchema = z.object({
	username: z.string().email({ message: "Niepoprawny adres email" }),
	token: z.string(),
});

export const RegisterSchema = z
	.object({
		username: z.string().email({ message: "Niepoprawny adres email" }),
		password: z.string().min(6, { message: "Minimum 7 znaków" }),
		email: z.string(),
		re_password: z.string().min(6, { message: "Minimum 7 znaków" }),
		terms: z.boolean({ message: "Musisz zaakceptować regulamin" }),
	})
	.refine(
		(data) => {
			return data.password === data.re_password;
		},
		{
			message: "Hasła muszą być takie same",
			path: ["re_password"],
		},
	);

export const ActivateSchema = z.object({
	uid: z.string(),
	token: z.string(),
});
