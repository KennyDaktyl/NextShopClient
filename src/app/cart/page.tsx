import { getCartItems } from "@/api/getCartItems";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { ChangeQuantity } from "@/components/cart/ChangeItemQty";
import { RemoveItemButton } from "@/components/cart/RemoveItemButton";
import RemoveCartForm from "@/components/cart/RemoveCartForm";
import { formatMoney } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export default async function CartPage() {
	const response = await getCartItems();
	const responseTotalPrice = await getTotalPrice();
	let cartItems = [];
	let totalPrice = 0;
	let totalNet = 0;
	let totalQty = 0;

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

	cartItems.forEach((item) => {
		totalQty += item.quantity;
		totalNet += (item.price / 1.23) * item.quantity;
	});
	const vatValue = totalPrice - totalNet;

	return (
		<div className="">
			<h1 className="mb-4 text-xl font-semibold md:text-xl">Podsumowanie koszyka</h1>
			{cartItems.length > 0 ? (
				<>
					<div className="overflow-x-auto">
						<table className="mx-auto w-full min-w-[800px] table-fixed border-collapse border border-gray-300">
							<thead>
								<tr>
									<th className="w-[300px] border border-gray-300 px-4 py-2 text-sm">
										Nazwa produktu
									</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">Foto</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">
										Cena za szt.
									</th>
									<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">Ilość</th>
									<th className="w-[200px] border border-gray-300 px-4 py-2 text-sm">Razem</th>
									<th className="w-[100px] border border-gray-300 px-4 py-2 text-sm">Akcja</th>
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
													<p className="text-md w-full text-left text-sm">{item.name}</p>
													{item.variant && (
														<p className="w-full text-left text-xs text-gray-500">{item.variant}</p>
													)}
													{item.selected_option && (
														<p className="w-full text-left text-xs text-gray-500">
															{item.selected_option}
														</p>
													)}
												</Link>
											</div>
										</td>
										<td className="border border-gray-300 p-1">
											<div className="flex w-full items-center justify-center">
												{item.image ? (
													<Image
														src={item.image.url}
														alt={item.image.alt ? item.image.alt : item.name}
														title={item.image.title ? item.image.title : item.name}
														className="max-h-[80px] max-w-[80px] rounded-md object-cover md:max-h-[150px] md:max-w-[150px]"
														height={item.image.height}
														width={item.image.width}
													/>
												) : (
													<div className="flex h-[80px] w-[80px] items-center justify-center rounded-md bg-gray-200">
														<span className="text-center text-xs text-gray-500">
															No image available
														</span>
													</div>
												)}
											</div>
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
											availableQuantity={item.available_quantity}
											price={item.price}
										/>

										<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
											<RemoveItemButton itemId={item.item_id} />
										</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr className="">
									<td colSpan={1} className="px-4 py-2 text-left font-semibold">
										Razem sztuk
									</td>
									<td colSpan={1} className="px-4 py-2 text-center">
										{totalQty}
									</td>
									<td colSpan={4}></td>
								</tr>
								<tr className="">
									<td colSpan={1} className="px-4 py-2 text-left font-semibold">
										VAT
									</td>
									<td colSpan={1} className="px-4 py-2 text-center">
										{formatMoney(vatValue)}
									</td>
									<td colSpan={4}></td>
								</tr>
								<tr>
									<td colSpan={1} className="px-4 py-2 text-left font-semibold">
										Suma netto
									</td>
									<td colSpan={1} className="px-4 py-2 text-center">
										{formatMoney(totalNet)}
									</td>
									<td colSpan={4}></td>
								</tr>
								<tr>
									<td colSpan={1} className="px-4 py-2 text-left font-semibold">
										Suma brutto
									</td>
									<td colSpan={1} className="px-4 py-2 text-center">
										{formatMoney(totalPrice)}
									</td>
									<td colSpan={4}></td>
								</tr>
							</tfoot>
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
