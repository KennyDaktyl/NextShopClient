"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { EmailSchema } from "@/app/schemas";
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
import { useRouter } from "next/navigation";
import axios from "axios";

export const EmailForResetPasswordSchemaForm = ({ reffer }: { reffer: string }) => {
	const router = useRouter();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof EmailSchema>>({
		resolver: zodResolver(EmailSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			const validatedFields = EmailSchema.safeParse(values);
			if (validatedFields.success) {
				const url = `${process.env.API_URL}/auth/users/reset_password/`;
				try {
					const response = await axios.post(url, validatedFields.data);
					setSuccess("Wysłano email do zresetowania hasła!");
					form.reset();
					setTimeout(() => {
						router.push("/auth/login");
					}, 3000);
				} catch (error) {
					setError("Niepoprawny email lub brak email w bazie !");
				}
			} else {
				setError("Dane nie walidują się!");
			}
		});
	};

	return (
		<CardWrapper
			headerLabel="Witaj masz problem z hasłem?"
			backButtonLabel="Nie masz konta?"
			backButtonHref="/auth/register"
			forgotButtonLabel="Wróć do logowania"
			forgotButtonHref="/auth/login/"
			showSocials={false}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="jan.kowalski@gmail.com"
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" variant="default" disabled={isPending}>
						Zresetuj hasło
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
