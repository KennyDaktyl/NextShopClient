"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeliveryMethods from "@/components/cart/atoms/DeliveryMethods";
import { DeliveryMethod, PaymentMethod } from "@/app/types";
import { formatMoney } from "@/utils";
import { Button } from "@/components/ui/button";
import RemoveCartForm from "@/components/cart/RemoveCartForm";
import { z } from "zod";
import AddressForm from "@/components/cart/atoms/AddressForm";
import BasicForm from "@/components/cart/atoms/BasicForm";
import PaymentMethods from "@/components/cart/atoms/PaymentMethods";

interface OrderFormProps {
	deliveryMethods: DeliveryMethod[];
	freeDelivery: boolean;
	paymentMethods: PaymentMethod[];
	initialTotalPrice: number;
	cartItems: any[];
}

const basicSchema = z.object({
	name: z.string().min(1, "Imię i nazwisko jest wymagane"),
	email: z.string().email("Nieprawidłowy adres e-mail"),
	mobile: z.string().min(1, "Numer telefonu jest wymagany"),
	products_price: z.string().min(1, "Cena produktów jest wymagana"),
	delivery_price: z.string().min(1, "Cena dostawy jest wymagana"),
	products: z.string().min(1, "Produkty są wymagane"),
	deliveryMethod: z.string().min(1, "Metoda dostawy jest wymagana"),
	paymentMethod: z.string().min(1, "Metoda płatności jest wymagana"),
});

const addressSchema = basicSchema.extend({
	street: z.string().min(1, "Ulica jest wymagana"),
	house: z.string().min(1, "Numer domu jest wymagany"),
	postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, "Nieprawidłowy format kodu pocztowego"),
	city: z.string().min(1, "Miasto jest wymagane"),
});

export default function OrderForm({
	deliveryMethods,
	freeDelivery,
	paymentMethods,
	initialTotalPrice,
	cartItems,
}: OrderFormProps) {
	const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>(deliveryMethods[0]);
	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
	const [finalPrice, setFinalPrice] = useState<number>(
		Number(initialTotalPrice) + Number(selectedDelivery.price),
	);
	const [paymentAdded, setPaymentAdded] = useState<boolean>(false);

	const schema =
		selectedDelivery.in_store_pickup || selectedDelivery.inpost_box ? basicSchema : addressSchema;

	const methods = useForm({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const handleDeliveryMethodChange = (method: DeliveryMethod) => {
		setSelectedDelivery(method);
		setFinalPrice(Number(initialTotalPrice) + Number(method.price));
		if (selectedPayment.payment_on_delivery && method.in_store_pickup) {
			setFinalPrice(Number(initialTotalPrice));
			setPaymentAdded(false);
		}
		if (selectedPayment.payment_on_delivery && !method.in_store_pickup) {
			setFinalPrice(Number(initialTotalPrice) + Number(selectedPayment.price));
			setPaymentAdded(true);
		}

		methods.setValue("deliveryMethod", method.id.toString());
		methods.setValue("delivery_price", method.price.toString());
	};

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		let price = finalPrice;

		if (paymentAdded) {
			price -= Number(selectedPayment.price);
		}

		if (method.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			price += Number(method.price);
			setPaymentAdded(true);
		} else {
			setPaymentAdded(false);
		}

		setSelectedPayment(method);
		setFinalPrice(price);
		methods.setValue("paymentMethod", method.id.toString());
	};

	const onHandleSubmit = async (data: any) => {
		console.log("Dane formularza:", data);
	};

	return (
		<FormProvider {...methods}>
			<div className="mb-5">
				<form className="mt-4 w-full" onSubmit={methods.handleSubmit(onHandleSubmit)}>
					<DeliveryMethods
						deliveryMethods={deliveryMethods}
						freeDelivery={freeDelivery}
						onDeliveryMethodChange={handleDeliveryMethodChange}
						setInpostBoxId={() => {}}
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
					<input type="hidden" {...methods.register("products_price")} value={initialTotalPrice} />
					<input
						type="hidden"
						{...methods.register("delivery_price")}
						value={selectedDelivery.price}
					/>
					<input
						type="hidden"
						{...methods.register("products")}
						value={JSON.stringify(cartItems)}
					/>
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
				<RemoveCartForm />
			</div>
		</FormProvider>
	);
}
