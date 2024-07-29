"use server";

import { cookies } from "next/headers";

export async function fetchCartCount() {
	const cartId = cookies().get("cartId")?.value;
	let count = 0;

	if (cartId) {
		// Tutaj możesz dodać logikę pobierania elementów z koszyka z bazy danych lub API
		const items = [];
		count = items.length;
	}

	return count;
}
