"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/app/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/atoms/form-error";
import { FormSuccess } from "@/components/ui/atoms/form-success";
import { useState, useTransition } from "react";
import { CardWrapperRegister } from "@/components/auth/card-wrapper-register";
import axios from "axios";
import { useRouter } from "next/navigation";

export const ChangePasswordForm = ({ uid, token }: { uid: string; token: string }) => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof ChangePasswordSchema>>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			uid: uid,
			token: token,
			new_password: "",
			re_new_password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			const validatedFields = ChangePasswordSchema.safeParse(values);
			if (validatedFields.success) {
				const url = `${process.env.API_URL}/auth/users/reset_password_confirm/`;
				try {
					const response = await axios.post(url, validatedFields.data);
					setSuccess("Hasło zmienione pomyślnie! Przekierowywanie...");
					form.reset();
					setTimeout(() => {
						router.push("/auth/login");
					}, 3000);
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						const { data, status } = error.response;

						if (status === 400) {
							if (data?.new_password) {
								setError(`Błąd w haśle: ${data.new_password.join(" ")}`);
							} else if (data?.re_new_password) {
								setError(`Błąd w powtórzeniu hasła: ${data.re_new_password.join(" ")}`);
							} else {
								setError("Hasło zbyt łatwe lub nie spełnia wymagań.");
							}
						} else {
							setError("Wystąpił nieznany błąd.");
						}
					} else {
						setError("Coś poszło nie tak! Spróbuj ponownie później.");
					}
				}
			} else {
				setError("Dane nie walidują się!");
			}
		});
	};

	return (
		<CardWrapperRegister
			headerLabel="Zmiana hasła"
			backButtonLabel="Powrót do logowania"
			backButtonHref="/auth/login"
			showSocials={true}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="new_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hasło</FormLabel>
									<FormControl>
										<Input {...field} placeholder="*****" type="password" disabled={isPending} />
									</FormControl>
									{/* Ręcznie wyświetlany komunikat o błędzie */}
									{form.formState.errors.new_password && (
										<p className="text-sm text-red-500">
											{form.formState.errors.new_password?.message}
										</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="re_new_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Powtórz hasło</FormLabel>
									<FormControl>
										<Input {...field} placeholder="*****" type="password" disabled={isPending} />
									</FormControl>
									{/* Ręcznie wyświetlany komunikat o błędzie */}
									{form.formState.errors.re_new_password && (
										<p className="text-sm text-red-500">
											{form.formState.errors.re_new_password?.message}
										</p>
									)}
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />

					<Button type="submit" className="w-full" variant="default" disabled={isPending}>
						Zmień hasło
					</Button>
				</form>
			</Form>
		</CardWrapperRegister>
	);
};
