import { getCartItems } from "@/api/getCartItems";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { ChangeQuantity } from "@/components/cart/ChangeItemQty";
import { RemoveButton } from "@/components/cart/RemoveButton";
import RemoveCartForm from "@/components/cart/RemoveCartForm";
import { formatMoney } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export default async function CartPage() {
	const response = await getCartItems();
	const responseTotalPrice = await getTotalPrice();
	let cartItems = [];
	let totalPrice = 0;

	if ("cart_items" in response) {
		cartItems = response.cart_items;
	} else {
		return (
			<div className="">
				<h1 className="mb-4 text-3xl font-semibold">Błąd ładowania koszyka</h1>
				<p>Status błędu: {response.status}</p>
			</div>
		);
	}

	if ("total_price" in responseTotalPrice) {
		totalPrice = responseTotalPrice.total_price;
	} else {
		console.error("Error fetching total price:", responseTotalPrice.status);
	}

	return (
		<div className="">
			<h1 className="mb-4 text-3xl font-semibold">Podsumowanie koszyka</h1>
			{cartItems.length > 0 ? (
				<>
					<div className="overflow-x-auto">
						<table className="mx-auto w-full min-w-[800px] table-fixed border-collapse border border-gray-300">
							<thead>
								<tr>
									<th className="w-[300px] border border-gray-300 px-4 py-2">Nazwa produktu</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2">Foto</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2">Cena za szt.</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2">Ilość</th>
									<th className="w-[200px] border border-gray-300 px-4 py-2">Razem</th>
									<th className="w-[100px] border border-gray-300 px-4 py-2">Akcja</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item, index) => (
									<tr key={index} className="border border-gray-300">
										<td className="min-w-[300px] px-4 py-2 text-lg">
											<div className="flex h-full items-center">
												<Link
													role="link"
													aria-current="page"
													href={item.url}
													className="h-full hover:text-gray-600"
												>
													<p className="w-full text-left">{item.name}</p>
													{item.variant && (
														<p className="w-full text-left text-sm text-gray-500">{item.variant}</p>
													)}
												</Link>
											</div>
										</td>
										<td className="w-[150px] border border-gray-300 p-1">
											{item.image ? (
												<Image
													src={item.image.image_url}
													alt={item.image.alt ? item.image.alt : item.name}
													title={item.image.title ? item.image.title : item.name}
													className="max-h-[150px] max-w-[150px] rounded-md object-cover"
													height={item.image.height}
													width={item.image.width}
												/>
											) : (
												<div className="flex h-[150px] w-[150px] items-center justify-center rounded-md bg-gray-200">
													<span className="text-center text-gray-500">No image available</span>
												</div>
											)}
										</td>
										<td
											data-testid="product-price"
											className="w-[100px] border border-gray-300 px-4 py-2 text-center"
										>
											<div className="flex flex-wrap items-center justify-center">
												<p className="w-full text-center">{formatMoney(item.price)}</p>
												<span className="mt-1 w-full text-center text-xs">
													{formatMoney(item.price / 1.23)}+23% VAT
												</span>
											</div>
										</td>
										<ChangeQuantity
											itemId={item.item_id}
											quantity={item.quantity}
											price={item.price}
										/>

										<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
											<RemoveButton productId={item.id} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="mt-4 flex w-full items-center justify-between">
						<RemoveCartForm />
						<form className="flex items-center justify-start">
							<button
								type="submit"
								className="w-52 max-w-xs rounded-lg border bg-slate-950 py-2 text-white shadow transition-colors hover:bg-slate-800"
							>
								Do zapłaty&nbsp;{formatMoney(totalPrice)}
							</button>
						</form>
					</div>
				</>
			) : (
				<p>Brak produktów</p>
			)}
		</div>
	);
}
