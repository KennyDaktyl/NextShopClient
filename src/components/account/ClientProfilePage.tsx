"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BasicInfoForm } from "@/components/account/BasicInfoForm";
import { InvoiceForm } from "@/components/account/InvoiceForm";
import { OrdersTable } from "@/components/account/OrdersTable";
import { UserData } from "@/app/types";
import { AddressForm } from "@/components/account/AddressFrom";
import {
	addressUserDataSchema,
	basicUserDataSchema,
	ChangePasswordSchema,
	invoiceUserDataSchema,
} from "@/app/(protected)/moje-konto/schemas";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";

interface ClientProfilePageProps {
	user: UserData;
}

export default function ClientProfilePage({ user }: ClientProfilePageProps) {
	// Formularz do danych podstawowych
	const basicUserDataFormMethods = useForm({
		resolver: zodResolver(basicUserDataSchema),
		defaultValues: {
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			mobile: user.profile.mobile || "",
		},
	});

	// Formularz do adresu
	const addressUserDataFormMethods = useForm({
		resolver: zodResolver(addressUserDataSchema),
		defaultValues: {
			street: user.profile.street || "",
			house_number: user.profile.house_number || "",
			local_number: user.profile.local_number || "",
			postal_code: user.profile.postal_code || "",
			city: user.profile.city || "",
		},
	});

	// Formularz do faktury
	const invoiceUserDataFormMethods = useForm({
		resolver: zodResolver(invoiceUserDataSchema),
		defaultValues: {
			company: user.profile.company || "",
			company_payer: user.profile.company_payer || "",
			nip: user.profile.nip || "",
			invoice_street: user.profile.invoice_street || "",
			invoice_house_number: user.profile.invoice_house_number || "",
			invoice_local_number: user.profile.invoice_local_number || "",
			invoice_city: user.profile.invoice_city || "",
			invoice_postal_code: user.profile.invoice_postal_code || "",
		},
	});

	const ChangePasswordFormMethods = useForm({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			password: "",
			re_password: "",
		},
	});

	return (
		<div className="w-full">
			<Tabs defaultValue="account" className="w-full">
				<TabsList className="grid w-full grid-cols-2 bg-muted p-1 xl:grid-cols-4">
					<TabsTrigger
						className="p-4 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-black"
						value="account"
					>
						Dane konta
					</TabsTrigger>
					<TabsTrigger
						className="p-4 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-black"
						value="new_password"
					>
						Zmień hasło
					</TabsTrigger>
					<TabsTrigger
						className="p-4 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-black"
						value="address"
					>
						Adres
					</TabsTrigger>
					<TabsTrigger
						className="p-4 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-black"
						value="invoice"
					>
						Faktura
					</TabsTrigger>
					<TabsTrigger
						className="p-4 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-black"
						value="orders"
					>
						Zamówienia
					</TabsTrigger>
				</TabsList>

				<TabsContent value="account">
					<FormProvider {...basicUserDataFormMethods}>
						<BasicInfoForm />
					</FormProvider>
				</TabsContent>

				<TabsContent value="new_password">
					<FormProvider {...ChangePasswordFormMethods}>
						<ChangePasswordForm />
					</FormProvider>
				</TabsContent>

				<TabsContent value="address">
					<FormProvider {...addressUserDataFormMethods}>
						<AddressForm />
					</FormProvider>
				</TabsContent>

				<TabsContent value="invoice">
					<FormProvider {...invoiceUserDataFormMethods}>
						<InvoiceForm />
					</FormProvider>
				</TabsContent>

				<TabsContent value="orders">
					<OrdersTable orders={user.orders} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
