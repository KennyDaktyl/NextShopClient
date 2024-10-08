import { MobileIcon } from "@radix-ui/react-icons";
import { z } from "zod";

export const basicUserDataSchema = z.object({
	username: z.string().min(1, "Login jest wymagany"),
	first_name: z.string().min(1, "Imię jest wymagane"),
	last_name: z.string().min(1, "Nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	mobile: z.string().min(9, "Numer telefonu jest wymagany"),
});

export const addressUserDataSchema = z.object({
	street: z.string().min(1, "Ulica jest wymagana"),
	house_number: z.string().min(1, "Numer domu jest wymagany"),
	local_number: z.string().nullable().optional(),
	postal_code: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
	city: z.string().min(1, "Miasto jest wymagane"),
});

export const invoiceUserDataSchema = z.object({
	company: z.string().min(1, "Nazwa firmy jest wymagana"),
	company_payer: z.string().optional().nullable(),
	nip: z.string().min(1, "NIP jest wymagany").max(10, "NIP jest za długi"),
	invoice_street: z.string().min(1, "Ulica jest wymagana"),
	invoice_house_number: z.string().min(1, "Numer domu jest wymagany"),
	invoice_local_number: z.string().nullable().optional(),
	invoice_city: z.string().min(1, "Miasto jest wymagane"),
	invoice_postal_code: z
		.string()
		.regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
});

export const ChangePasswordSchema = z
	.object({
		new_password: z.string().min(7, { message: "Minimum 7 znaków" }),
		re_new_password: z.string().min(7, { message: "Minimum 7 znaków" }),
	})
	.refine(
		(data) => {
			return data.new_password === data.re_new_password;
		},
		{
			message: "Hasła muszą być takie same",
			path: ["re_new_password"],
		},
	);
