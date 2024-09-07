"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/app/schemas";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const LoginForm = ({ reffer }: { reffer: string }) => {
	const router = useRouter();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			const validatedFields = LoginSchema.safeParse(values);
			if (validatedFields.success) {
				const url = `${process.env.API_URL}/auth/jwt/create/`;
				try {
					const response = await axios.post(url, validatedFields.data);
					if (response.status === 200) {
						await signIn("credentials", {
							username: validatedFields.data.username,
							password: validatedFields.data.password,
							token: response.data.access,
							redirect: false,
						});
						setSuccess("Login successful!");
					}
					setSuccess("Login successful!");
					router.push(reffer);
					form.reset();
				} catch (error) {
					setError("Niepoprawny login lub hasło !");
				}
			} else {
				setError("Dane nie walidują się!");
			}
		});
	};

	return (
		<CardWrapper
			headerLabel="Witaj spowrotem"
			backButtonLabel="Nie masz konta?"
			backButtonHref="/auth/register"
			forgotButtonLabel="Przywróć hasło"
			forgotButtonHref="/auth/forgot-password"
			showSocials={true}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="username"
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hasło</FormLabel>
									<FormControl>
										<Input {...field} placeholder="*****" type="password" disabled={isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" variant="default" disabled={isPending}>
						Zaloguj
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
