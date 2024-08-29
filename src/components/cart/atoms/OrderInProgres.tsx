"use client";

import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderInProgresPage() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get("order_id");

	useEffect(() => {
		if (orderId) {
			const orderIdNumber = parseInt(orderId, 10);
			if (!isNaN(orderIdNumber)) {
				updateOrderStatusAction({ orderId: orderIdNumber, status: 8 });
			}
		}
	}, [orderId]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Zamówienie w przygotowaniu {orderId}</h1>
		</div>
	);
}
