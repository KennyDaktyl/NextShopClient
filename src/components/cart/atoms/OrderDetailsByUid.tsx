"use client";

import { useSearchParams } from "next/navigation";

export default function OrderDetailsByUidPage() {
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Zamówienie szczegóły {orderUid}</h1>
		</div>
	);
}
