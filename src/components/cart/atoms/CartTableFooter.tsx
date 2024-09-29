"use client";

import { CartItem, DeliveryMethod, PaymentMethod } from "@/app/types";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils";

interface CartTableFooterProps {
	cartItems: CartItem[];
	freeDelivery: boolean;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
}

export const CartTableFooter = ({
	cartItems,
	freeDelivery,
	deliveryMethod,
	paymentMethod,
}: CartTableFooterProps) => {
	const [deliveryMethodPrice, setDeliveryMethodPrice] = useState(
		freeDelivery ? deliveryMethod.price_promo : deliveryMethod.price,
	);

	useEffect(() => {
		setDeliveryMethodPrice(freeDelivery ? deliveryMethod.price_promo : deliveryMethod.price);
	}, [freeDelivery, deliveryMethod]);

	let paymentMethodPrice = paymentMethod.price;
	if (deliveryMethod.in_store_pickup && paymentMethod.payment_on_delivery) {
		paymentMethodPrice = 0;
	}

	const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
	const productsTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
	const totalBrutto = productsTotal + Number(deliveryMethodPrice) + Number(paymentMethodPrice);
	const vatValue = totalBrutto - totalBrutto / 1.23;
	const totalNet = totalBrutto / 1.23;

	return (
		<div className="w-full">
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">Razem sztuk</p>
				<p className="py-2 text-center text-sm font-semibold">{totalQty}&nbsp;szt.</p>
			</div>
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">Kwota brutto za produkty w koszyku</p>
				<p className="py-2 text-center text-sm font-semibold">{formatMoney(productsTotal)}</p>
			</div>
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">Koszt dostawy ({deliveryMethod.name})</p>
				<p className="py-2 text-center text-sm font-semibold">{formatMoney(deliveryMethodPrice)}</p>
			</div>
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">Opłata za płatność ({paymentMethod.name})</p>
				<p className="py-2 text-center text-sm font-semibold">{formatMoney(paymentMethodPrice)}</p>
			</div>
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">VAT</p>
				<p className="py-2 text-center text-sm font-semibold">{formatMoney(vatValue)}</p>
			</div>
			<div className="flex w-full justify-between">
				<p className="py-2 text-left text-sm">Suma netto</p>
				<p className="py-2 text-center text-sm font-semibold">{formatMoney(totalNet)}</p>
			</div>
			<div className="flex w-full justify-between rounded-md bg-gray-100 py-4">
				<p className="text-lg font-bold text-slate-800">Do zapłaty</p>
				<p className="text-center text-lg font-bold text-slate-800">{formatMoney(totalBrutto)}</p>
			</div>
		</div>
	);
};
