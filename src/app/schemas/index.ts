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
		password: z.string().min(8, { message: "Minimum 8 znaków" }),
		email: z.string(),
		re_password: z.string().min(7, { message: "Minimum 8 znaków" }),
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

export const EmailSchema = z.object({
	email: z.string().email({ message: "Niepoprawny adres email" }),
});

export const ChangePasswordSchema = z
	.object({
		uid: z.string(),
		token: z.string(),
		new_password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
		re_new_password: z.string(),
	})
	.refine((data) => data.new_password === data.re_new_password, {
		message: "Hasła muszą być takie same",
		path: ["re_new_password"],
	});
