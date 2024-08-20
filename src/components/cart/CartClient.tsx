"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeliveryMethods from "@/components/cart/atoms/DeliveryMethods";
import PaymentMethods from "@/components/cart/atoms/PaymentMethods";
import CartTable from "@/components/cart/atoms/CartTable";
import BasicForm from "@/components/cart/atoms/BasicForm";
import AddressForm from "@/components/cart/atoms/AddressForm";
import { DeliveryMethod, PaymentMethod, UserData } from "@/app/types";
import { formatMoney } from "@/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const basicSchema = z.object({
	name: z.string().min(1, "Imię i nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	phone: z.string().min(1, "Numer telefonu jest wymagany"),
	products_price: z.string().min(1, "Cena produktów jest wymagana"),
	delivery_price: z.string().min(1, "Cena dostawy jest wymagana"),
	payment_price: z.string().min(1, "Cena płatności jest wymagana"),
	products: z.string().min(1, "Produkty są wymagane"),
	delivery_method: z.string().min(1, "Metoda dostawy jest wymagana"),
	payment_method: z.string().min(1, "Metoda płatności jest wymagana"),
	total_price: z.string().min(1, "Cena końcowa jest wymagana"),
});

const addressSchema = basicSchema.extend({
	street: z.string().min(1, "Ulica jest wymagana"),
	house: z.string().min(1, "Numer domu jest wymagany"),
	postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
	city: z.string().min(1, "Miasto jest wymagane"),
});

interface CartClientProps {
	cartItems: any[];
	totalPrice: number;
	deliveryMethods: DeliveryMethod[];
	paymentMethods: PaymentMethod[];
	userData?: UserData;
}

export default function CartClient({
	cartItems,
	totalPrice: initialTotalPrice,
	deliveryMethods,
	paymentMethods,
	userData,
}: CartClientProps) {
	const [finalPrice, setFinalPrice] = useState<number>(initialTotalPrice);
	const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>(deliveryMethods[0]);
	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
	const [currentCartItems, setCurrentCartItems] = useState(cartItems);

	const schema = useMemo(() => {
		return selectedDelivery.in_store_pickup || selectedDelivery.inpost_box
			? basicSchema
			: addressSchema;
	}, [selectedDelivery]);

	const methods = useForm({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			...userData,
			name: userData ? `${userData.first_name} ${userData.last_name}` : "",
			products_price: initialTotalPrice.toString(),
			delivery_price: selectedDelivery.price.toString(),
			payment_price: selectedPayment.price.toString(),
			products: JSON.stringify(cartItems),
			delivery_method: selectedDelivery.id.toString(),
			payment_method: selectedPayment.id.toString(),
			total_price: finalPrice.toString(),
		},
	});
	useEffect(() => {
		if (userData) {
			methods.reset({
				...userData,
				name: userData ? `${userData.first_name} ${userData.last_name}` : "",
				products_price: Number(initialTotalPrice).toFixed(2).toString(),
				delivery_price: Number(selectedDelivery.price).toFixed(2).toString(),
				payment_price: Number(selectedPayment.price).toFixed(2).toString(),
				products: JSON.stringify(currentCartItems),
				delivery_method: selectedDelivery.id.toString(),
				payment_method: selectedPayment.id.toString(),
				total_price: Number(finalPrice).toFixed(2).toString(),
			});
		}
	}, [userData, methods, finalPrice, selectedDelivery, currentCartItems, selectedPayment]);

	useEffect(() => {
		let newPrice = initialTotalPrice + Number(selectedDelivery.price);

		if (selectedPayment.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			newPrice += Number(selectedPayment.price);
		}

		setFinalPrice(newPrice);

		methods.setValue("products_price", Number(newPrice).toFixed(2).toString());
		methods.setValue("delivery_price", Number(selectedDelivery.price).toFixed(2).toString());
		methods.setValue("payment_price", Number(selectedPayment.price).toFixed(2).toString());
		methods.setValue("products", JSON.stringify(currentCartItems));
		methods.setValue("total_price", newPrice.toFixed(2).toString());
	}, [initialTotalPrice, selectedDelivery, selectedPayment, currentCartItems]);

	const handleDeliveryMethodChange = (method: DeliveryMethod) => {
		setSelectedDelivery(method);
		methods.setValue("delivery_method", method.id.toString());
		methods.setValue("delivery_price", Number(method.price).toFixed(2).toString());
		methods.setValue("total_price", Number(selectedPayment.price).toFixed(2).toString());
	};

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setSelectedPayment(method);
		methods.setValue("payment_method", method.id.toString());
		methods.setValue("payment_price", Number(method.price).toFixed(2).toString());
	};

	const handleUpdateCartItems = (newCartItems: any[]) => {
		setCurrentCartItems(newCartItems);
	};

	const onHandleSubmit = async (data: any) => {
		console.log("Dane formularza:", data);
	};

	if (currentCartItems.length === 0) {
		return (
			<div className="mt-4 w-full text-center">
				<p className="text-lg font-semibold">Brak produktów w koszyku</p>
			</div>
		);
	}

	return (
		<FormProvider {...methods}>
			<div className="mb-5">
				<div className="mt-4 w-full">
					<CartTable
						cartItems={currentCartItems}
						onUpdateCartItems={handleUpdateCartItems}
						deliveryMethod={selectedDelivery}
						paymentMethod={selectedPayment}
					/>
					<form onSubmit={methods.handleSubmit(onHandleSubmit)}>
						<DeliveryMethods
							deliveryMethods={deliveryMethods}
							onDeliveryMethodChange={handleDeliveryMethodChange}
						/>
						<PaymentMethods
							paymentMethods={paymentMethods}
							onPaymentMethodChange={handlePaymentMethodChange}
						/>

						{selectedDelivery.in_store_pickup || selectedDelivery.inpost_box ? (
							<BasicForm />
						) : (
							<AddressForm />
						)}

						<div className="mt-4 w-full text-right">
							<Button
								type="submit"
								className="h-[75px] w-full rounded-lg border bg-slate-950 py-2 font-semibold text-white shadow transition-colors hover:bg-slate-800 xl:w-64"
							>
								<p className="">Złóż zamówienie</p>&nbsp;
								<p className="w-11">{formatMoney(finalPrice)}</p>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</FormProvider>
	);
}
