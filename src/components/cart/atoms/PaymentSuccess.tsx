"use client"; // Dodaj to na początku, aby komponent działał po stronie klienta

import OrderDetailsByUid from "@/components/cart/atoms/OrderDetailsByUid";
import { useSearchParams } from "next/navigation"; // To może działać tylko w Client Component
import { useEffect, useState } from "react";
import { getOrderDetails } from "@/api/getOrderByUid";
import { UUID } from "crypto";
import { Order } from "@/app/types";
import { updateOrderStatusAction } from "@/app/koszyk/actions";

export default function Page() {
	const [orderDetails, setOrderDetails] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	useEffect(() => {
		if (orderUid) {
			updateOrderStatusAction({ orderUid: orderUid, status: 3 });
		}
	}, [orderUid]);

	useEffect(() => {
		if (orderUid) {
			const fetchOrder = async () => {
				const order = await getOrderDetails({ orderUid: orderUid as UUID });
				setOrderDetails(order);
				setLoading(false);
			};
			fetchOrder();
		}
	}, [orderUid]);

	if (loading) {
		return <div>Ładowanie...</div>;
	}

	if (!orderDetails) {
		return <div>Nie znaleziono zamówienia.</div>;
	}

	return (
		<div className="flex h-full w-full flex-wrap items-center justify-start">
			<h1 className="w-full text-center text-3xl font-bold">Płatność zakończona pomyślnie</h1>
			<p className="mb-5 mt-4 w-full text-center text-lg">
				Dziękujemy za dokonanie zakupu w naszym sklepie.
			</p>
			<OrderDetailsByUid order={orderDetails} />
		</div>
	);
}
