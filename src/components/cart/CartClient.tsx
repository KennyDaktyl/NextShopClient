"use client";
import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeliveryMethods from "@/components/cart/atoms/DeliveryMethods";
import PaymentMethods from "@/components/cart/atoms/PaymentMethods";
import CartTable from "@/components/cart/atoms/CartTable";
import BasicForm from "@/components/cart/atoms/BasicForm";
import AddressForm from "@/components/cart/atoms/AddressForm";
import { CartClientProps, CartItem, DeliveryMethod, OrderData, PaymentMethod } from "@/app/types";
import { formatMoney } from "@/utils";
import { Button } from "@/components/ui/button";
import { createOrderAction } from "@/app/koszyk/actions";
import { addressSchema, basicSchema } from "@/app/koszyk/schemas";
import InfoForm from "@/components/cart/atoms/InfoForm";

export default function CartClient({
	cartItems,
	totalPrice: initialTotalPrice,
	deliveryMethods,
	paymentMethods,
	userData,
	accessToken,
}: CartClientProps) {
	const [finalPrice, setFinalPrice] = useState<number>(initialTotalPrice);
	const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>(deliveryMethods[0]);
	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
	const [currentCartItems, setCurrentCartItems] = useState(cartItems);
	const [inpostBoxId, setInpostBoxId] = useState<string>("");
	const [info, setInfo] = useState<string>("");

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
			mobile: userData?.profile?.mobile || "",
			cart_items_price: Number(initialTotalPrice).toFixed(2),
			delivery_price: Number(selectedDelivery.price).toFixed(2),
			payment_price: selectedDelivery.in_store_pickup
				? "0.00"
				: Number(selectedPayment.price).toFixed(2),
			cart_items: cartItems,
			delivery_method: selectedDelivery.id.toString(),
			payment_method: selectedPayment.id.toString(),
			amount: Number(finalPrice).toFixed(2),
			inpost_box_id: "",
			info: "",
		},
	});

	useEffect(() => {
		if (userData) {
			methods.reset({
				...userData,
				name: userData ? `${userData.first_name} ${userData.last_name}` : "",
				email: userData?.email || "",
				mobile: userData?.profile?.mobile || "",
				cart_items_price: Number(initialTotalPrice).toFixed(2),
				delivery_price: Number(selectedDelivery.price).toFixed(2),
				payment_price: selectedDelivery.in_store_pickup
					? "0.00"
					: Number(selectedPayment.price).toFixed(2),
				cart_items: currentCartItems,
				delivery_method: selectedDelivery.id.toString(),
				payment_method: selectedPayment.id.toString(),
				amount: Number(finalPrice).toFixed(2),
				inpost_box_id: inpostBoxId,
				info: info,
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
		info,
	]);

	useEffect(() => {
		let newPrice = Number(initialTotalPrice) + Number(selectedDelivery.price);

		// Dodajemy cenę płatności przy odbiorze, jeśli jest wybrana i nie jest to odbiór osobisty
		if (selectedPayment.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			newPrice += Number(selectedPayment.price);
		}

		setFinalPrice(newPrice);

		methods.setValue("cart_items_price", Number(initialTotalPrice).toFixed(2));
		methods.setValue("delivery_price", Number(selectedDelivery.price).toFixed(2));
		methods.setValue(
			"payment_price",
			selectedDelivery.in_store_pickup ? "0.00" : Number(selectedPayment.price).toFixed(2),
		);
		methods.setValue("cart_items", currentCartItems);
		methods.setValue("amount", newPrice.toFixed(2));
	}, [initialTotalPrice, selectedDelivery, selectedPayment, currentCartItems]);

	const handleDeliveryMethodChange = (method: DeliveryMethod) => {
		setSelectedDelivery(method);
		methods.setValue("delivery_method", method.id.toString());
		methods.setValue("delivery_price", Number(method.price).toFixed(2));

		let newPrice = Number(initialTotalPrice) + Number(method.price);

		if (selectedPayment.payment_on_delivery && !method.in_store_pickup) {
			newPrice += Number(selectedPayment.price);
		}

		setFinalPrice(newPrice);
		methods.setValue("amount", newPrice.toFixed(2));

		if (!method.inpost_box) {
			setInpostBoxId("");
			methods.setValue("inpost_box_id", "");
		}
	};

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setSelectedPayment(method);
		methods.setValue("payment_method", method.id.toString());

		let newPrice = Number(initialTotalPrice) + Number(selectedDelivery.price);

		if (method.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			newPrice += Number(method.price);
		}

		setFinalPrice(newPrice);
		methods.setValue("amount", newPrice.toFixed(2));
	};

	const handleUpdateCartItems = (newCartItems: CartItem[]) => {
		setCurrentCartItems(newCartItems);
	};

	const onHandleSubmit = async (data: OrderData) => {
		console.log("Dane formularza:", data);
		try {
			const response = await createOrderAction({
				data,
				accessToken,
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
					<form
						onSubmit={methods.handleSubmit(onHandleSubmit, (errors) => {
							console.log("Błędy walidacji:", errors);
						})}
					>
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

						<InfoForm value={info} onChange={(e) => setInfo(e.target.value)} />
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
