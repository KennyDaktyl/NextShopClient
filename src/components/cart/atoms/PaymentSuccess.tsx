"use client";
import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get("order_id");

	useEffect(() => {
		if (orderId) {
			const orderIdNumber = parseInt(orderId, 10);
			if (!isNaN(orderIdNumber)) {
				updateOrderStatusAction({ orderId: orderIdNumber, status: 3 });
			}
		}
	}, [orderId]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Płatność zakończona pomyślnie {orderId}</h1>
			<p className="mt-4 text-lg">Dziękujemy za dokonanie zakupu w naszym sklepie.</p>
		</div>
	);
}
