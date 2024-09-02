"use client";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/app/types";
import { Textarea } from "@/components/ui/textarea";

export default function InvoiceDataForm({ userData }: { userData: UserData | undefined }) {
	const {
		register,
		formState: { errors },
		setValue,
		clearErrors,
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		if (error?.message) {
			return error.message;
		}
		return null;
	};

	const showInvoiceForm = useWatch({ name: "invoice" });

	useEffect(() => {
		if (showInvoiceForm && userData?.profile?.make_invoice) {
			// Ustawienie pól na podstawie danych użytkownika
			setValue("company", userData.profile.company || "");
			setValue("nip", userData.profile.nip || "");
			setValue("invoice_street", userData.profile.invoice_street || "");
			setValue("invoice_house_number", userData.profile.invoice_house_number || "");
			setValue("invoice_local_number", userData.profile.invoice_local_number || "");
			setValue("invoice_city", userData.profile.invoice_city || "");
			setValue("invoice_postal_code", userData.profile.invoice_postal_code || "");
		} else {
			// Czyszczenie błędów walidacji jeśli przełącznik jest wyłączony
			clearErrors([
				"company",
				"nip",
				"invoice_street",
				"invoice_house_number",
				"invoice_city",
				"invoice_postal_code",
			]);
		}
	}, [showInvoiceForm, setValue, clearErrors, userData]);

	return (
		<div className="mt-6">
			<h2 className="text-lg font-semibold">Dane do faktury</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex flex-col">
					<Label htmlFor="company" className="mb-1 text-sm font-semibold">
						Nazwa firmy <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="company"
						{...register("company")}
						className="rounded-lg border p-2"
						required={showInvoiceForm}
					/>
					{errors.company && (
						<p className="text-sm text-red-500">{getErrorMessage(errors.company)}</p>
					)}
				</div>
				<div className="flex flex-col">
					<Label htmlFor="nip" className="mb-1 text-sm font-semibold">
						NIP <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="nip"
						{...register("nip")}
						className="rounded-lg border p-2"
						required={showInvoiceForm}
					/>
					{errors.nip && <p className="text-sm text-red-500">{getErrorMessage(errors.nip)}</p>}
				</div>
				<div className="flex flex-col">
					<Label htmlFor="invoice_street" className="mb-1 text-sm font-semibold">
						Ulica <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="invoice_street"
						{...register("invoice_street")}
						className="rounded-lg border p-2"
						required={showInvoiceForm}
					/>
					{errors.invoice_street && (
						<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_street)}</p>
					)}
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<Label htmlFor="invoice_house_number" className="mb-1 text-sm font-semibold">
							Nr domu <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="invoice_house_number"
							{...register("invoice_house_number")}
							className="rounded-lg border p-2"
							required={showInvoiceForm}
						/>
						{errors.invoice_house_number && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_house_number)}</p>
						)}
					</div>

					<div className="flex flex-col">
						<Label htmlFor="invoice_local_number" className="mb-1 text-sm font-semibold">
							Nr lokalu
						</Label>
						<Input
							type="text"
							id="invoice_local_number"
							{...register("invoice_local_number")}
							className="rounded-lg border p-2"
						/>
						{errors.invoice_local_number && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_local_number)}</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<Label htmlFor="invoice_city" className="mb-1 text-sm font-semibold">
							Miasto <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="invoice_city"
							{...register("invoice_city")}
							className="rounded-lg border p-2"
							required={showInvoiceForm}
						/>
						{errors.invoice_city && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_city)}</p>
						)}
					</div>

					<div className="flex flex-col">
						<Label htmlFor="invoice_postal_code" className="mb-1 text-sm font-semibold">
							Kod pocztowy <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="invoice_postal_code"
							{...register("invoice_postal_code")}
							className="rounded-lg border p-2"
							required={showInvoiceForm}
						/>
						{errors.invoice_postal_code && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_postal_code)}</p>
						)}
					</div>
				</div>
				<div className="flex flex-col">
					<Label htmlFor="company_payer" className="mb-1 text-sm font-semibold">
						Płatnik
					</Label>
					<Textarea
						id="company_payer"
						{...register("company_payer")}
						className="rounded-lg border p-2"
					/>
					{errors.company_payer && (
						<p className="text-sm text-red-500">{getErrorMessage(errors.company_payer)}</p>
					)}
				</div>
			</div>
		</div>
	);
}
