import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";
import { Check, XCircle, FileText } from "lucide-react";
import { CartItem, Order } from "@/app/types";

export const OrdersTable = ({ orders }: { orders: Order[] }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedOrderItems, setSelectedOrderItems] = useState<CartItem[]>([]);

	const openOrderItemsDialog = (cartItemsJson: string) => {
		const items = JSON.parse(cartItemsJson) as CartItem[];
		setSelectedOrderItems(items);
		setIsDialogOpen(true);
	};

	const closeOrderItemsDialog = () => {
		setSelectedOrderItems([]);
		setIsDialogOpen(false);
	};

	return (
		<Card className="p-0">
			<CardHeader>
				<CardTitle>Lista zamówień</CardTitle>
			</CardHeader>
			<CardContent className="overflow-x-auto p-0">
				<table className="w-full min-w-full table-auto border-collapse">
					<thead className="bg-gray-200">
						<tr>
							<th className="border px-4 py-2">Numer Zamówienia</th>
							<th className="border px-4 py-2">Data</th>
							<th className="border px-4 py-2">Kwota</th>
							<th className="border px-4 py-2">Produkty</th>
							<th className="border px-4 py-2">Dokument</th>
							<th className="border px-4 py-2">Status</th>
							<th className="border px-4 py-2">Zapłacone</th>
							<th className="border px-4 py-2">Metoda płatności</th>
							<th className="border px-4 py-2">Metoda dostawy</th>
							<th className="border px-4 py-2">Koszt dostawy</th>
							<th className="border px-4 py-2">Koszt płatności</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id} className="hover:bg-gray-100">
								<td className="border px-4 py-2 text-center text-xs">{order.order_number}</td>
								<td className="border px-4 py-2 text-center text-xs">
									{new Date(order.created_date).toLocaleDateString()}
								</td>
								<td className="border px-4 py-2 text-center text-xs font-bold">
									{order.amount} zł
								</td>
								<td className="border px-4 py-2 text-center text-xs">
									{order.cart_items.length > 0 ? (
										<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													onClick={() => openOrderItemsDialog(order.cart_items)}
												>
													<FileText className="h-5 w-5" />
												</Button>
											</DialogTrigger>
											<DialogContent className="max-w-3xl p-4">
												<DialogHeader>
													<DialogTitle>Szczegóły zamówienia</DialogTitle>
													<DialogClose className="absolute right-2 top-2"></DialogClose>
												</DialogHeader>
												<div className="space-y-4">
													{selectedOrderItems.map((item) => (
														<div key={item.id} className="flex space-x-4 py-2">
															<img
																src={item.image?.url || ""}
																alt={item.image?.alt || item.name}
																className="h-16 w-16 object-cover"
															/>
															<div>
																<p className="font-semibold">{item.name}</p>
																<p className="text-sm text-gray-600">Ilość: {item.quantity}</p>
																<p className="text-sm text-gray-600">Cena: {item.price} zł</p>
															</div>
														</div>
													))}
												</div>
												<DialogFooter>
													<Button variant="outline" onClick={closeOrderItemsDialog}>
														Zamknij
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									) : (
										<span>Brak produktów</span>
									)}
								</td>
								<td className="border px-4 py-2 text-center">
									{order.is_paid ? (
										<Check className="inline-block text-green-500" />
									) : (
										<XCircle className="inline-block text-red-500" />
									)}
								</td>
								<td className="border px-4 py-2 text-center text-xs">
									<Badge variant={"outline"}>
										<span className="text-xs">{order.status}</span>
									</Badge>
								</td>
								<td className="border px-4 py-2 text-center">
									{order.is_paid ? (
										<Check className="inline-block text-green-500" />
									) : (
										<XCircle className="inline-block text-red-500" />
									)}
								</td>
								<td className="border px-4 py-2 text-center text-xs">
									{order.payment_method.name}
								</td>
								<td className="border px-4 py-2 text-center text-xs">
									{order.delivery_method.name}
								</td>
								<td className="border px-4 py-2 text-center text-xs">{order.delivery_price} zł</td>
								<td className="border px-4 py-2 text-center text-xs">{order.payment_price} zł</td>
							</tr>
						))}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
};
