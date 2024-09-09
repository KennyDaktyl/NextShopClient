"use client";
import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentFailed() {
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	useEffect(() => {
		if (orderUid) {
			updateOrderStatusAction({ orderUid: orderUid, status: 2 });
		}
	}, [orderUid]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Płatność anulowana {orderUid}</h1>
		</div>
	);
}
