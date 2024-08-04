// components/ServerNavBar.tsx

import { cookies } from "next/headers";
import NavBar from "@/components/ui/organism/NavBar";
import { getTotalPrice } from "@/api/getCartTotalPrice";

async function getCookieData() {
	const cookieData = cookies().get("cartId")?.value;
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(cookieData);
		}, 1000),
	);
}

export async function ServerNavBar() {
	const cartId = await getCookieData();
	let totalPrice = 0;

	if (cartId) {
		const response = await getTotalPrice();
		if ("total_price" in response) {
			totalPrice = response.total_price;
		}
	}

	return <NavBar totalPrice={totalPrice} />;
}

export default ServerNavBar;
