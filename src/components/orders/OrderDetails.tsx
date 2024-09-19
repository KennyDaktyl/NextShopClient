import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CartItem, Order } from "@/app/types"; // typ zamówienia
import { useEffect, useState } from "react";
import { formatMoney, handlePdfOpen } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle, File, Hourglass, CheckCircle } from "lucide-react";

interface OrderDetailsProps {
	order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		try {
			const parsedCartItems = JSON.parse(order.cart_items);
			setCartItems(parsedCartItems);
		} catch (error) {
			console.error("Error parsing cart items:", error);
		}
	}, [order.cart_items]);

	return (
		<Card className="mx-auto w-full p-4">
			<Badge variant={"outline"} className="mb-4 mt-4">
				<span className="text-xs">{order.status}</span>
			</Badge>
			{order.payment_method.payment_online && (
				<div className="flex items-center space-x-2">
					<p>Potwierdzenie z systemu Stripe:</p>
					{order.is_paid ? (
						<CheckCircle className="text-green-500" size={24} />
					) : (
						<XCircle className="text-red-500" size={24} />
					)}
				</div>
			)}
			<div className="space-y-4">
				<p className="text-sm text-gray-600">Lista produktów:</p>
				{cartItems.length > 0 ? (
					cartItems.map((item) => (
						<Link
							href={item.url}
							role="link"
							key={item.item_id}
							className="flex space-x-4 py-2 hover:bg-gray-100"
						>
							<Image
								src={item.image?.url || ""}
								alt={item.image?.alt || item.name}
								className="h-16 w-16 object-cover"
								width={64}
								height={64}
							/>
							<div>
								<p className="font-semibold">{item.name}</p>
								{item.variant && (
									<small className="font-xs w-full">Wariant:&nbsp;{item.variant}</small>
								)}
								{item.selected_option && (
									<small className="font-xs w-full">Opcja:&nbsp;{item.selected_option}</small>
								)}
								<p className="w-full text-sm text-gray-600">Ilość: {item.quantity}</p>
								<p className="text-sm text-gray-600">Cena: {formatMoney(Number(item.price))}</p>
							</div>
						</Link>
					))
				) : (
					<p className="text-gray-600">Brak produktów w koszyku.</p>
				)}
			</div>

			<CardFooter className="mt-4 flex flex-wrap items-center justify-start p-0">
				<p className="text-sm text-gray-600">
					<strong>Metoda płatności:</strong> {order.payment_method.name}
				</p>
				<p className="w-full text-sm text-gray-600">
					<strong>Metoda dostawy:</strong> {order.delivery_method.name}{" "}
					{order.inpost_box_id && (
						<span className="text-xs text-gray-500">{order.inpost_box_id}</span>
					)}
				</p>
				{Number(order.delivery_price) > 0 && (
					<p className="w-full text-sm text-gray-600">
						<strong>Koszt dostawy:</strong> {formatMoney(Number(order.delivery_price))}
					</p>
				)}
				{Number(order.payment_price) > 0 && (
					<p className="w-full text-sm text-gray-600">
						<strong>Koszt płatności:</strong> {formatMoney(Number(order.payment_price))}
					</p>
				)}
				<p className="w-full text-sm text-gray-600">
					<strong>Koszt za produkty:</strong> {formatMoney(Number(order.cart_items_price))}
				</p>
				{order.info && (
					<div className="flex w-full items-center">
						<strong className="text-sm text-gray-600">Informacje:</strong>
						<p className="ml-3 text-sm text-gray-600">{order.info}</p>
					</div>
				)}
				<p className="mt-2 w-full text-sm text-gray-600">
					<strong>Suma:&nbsp;{order.amount} zł</strong>
				</p>
			</CardFooter>

			{order.make_invoice === false ? (
				<div className="flex items-center">
					<p className="text-gray-600">Paragon: </p>
					<CheckCircle className="ml-4 text-green-500" size={24} />
				</div>
			) : order.invoice?.pdf ? (
				<div className="flex items-center">
					<p className="text-gray-600">Faktura do pobrania: </p>
					<Button variant="ghost" onClick={() => order.invoice && handlePdfOpen(order.invoice.pdf)}>
						<File className="h-5 w-5" />
					</Button>
				</div>
			) : (
				<div className="flex items-center">
					<p className="text-gray-600">Faktura w przygotowaniu</p>
					<Button variant="ghost">
						<Hourglass className="h-5 w-5 text-yellow-500" />
					</Button>
				</div>
			)}
		</Card>
	);
}
