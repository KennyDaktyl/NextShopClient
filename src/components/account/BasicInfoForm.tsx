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
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useFormContext } from "react-hook-form";

export const BasicInfoForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		return error?.message || null;
	};

	const onHandleSubmit = (data: any) => {
		console.log("Dane formularza:", data);
		try {
			window.scrollTo({ top: 0, behavior: "smooth" });

			console.log("Order response OK");
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Dane konta</CardTitle>
				<CardDescription>Możesz dokonać zmiany danych podsawowych konta.</CardDescription>
			</CardHeader>
			<form
				onSubmit={handleSubmit(onHandleSubmit, (errors) => {
					console.log("Błędy walidacji:", errors);
				})}
			>
				<CardContent className="space-y-2">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col">
							<Label htmlFor="username" className="mb-1 text-sm font-semibold">
								Login <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="username"
								{...register("username")}
								className="rounded-lg border bg-slate-100 p-2"
								readOnly
							/>
							{errors.username && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.username)}</p>
							)}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col">
							<Label htmlFor="first_name" className="mb-1 text-sm font-semibold">
								Imię <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="first_name"
								{...register("first_name")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.first_name && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.first_name)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="last_name" className="mb-1 text-sm font-semibold">
								Nazwisko <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="last_name"
								{...register("last_name")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.last_name && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.last_name)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email" className="mb-1 text-sm font-semibold">
								Adres e-mail <span className="text-red-500">*</span>
							</Label>
							<Input
								type="email"
								id="email"
								{...register("email")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.email)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="mobile" className="mb-1 text-sm font-semibold">
								Telefon <span className="text-red-500">*</span>
							</Label>
							<Input
								type="tel"
								id="mobile"
								{...register("mobile")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.mobile && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.mobile)}</p>
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
