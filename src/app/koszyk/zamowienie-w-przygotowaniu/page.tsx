"use client";

import OrderDetailsByUid from "@/components/cart/atoms/OrderDetailsByUid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderDetails } from "@/api/getOrderByUid";
import { UUID } from "crypto";
import { Order } from "@/app/types";
import { updateOrderStatusAction } from "@/app/koszyk/actions";
import { trackPurchase } from "@/utils";

export default function Page() {
	const [orderDetails, setOrderDetails] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const orderUid = searchParams.get("order_uid");

	useEffect(() => {
		if (orderUid) {
			const fetchAndUpdateOrder = async () => {
				const order = await getOrderDetails({ orderUid: orderUid as UUID });
				setOrderDetails(order);
				setLoading(false);

				if (order) {
					if (order.payment_method.bank_transfer) {
						await updateOrderStatusAction({ orderUid: orderUid, status: 4 });
					} else {
						await updateOrderStatusAction({ orderUid: orderUid, status: 8 });
					}
					const cartItems = JSON.parse(order.cart_items);
					const products = cartItems.map((item: any) => ({
						item_id: item.id,
						item_name: item.name,
						quantity: item.quantity,
						price: parseFloat(item.price),
					}));
					trackPurchase(orderUid, parseFloat(order.amount), "PLN", products);
				}
			};

			fetchAndUpdateOrder();
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
