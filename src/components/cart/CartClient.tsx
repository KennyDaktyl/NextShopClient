"use client";
import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PaymentMethods from "@/components/cart/atoms/PaymentMethods";
import CartTable from "@/components/cart/atoms/CartTable";
import BasicForm from "@/components/cart/atoms/BasicForm";
import AddressForm from "@/components/cart/atoms/AddressForm";
import { CartClientProps, CartItem, DeliveryMethod, OrderData, PaymentMethod } from "@/app/types";
import { formatMoney } from "@/utils";
import { Button } from "@/components/ui/button";
import { createOrderAction } from "@/app/koszyk/actions";
import { addressSchema, basicSchema, invoiceSchema } from "@/app/koszyk/schemas";
import InfoForm from "@/components/cart/atoms/InfoForm";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import InvoiceDataForm from "@/components/cart/atoms/InvoiceDataForm";
import DeliveryMethods from "@/components/cart/atoms/DeliveryMethods";
import { ActiveLink } from "@/components/ui/atoms/ActiveLink";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "react-toastify";

export default function CartClient({
	cartItems,
	freeDelivery,
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
	const [showInvoiceForm, setShowInvoiceForm] = useState<boolean>(
		userData?.profile?.make_invoice || false,
	);

	// Przeliczanie finalPrice przy pierwszym załadowaniu strony
	useEffect(() => {
		let initialDeliveryPrice = 0;

		if (!freeDelivery) {
			initialDeliveryPrice = deliveryMethods[0]?.price || 0;
		} else {
			initialDeliveryPrice = deliveryMethods[0]?.price_promo || 0;
		}

		const initialPaymentPrice = paymentMethods[0]?.price || 0;

		let newPrice = Number(initialTotalPrice) + Number(initialDeliveryPrice);

		if (paymentMethods[0].payment_on_delivery && !deliveryMethods[0].in_store_pickup) {
			newPrice += Number(initialPaymentPrice);
		}

		setFinalPrice(newPrice);
		methods.setValue("amount", newPrice.toFixed(2));
	}, [initialTotalPrice, deliveryMethods, paymentMethods, freeDelivery, currentCartItems]);

	// Dynamiczny schemat walidacji
	const schema = useMemo(() => {
		if (showInvoiceForm) {
			return selectedDelivery.in_store_pickup || selectedDelivery.inpost_box
				? invoiceSchema
				: invoiceSchema.extend(addressSchema.shape);
		}
		return selectedDelivery.in_store_pickup || selectedDelivery.inpost_box
			? basicSchema
			: addressSchema;
	}, [selectedDelivery, showInvoiceForm]);

	const methods = useForm({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			...userData,
			name: userData ? `${userData.first_name} ${userData.last_name}` : "",
			email: userData?.email || "",
			mobile: userData?.profile?.mobile || "",

			street: userData?.profile?.street || "",
			house_number: userData?.profile?.house_number || "",
			local_number: userData?.profile?.local_number || "",
			postal_code: userData?.profile?.postal_code || "",
			city: userData?.profile?.city || "",

			cart_items_price: Number(initialTotalPrice).toFixed(2),
			delivery_price: freeDelivery
				? Number(selectedDelivery.price_promo).toFixed(2)
				: Number(selectedDelivery.price).toFixed(2),
			payment_price: selectedDelivery.in_store_pickup
				? "0.00"
				: Number(selectedPayment.price).toFixed(2),
			cart_items: cartItems,
			delivery_method: selectedDelivery.id.toString(),
			payment_method: selectedPayment.id.toString(),
			amount: Number(finalPrice).toFixed(2),
			inpost_box_id: "",
			info: "",
			make_invoice: userData?.profile?.make_invoice || false,
			company: userData?.profile?.company || "",
			company_payer: userData?.profile?.company_payer || "",
			nip: userData?.profile?.nip || "",
			invoice_street: userData?.profile?.invoice_street || "",
			invoice_house_number: userData?.profile?.invoice_house_number || "",
			invoice_local_number: userData?.profile?.invoice_local_number || "",
			invoice_city: userData?.profile?.invoice_city || "",
			invoice_postal_code: userData?.profile?.invoice_postal_code || "",
		},
	});

	// Ustawienia metod i danych użytkownika
	useEffect(() => {
		if (userData) {
			methods.reset({
				...userData,
				name: userData ? `${userData.first_name} ${userData.last_name}` : "",
				email: userData?.email || "",
				mobile: userData?.profile?.mobile || "",

				street: userData?.profile?.street || "",
				house_number: userData?.profile?.house_number || "",
				local_number: userData?.profile?.local_number || "",
				postal_code: userData?.profile?.postal_code || "",
				city: userData?.profile?.city || "",

				cart_items_price: Number(initialTotalPrice).toFixed(2),
				delivery_price: freeDelivery
					? Number(selectedDelivery.price_promo).toFixed(2)
					: Number(selectedDelivery.price).toFixed(2),
				payment_price: selectedDelivery.in_store_pickup
					? "0.00"
					: Number(selectedPayment.price).toFixed(2),
				cart_items: currentCartItems,
				delivery_method: selectedDelivery.id.toString(),
				payment_method: selectedPayment.id.toString(),
				amount: Number(finalPrice).toFixed(2),
				inpost_box_id: inpostBoxId,
				info: info,

				make_invoice: userData?.profile?.make_invoice || false,
				company: userData?.profile?.company || "",
				company_payer: userData?.profile?.company_payer || "",
				nip: userData?.profile?.nip || "",
				invoice_street: userData?.profile?.invoice_street || "",
				invoice_house_number: userData?.profile?.invoice_house_number || "",
				invoice_local_number: userData?.profile?.invoice_local_number || "",
				invoice_city: userData?.profile?.invoice_city || "",
				invoice_postal_code: userData?.profile?.invoice_postal_code || "",
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
		freeDelivery,
	]);

	// Obsługa zmiany metody dostawy
	const handleDeliveryMethodChange = (method: DeliveryMethod) => {
		setSelectedDelivery(method);
		methods.setValue("delivery_method", method.id.toString());

		if (!freeDelivery) {
			methods.setValue("delivery_price", Number(method.price).toFixed(2));
		} else {
			methods.setValue("delivery_price", Number(method.price_promo).toFixed(2));
		}

		// Oblicz nową cenę końcową uwzględniającą koszty przesyłki
		let newPrice = Number(initialTotalPrice);
		if (!freeDelivery) {
			newPrice += Number(method.price);
		} else {
			newPrice += Number(method.price_promo);
		}

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

	// Obsługa zmiany metody płatności
	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setSelectedPayment(method);
		methods.setValue("payment_method", method.id.toString());
		methods.setValue("payment_price", Number(method.price).toFixed(2));

		// Oblicz nową cenę końcową uwzględniającą koszty płatności
		let deliveryPrice = freeDelivery ? selectedDelivery.price_promo : selectedDelivery.price;
		let newPrice = Number(initialTotalPrice) + Number(deliveryPrice);

		if (method.payment_on_delivery && !selectedDelivery.in_store_pickup) {
			newPrice += Number(method.price);
		}

		setFinalPrice(newPrice);
		methods.setValue("amount", newPrice.toFixed(2));
	};

	// Obsługa aktualizacji produktów w koszyku
	const handleUpdateCartItems = (newCartItems: CartItem[]) => {
		setCurrentCartItems(newCartItems);
	};

	// Obsługa złożenia zamówienia
	const onHandleSubmit = async (data: OrderData) => {
		try {
			window.scrollTo({ top: 0, behavior: "smooth" });
			toast.success("Zamówienie złożone pomyślnie!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			await createOrderAction({
				data,
				accessToken,
				paymentMethodOnline: selectedPayment.payment_online,
				freeDelivery,
			});

			console.log("Order response OK");
		} catch (error) {
			toast.error("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
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
						freeDelivery={freeDelivery}
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
							freeDelivery={freeDelivery}
							onDeliveryMethodChange={handleDeliveryMethodChange}
							setInpostBoxId={setInpostBoxId}
						/>
						<PaymentMethods
							paymentMethods={paymentMethods}
							onPaymentMethodChange={handlePaymentMethodChange}
						/>
						{!userData && (
							<ActiveLink
								role="link"
								aria-label="Zaloguj się"
								href="auth/login"
								className="text-sm font-semibold text-slate-950 underline"
							>
								<Button className="mt-4 w-full rounded-lg border bg-slate-950 py-2 font-semibold text-white shadow transition-colors hover:bg-slate-800 xl:w-64">
									Posiadasz konto? Zaloguj się
								</Button>
							</ActiveLink>
						)}
						{selectedDelivery.in_store_pickup || selectedDelivery.inpost_box ? (
							<BasicForm />
						) : (
							<AddressForm />
						)}

						<div className="mt-6 flex items-center">
							<Label htmlFor="make_invoice" className="mb-1 text-sm font-semibold">
								Potrzebujesz faktury?
							</Label>
							<Switch
								id="make_invoice"
								{...methods.register("make_invoice")}
								checked={showInvoiceForm}
								onCheckedChange={(checked) => {
									setShowInvoiceForm(checked);
									methods.setValue("make_invoice", checked);
								}}
								className="ml-2"
							/>
						</div>

						{showInvoiceForm && <InvoiceDataForm userData={userData} />}

						<InfoForm value={info} onChange={(e) => setInfo(e.target.value)} />
						<div className="mb-5 mt-5 flex h-4 w-full items-center justify-start">
							<Checkbox id="terms" required />
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="terms"
									className="ml-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Akceptuję{" "}
									<Link className="text-blue-500" href="/regulamin">
										Regulamin
									</Link>
								</label>
							</div>
						</div>
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
