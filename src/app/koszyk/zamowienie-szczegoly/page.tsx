"use client"; // Dodaj to na początku, aby komponent działał po stronie klienta

import OrderDetailsByUid from "@/components/cart/atoms/OrderDetailsByUid";
import { useSearchParams } from "next/navigation"; // To może działać tylko w Client Component
import { useEffect, useState } from "react";
import { getOrderDetails } from "@/api/getOrderByUid";
import { UUID } from "crypto";
import { Order } from "@/app/types";

export default function Page() {
	const [orderDetails, setOrderDetails] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

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

	return <OrderDetailsByUid order={orderDetails} />;
}
