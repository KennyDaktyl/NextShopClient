import { updateUserInvoiceDataAction } from "@/app/(protected)/moje-konto/actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export const InvoiceForm = ({ token }: { token: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		if (error?.message) {
			return error.message;
		}
		return null;
	};

	const onHandleSubmit = async (data: any) => {
		try {
			await updateUserInvoiceDataAction({
				company: data.company,
				company_payer: data.company_payer,
				nip: data.nip,
				invoice_street: data.invoice_street,
				invoice_house_number: data.invoice_house_number,
				invoice_local_number: data.invoice_local_number,
				invoice_postal_code: data.invoice_postal_code,
				invoice_city: data.invoice_city,
				token: token,
			});

			window.scrollTo({ top: 0, behavior: "smooth" });
			console.log("Order response OK");
			toast.success("Zmieniono dane do faktury", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Dane do faktury</CardTitle>
				<CardDescription>Uzupełnij dane do faktury.</CardDescription>
			</CardHeader>
			<form
				onSubmit={handleSubmit(onHandleSubmit, (errors) => {
					console.log("Błędy walidacji:", errors);
				})}
			>
				<CardContent className="space-y-2">
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
								required
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
								required
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
								required
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
									required
								/>
								{errors.invoice_house_number && (
									<p className="text-sm text-red-500">
										{getErrorMessage(errors.invoice_house_number)}
									</p>
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
									<p className="text-sm text-red-500">
										{getErrorMessage(errors.invoice_local_number)}
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="invoice_city" className="mb-1 text-sm font-semibold">
								Miasto <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="invoice_city"
								{...register("invoice_city")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.invoice_city && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.invoice_city)}</p>
							)}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col">
								<Label htmlFor="invoice_postal_code" className="mb-1 text-sm font-semibold">
									Kod pocztowy <span className="text-red-500">*</span>
								</Label>
								<Input
									type="text"
									id="invoice_postal_code"
									{...register("invoice_postal_code")}
									className="rounded-lg border p-2"
									required
								/>
								{errors.invoice_postal_code && (
									<p className="text-sm text-red-500">
										{getErrorMessage(errors.invoice_postal_code)}
									</p>
								)}
							</div>
							<div className="flex flex-col"></div>
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
				</CardContent>
				<CardFooter>
					<Button type="submit">Zapisz zmiany</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
