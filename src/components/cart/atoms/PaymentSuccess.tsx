"use client";
import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	useEffect(() => {
		if (orderUid) {
			updateOrderStatusAction({ orderUid: orderUid, status: 3 });
		}
	}, [orderUid]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Płatność zakończona pomyślnie {orderUid}</h1>
			<p className="mt-4 text-lg">Dziękujemy za dokonanie zakupu w naszym sklepie.</p>
		</div>
	);
}
