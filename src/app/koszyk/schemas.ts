import { z } from "zod";

export const cartItemSchema = z.object({
	id: z.number(),
	item_id: z.string(),
	name: z.string(),
	slug: z.string(),
	price: z.string().min(1, "Cena produktu jest wymagana"),
	variant: z.string().nullable().optional(),
	selected_option: z.string().nullable().optional(),
	quantity: z.number().min(1, "Ilość jest wymagana"),
	available_quantity: z.number(),
	image: z.object({
		id: z.number(),
		width: z.number(),
		height: z.number(),
		url: z.string(),
		alt: z.string().nullable().optional(),
		title: z.string().nullable().optional(),
	}),
	url: z.string(),
});

export const basicSchema = z.object({
	name: z.string().min(1, "Imię i nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	mobile: z.string().min(1, "Numer telefonu jest wymagany"),
	cart_items_price: z.string().min(1, "Cena produktów jest wymagana"),
	delivery_price: z.string().min(1, "Cena dostawy jest wymagana"),
	payment_price: z.string().min(1, "Cena płatności jest wymagana"),
	cart_items: z.array(cartItemSchema).min(1, "Produkty są wymagane"),
	delivery_method: z.string().min(1, "Metoda dostawy jest wymagana"),
	payment_method: z.string().min(1, "Metoda płatności jest wymagana"),
	amount: z.string().min(1, "Cena końcowa jest wymagana"),
	inpost_box_id: z.string().optional(),
	info: z.string().optional().nullable(),
});

export const addressSchema = basicSchema.extend({
	street: z.string().min(1, "Ulica jest wymagana"),
	house: z.string().min(1, "Numer domu jest wymagany"),
	postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
	city: z.string().min(1, "Miasto jest wymagane"),
});
