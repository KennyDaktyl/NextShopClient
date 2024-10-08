import React from "react";
import { useFormContext } from "react-hook-form";
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
import { updateUserAddressAction } from "@/app/(protected)/moje-konto/actions";
import { toast } from "react-toastify";

export const AddressForm = ({ token }: { token: string }) => {
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
			await updateUserAddressAction({
				street: data.street,
				house_number: data.house_number,
				local_number: data.local_number,
				postal_code: data.postal_code,
				city: data.city,
				token: token,
			});

			window.scrollTo({ top: 0, behavior: "smooth" });
			console.log("Order response OK");
			toast.success("Zmieniono adres użytkownika", {
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
				<CardTitle>Adres</CardTitle>
				<CardDescription>Uzupełnij dane adresowe.</CardDescription>
			</CardHeader>
			<form
				onSubmit={handleSubmit(onHandleSubmit, (errors) => {
					console.log("Błędy walidacji:", errors);
				})}
			>
				<CardContent className="space-y-2">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col">
							<Label htmlFor="street" className="mb-1 text-sm font-semibold">
								Ulica <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="street"
								{...register("street")}
								className="rounded-lg border p-2"
							/>
							{errors.street && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.street)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="house_number" className="mb-1 text-sm font-semibold">
								Numer domu <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="house_number"
								{...register("house_number")}
								className="rounded-lg border p-2"
							/>
							{errors.house_number && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.house_number)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="postal_code" className="mb-1 text-sm font-semibold">
								Kod pocztowy <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="postal_code"
								{...register("postal_code")}
								className="rounded-lg border p-2"
							/>
							{errors.postal_code && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.postal_code)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="city" className="mb-1 text-sm font-semibold">
								Miasto <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								id="city"
								{...register("city")}
								className="rounded-lg border p-2"
							/>
							{errors.city && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.city)}</p>
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
