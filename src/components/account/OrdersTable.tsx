import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Check, XCircle, FileText, File, Hourglass } from "lucide-react";
import { CartItem, Order } from "@/app/types";
import Link from "next/link";
import { formatMoney, handlePdfOpen } from "@/utils";
import Image from "next/image";
export const OrdersTable = ({ orders }: { orders: Order[] }) => {
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
	const [selectedOrderItems, setSelectedOrderItems] = useState<CartItem[]>([]);

	const openOrderItemsDialog = (orderId: string, cartItemsJson: string) => {
		const items = JSON.parse(cartItemsJson) as CartItem[];
		setSelectedOrderItems(items);
		setSelectedOrderId(orderId);
	};

	const closeOrderItemsDialog = () => {
		setSelectedOrderItems([]);
		setSelectedOrderId(null);
	};

	return (
		<Card className="p-0">
			<CardHeader>
				<CardTitle>Lista zamówień</CardTitle>
			</CardHeader>
			<CardContent className="overflow-x-auto p-0">
				<table className="w-full min-w-full table-auto border-collapse">
					<thead className="bg-muted">
						<tr>
							<th className="border px-4 py-2">Numer Zamówienia</th>
							<th className="border px-4 py-2">Data</th>
							<th className="border px-4 py-2">Kwota</th>
							<th className="border px-4 py-2">Produkty</th>
							<th className="border px-4 py-2">Faktura</th>
							<th className="border px-4 py-2">Status</th>
							<th className="border px-4 py-2">Zapłacone</th>
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
										<>
											<Button
												variant="ghost"
												onClick={() => openOrderItemsDialog(order.id, order.cart_items)}
											>
												<FileText className="h-5 w-5" />
											</Button>
											<Dialog
												open={selectedOrderId === order.id}
												onOpenChange={closeOrderItemsDialog}
												aria-describedby
											>
												<DialogContent className="max-w-3xl p-4">
													<DialogHeader>
														<DialogTitle>
															Szczegóły zamówienia&nbsp;{order.order_number}
														</DialogTitle>
														<DialogDescription>
															Opis zamówienia i szczegóły płatności
														</DialogDescription>{" "}
														<DialogClose className="absolute right-2 top-2"></DialogClose>
													</DialogHeader>
													<div className="space-y-4">
														{selectedOrderItems.map((item) => (
															<Link
																href={item.url}
																role="link"
																key={item.item_id}
																className="flex space-x-4 py-2 hover:bg-gray-100"
															>
																<Image
																	src={item.image?.url || ""}
																	alt={item.image?.alt || item.name}
																	className="object-cover"
																	width={64}
																	height={64}
																/>
																<div>
																	<p className="font-semibold">{item.name}</p>
																	{item.variant && (
																		<small className="font-xs w-full">
																			Wariant:&nbsp;{item.variant}
																		</small>
																	)}
																	{item.selected_option && (
																		<small className="font-xs w-full">
																			Opcja:&nbsp;{item.selected_option}
																		</small>
																	)}
																	{item.info && (
																		<small className="font-xs w-full">Info:&nbsp;{item.info}</small>
																	)}
																	<p className="w-full text-sm text-gray-600">
																		Ilość: {item.quantity}
																	</p>
																	<p className="text-sm text-gray-600">
																		Cena: {formatMoney(Number(item.price))}
																	</p>
																</div>
															</Link>
														))}
														<div className="mt-4">
															<p className="text-sm text-gray-600">
																<strong>Metoda płatności:</strong> {order.payment_method.name}
															</p>
															<p className="text-sm text-gray-600">
																<strong>Metoda dostawy:</strong> {order.delivery_method.name}{" "}
																{order.delivery_method.inpost_box && order.inpost_box_id && (
																	<span className="text-xs text-gray-500">
																		{order.inpost_box_id}
																	</span>
																)}
															</p>
															{Number(order.delivery_price) > 0 && (
																<p className="text-sm text-gray-600">
																	<strong>Koszt dostawy:</strong>{" "}
																	{formatMoney(Number(order.delivery_price))}
																</p>
															)}
															{Number(order.payment_price) > 0 && (
																<p className="text-sm text-gray-600">
																	<strong>Koszt płatności:</strong>{" "}
																	{formatMoney(Number(order.payment_price))}
																</p>
															)}
															<p className="text-sm text-gray-600">
																<strong>Koszt za produkty:</strong>{" "}
																{formatMoney(Number(order.cart_items_price))}
															</p>
															{order.info && (
																<div className="flex items-center">
																	<strong className="text-sm text-gray-600">Informacje:</strong>
																	<p className="ml-3 text-sm text-gray-600">{order.info}</p>
																</div>
															)}
															<p className="mt-2 text-sm text-gray-600">
																<strong>Suma:&nbsp;{order.amount} zł</strong>
															</p>
														</div>
													</div>
													<DialogFooter>
														<Button variant="outline" onClick={closeOrderItemsDialog}>
															Zamknij
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</>
									) : (
										<span>Brak produktów</span>
									)}
								</td>
								<td className="border px-4 py-2 text-center">
									{order.make_invoice === false ? (
										<XCircle className="inline-block text-red-500" />
									) : order.invoice?.pdf ? (
										<Button
											variant="ghost"
											onClick={() => order.invoice && handlePdfOpen(order.invoice.pdf)}
										>
											<File className="h-5 w-5" />
										</Button>
									) : (
										<Button variant="ghost">
											<Hourglass className="h-5 w-5 text-yellow-500" />
										</Button>
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
							</tr>
						))}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
};
