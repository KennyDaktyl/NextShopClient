"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeliveryMethods from "@/components/cart/atoms/DeliveryMethods";
import PaymentMethods from "@/components/cart/atoms/PaymentMethods";
import CartTable from "@/components/cart/atoms/CartTable";
import BasicForm from "@/components/cart/atoms/BasicForm";
import AddressForm from "@/components/cart/atoms/AddressForm";
import { CartItem, DeliveryMethod, OrderData, PaymentMethod, UserData } from "@/app/types";
import { formatMoney } from "@/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { createOrderAction } from "@/app/koszyk/actions";

const cartItemSchema = z.object({
	id: z.number(),
	item_id: z.string(),
	name: z.string(),
	slug: z.string(),
	price: z.string().min(1, "Cena produktu jest wymagana"),
	variant: z.string().optional(),
	selected_option: z.string().optional(),
	quantity: z.number().min(1, "Ilość jest wymagana"),
	available_quantity: z.number(),
	image: z.object({
		id: z.number(),
		width: z.number(),
		height: z.number(),
		url: z.string(),
		alt: z.string().nullable().optional(),
		title: z.string().nullable().optional(),
	}),
	url: z.string(),
});

const basicSchema = z.object({
	name: z.string().min(1, "Imię i nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	phone: z.string().min(1, "Numer telefonu jest wymagany"),
	cart_items_price: z.string().min(1, "Cena produktów jest wymagana"),
	delivery_price: z.string().min(1, "Cena dostawy jest wymagana"),
	payment_price: z.string().min(1, "Cena płatności jest wymagana"),
	cart_items: z.array(cartItemSchema).min(1, "Produkty są wymagane"),
	delivery_method: z.string().min(1, "Metoda dostawy jest wymagana"),
	payment_method: z.string().min(1, "Metoda płatności jest wymagana"),
	amount: z.string().min(1, "Cena końcowa jest wymagana"),
	inpost_box_id: z.string().optional(),
});

const addressSchema = basicSchema.extend({
	street: z.string().min(1, "Ulica jest wymagana"),
	house: z.string().min(1, "Numer domu jest wymagany"),
	postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
	city: z.string().min(1, "Miasto jest wymagane"),
});

interface CartClientProps {
	cartItems: CartItem[];
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
	const [inpostBoxId, setInpostBoxId] = useState<string>("");

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
			email: userData?.email || "",
			phone: userData?.profile?.phone || "",
			cart_items_price: Number(initialTotalPrice).toFixed(2),
			delivery_price: Number(selectedDelivery.price).toFixed(2),
			payment_price: Number(selectedPayment.price).toFixed(2),
			cart_items: cartItems,
			delivery_method: selectedDelivery.id.toString(),
			payment_method: selectedPayment.id.toString(),
			amount: Number(finalPrice).toFixed(2),
			inpost_box_id: "",
		},
	});

	useEffect(() => {
		if (userData) {
			methods.reset({
				...userData,
				name: userData ? `${userData.first_name} ${userData.last_name}` : "",
				email: userData?.email || "",
				phone: userData?.profile?.phone || "",
				cart_items_price: Number(initialTotalPrice).toFixed(2),
				delivery_price: Number(selectedDelivery.price).toFixed(2),
				payment_price: Number(selectedPayment.price).toFixed(2),
				cart_items: currentCartItems,
				delivery_method: selectedDelivery.id.toString(),
				payment_method: selectedPayment.id.toString(),
				amount: Number(finalPrice).toFixed(2),
				inpost_box_id: inpostBoxId,
			});
		}
	}, [
		userData,
		methods,
		finalPrice,
		selectedDelivery,
		currentCartItems,
		selectedPayment,
		inpostBoxId,
	]);

	useEffect(() => {
		let newPrice = (Number(initialTotalPrice) + Number(selectedDelivery.price)).toFixed(2);

		if (selectedPayment.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			newPrice += Number(selectedPayment.price);
			newPrice = Number(newPrice).toFixed(2);
		}

		setFinalPrice(Number(newPrice));

		methods.setValue("cart_items_price", Number(newPrice).toFixed(2));
		methods.setValue("delivery_price", Number(selectedDelivery.price).toFixed(2));
		methods.setValue("payment_price", Number(selectedPayment.price).toFixed(2));
		methods.setValue("cart_items", currentCartItems);
		methods.setValue("amount", Number(newPrice).toFixed(2));
	}, [initialTotalPrice, selectedDelivery, selectedPayment, currentCartItems]);

	const handleDeliveryMethodChange = (method: DeliveryMethod) => {
		setSelectedDelivery(method);
		methods.setValue("delivery_method", method.id.toString());
		methods.setValue("delivery_price", Number(method.price).toFixed(2));
		methods.setValue("amount", Number(finalPrice).toFixed(2));

		if (!method.inpost_box) {
			setInpostBoxId("");
			methods.setValue("inpost_box_id", "");
		}
	};

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setSelectedPayment(method);
		methods.setValue("payment_method", method.id.toString());
		methods.setValue("payment_price", Number(method.price).toFixed(2));
	};

	const handleUpdateCartItems = (newCartItems: CartItem[]) => {
		setCurrentCartItems(newCartItems);
	};

	const onHandleSubmit = async (data: OrderData) => {
		console.log("Dane formularza:", data);
		try {
			const response = await createOrderAction({
				data,
			});

			console.log("Order response:", response);
		} catch (error) {
			console.error("Error creating order:", error);
		}
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
							setInpostBoxId={setInpostBoxId}
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
