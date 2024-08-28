"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BasicForm() {
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
		<div className="mt-10">
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
		</div>
	);
}
