"use client";

import OrderDetailsByUid from "@/components/cart/atoms/OrderDetailsByUid";
import { useSearchParams } from "next/navigation";
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
			updateOrderStatusAction({ orderUid: orderUid, status: 8 });
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

	return <OrderDetailsByUid order={orderDetails} />;
}
