import { getCartItems } from "@/api/getCartItems";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { CartItems, CartTotalPrice, ErrorResponse } from "@/app/types";
import { CartDetailsButton } from "@/components/cart/CartDetailsButton";
import { Overlay } from "@/components/cart/Overlay";

export default async function CartPage() {
	const response: CartItems | ErrorResponse = await getCartItems();
	const res: CartTotalPrice | ErrorResponse = await getTotalPrice();
	
	let totalPrice = 0;
	if ('total_price' in res) {
        totalPrice = res.total_price;
    } else {
        console.error('Error fetching total price:', res.status);
    }

	if ('cart_items' in response) {
	  return (
		<Overlay>
		  <h2 className="mb-4 text-xl font-semibold">Podgląd koszyka</h2>
		  <div className="flex flex-col gap-4">
			{response.cart_items.map((item) => (
			  <div key={item.id} className="flex items-center justify-between">
				<div>
				  <p className="text-lg font-semibold">{item.name}</p>
				  <p className="text-sm text-gray-500">Ilość: {item.quantity}</p>
				</div>
				<p className="text-lg font-semibold">{item.price} zł</p>
			  </div>
			))}
		  </div>
			
			 <CartDetailsButton totalPrice={totalPrice} />
		</Overlay>
	  );
	} else {
		return (
			<Overlay>
				<h1 className="mb-4 text-3xl font-semibold">Błąd ładowania koszyka</h1>
				<p>Status błędu: {response.status}</p>
			</Overlay>
		);
	}
}

  {/* <form action={removeCartAction}>
				<Button
					type="submit"
					className="w-full rounded-md text-white transition hover:bg-gray-500"
				>
					Usuń koszyk
				</Button>
			</form>  */}