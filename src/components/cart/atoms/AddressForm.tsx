"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		if (error?.message) {
			return error.message;
		}
		return null;
	};

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-lg font-semibold">Dane kupującego</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex flex-col">
					<Label htmlFor="name" className="mb-1 text-sm font-semibold">
						Imię i nazwisko <span className="text-red-500">*</span>
					</Label>
					<Input type="text" id="name" {...register("name")} className="rounded-lg border p-2" />
					{errors.name && <p className="text-sm text-red-500">{getErrorMessage(errors.name)}</p>}
				</div>
				<div className="flex flex-col">
					<Label htmlFor="email" className="mb-1 text-sm font-semibold">
						Adres e-mail <span className="text-red-500">*</span>
					</Label>
					<Input type="email" id="email" {...register("email")} className="rounded-lg border p-2" />
					{errors.email && <p className="text-sm text-red-500">{getErrorMessage(errors.email)}</p>}
				</div>
				<div className="flex flex-col">
					<Label htmlFor="phone" className="mb-1 text-sm font-semibold">
						Telefon <span className="text-red-500">*</span>
					</Label>
					<Input type="tel" id="phone" {...register("phone")} className="rounded-lg border p-2" />
					{errors.phone && <p className="text-sm text-red-500">{getErrorMessage(errors.phone)}</p>}
				</div>

				{/* Poniżej są pola adresowe */}
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

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<Label htmlFor="house" className="mb-1 text-sm font-semibold">
							Nr domu <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="house"
							{...register("house")}
							className="rounded-lg border p-2"
						/>
						{errors.house && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.house)}</p>
						)}
					</div>

					<div className="flex flex-col">
						<Label htmlFor="door" className="mb-1 text-sm font-semibold">
							Nr lokalu
						</Label>
						<Input type="text" id="door" {...register("door")} className="rounded-lg border p-2" />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<Label htmlFor="city" className="mb-1 text-sm font-semibold">
							Miasto <span className="text-red-500">*</span>
						</Label>
						<Input type="text" id="city" {...register("city")} className="rounded-lg border p-2" />
						{errors.city && <p className="text-sm text-red-500">{getErrorMessage(errors.city)}</p>}
					</div>

					<div className="flex flex-col">
						<Label htmlFor="postalCode" className="mb-1 text-sm font-semibold">
							Kod pocztowy <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="postalCode"
							{...register("postalCode")}
							className="rounded-lg border p-2"
						/>
						{errors.postalCode && (
							<p className="text-sm text-red-500">{getErrorMessage(errors.postalCode)}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
