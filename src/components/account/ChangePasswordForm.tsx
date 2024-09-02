"use client";
import { updateUserPasswordAction } from "@/app/(protected)/moje-konto/actions";
import { signOut } from "next-auth/react";
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
import { toast } from "react-toastify";

export const ChangePasswordForm = ({ token }: { token: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const getErrorMessage = (error: any) => {
		return error?.message || null;
	};

	const onHandleSubmit = async (data: any) => {
		try {
			await updateUserPasswordAction({
				new_password: data.new_password,
				token: token,
			});

			window.scrollTo({ top: 0, behavior: "smooth" });
			console.log("Order response OK");
			toast.success("Zmieniono hasło użytkownika", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			await signOut({ redirect: true, callbackUrl: "/auth/login" });
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Zmień hasło</CardTitle>
				<CardDescription>Możesz dokonać zmiany hasła konta.</CardDescription>
			</CardHeader>

			<form onSubmit={handleSubmit(onHandleSubmit)}>
				<CardContent className="space-y-2">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col">
							<Label htmlFor="new_password" className="mb-1 text-sm font-semibold">
								Nowe hasło <span className="text-red-500">*</span>
							</Label>
							<Input
								type="password"
								id="new_password"
								autoComplete="new-password"
								{...register("new_password")}
								className="rounded-lg border p-2"
								required
							/>
							{errors.new_password && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.new_password)}</p>
							)}
						</div>
						<div className="flex flex-col">
							<Label htmlFor="re_new_password" className="mb-1 text-sm font-semibold">
								Powtórz hasło <span className="text-red-500">*</span>
							</Label>
							<Input
								type="password"
								id="re_new_password"
								{...register("re_new_password")}
								autoComplete="re_new-password"
								className="rounded-lg border p-2"
								required
							/>
							{errors.re_new_password && (
								<p className="text-sm text-red-500">{getErrorMessage(errors.re_new_password)}</p>
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
