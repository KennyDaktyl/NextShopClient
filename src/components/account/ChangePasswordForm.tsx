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

export const ChangePasswordForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		return error?.message || null;
	};

	const onSubmit = (data: any) => {
		console.log("Form data:", data);
		// Tutaj możesz dodać logikę wysyłania danych do API
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Zmień hasło</CardTitle>
				<CardDescription>Możesz dokonać zmiany hasła konta.</CardDescription>
			</CardHeader>

			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className="space-y-2">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col">
							<Label htmlFor="password" className="mb-1 text-sm font-semibold">
								Nowe hasło <span className="text-red-500">*</span>
							</Label>
							<Input
								type="password"
								id="password"
								autoComplete="new-password"
								{...register("password")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.password && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.password)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="new_password" className="mb-1 text-sm font-semibold">
								Powtórz hasło <span className="text-red-500">*</span>
							</Label>
							<Input
								type="password"
								id="new_password"
								{...register("re_password")}
								autoComplete="new-password"
								className="rounded-lg border p-2"
								required
							/>
							{errors.re_password && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.re_password)}</p>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit">Zapisz hasło</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
