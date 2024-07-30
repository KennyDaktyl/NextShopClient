// components/ServerNavBar.tsx
import { cookies } from "next/headers";
import NavBar from "@/components/ui/organism/NavBar";
import { getTotalPrice } from "@/api/getCartTotalPrice";

export async function ServerNavBar() {
    const cartId = cookies().get("cartId")?.value;
    let totalPrice = 0;

    if (cartId) {
        const response = await getTotalPrice();
		if ('total_price' in response) {
            totalPrice = response.total_price;
        }
    }

    return <NavBar totalPrice={totalPrice} />;
}

export default ServerNavBar;