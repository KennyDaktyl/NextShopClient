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
					<Label htmlFor="mobile" className="mb-1 text-sm font-semibold">
						Telefon <span className="text-red-500">*</span>
					</Label>
					<Input type="tel" id="mobile" {...register("mobile")} className="rounded-lg border p-2" />
					{errors.mobile && (
						<p className="text-sm text-red-500">{getErrorMessage(errors.mobile)}</p>
					)}
				</div>
			</div>
			<h2 className="mt-4 text-lg font-semibold">Dane do wysyłki</h2>
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

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<Label htmlFor="house_number" className="mb-1 text-sm font-semibold">
							Nr domu <span className="text-red-500">*</span>
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
						<Label htmlFor="local_number" className="mb-1 text-sm font-semibold">
							Nr lokalu
						</Label>
						<Input
							type="text"
							id="local_number"
							{...register("local_number")}
							className="rounded-lg border p-2"
						/>
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
				</div>
			</div>
		</div>
	);
}
