import { z } from "zod";

const baseSchema = z.object({
	name: z.string().min(1, "Imię i nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	phone: z.string().min(1, "Numer telefonu jest wymagany"),
	street: z.string().optional(), // Optional initially
	house: z.string().optional(), // Optional initially
	door: z.string().optional(),
	postalCode: z.string().optional(), // Optional initially
	city: z.string().optional(), // Optional initially
	products_price: z.string(),
	delivery_price: z.string(),
	products: z.string(),
});

export type baseSchema = z.infer<typeof baseSchema>;
