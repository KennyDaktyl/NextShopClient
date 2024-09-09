"use client";

import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderInProgresPage() {
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	useEffect(() => {
		if (orderUid) {
			updateOrderStatusAction({ orderUid: orderUid, status: 8 });
		}
	}, [orderUid]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Zamówienie w przygotowaniu {orderUid}</h1>
		</div>
	);
}
