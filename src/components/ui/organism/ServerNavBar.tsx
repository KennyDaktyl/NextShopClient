import { cookies } from "next/headers";
import NavBar from "@/components/ui/organism/NavBar";
import { getTotalPrice } from "@/api/getCartTotalPrice";

async function getCookieData() {
	const sessionId = cookies().get("sessionid")?.value;
	return new Promise<string | undefined>((resolve) =>
		setTimeout(() => {
			resolve(sessionId);
		}, 1000),
	);
}

export async function ServerNavBar() {
	const sessionId = await getCookieData();
	let totalPrice = 0;

	if (sessionId) {
		const response = await getTotalPrice(sessionId);
		if ("total_price" in response) {
			totalPrice = response.total_price;
		}
	}

	return <NavBar totalPrice={totalPrice} />;
}

export default ServerNavBar;
