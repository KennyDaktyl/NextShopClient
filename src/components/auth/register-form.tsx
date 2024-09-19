"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/app/schemas";
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
import { startTransition, useState, useTransition } from "react";
import { register } from "@/app/actions/register";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { CardWrapperRegister } from "@/components/auth/card-wrapper-register";

export const RegisterForm = () => {
	const router = useRouter();
	const [isPedning, setIsPending] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			password: "",
			email: "",
			re_password: "",
			terms: false,
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");

		const formData = { ...values, email: values.username };

		startTransition(() => {
			register(formData)
				.then((data) => {
					setError(data.error);
					if (data.success) {
						form.reset();
						setSuccess("Sprawdź email w celu aktywacji konta");
						setTimeout(() => {
							router.push("/auth/login");
						}, 2000);
					}
				})
				.catch((err) => {
					setError("Wystąpił błąd podczas rejestracji");
				});
		});
	};

	return (
		<CardWrapperRegister
			headerLabel="Rejestracja użytkownika"
			backButtonLabel="Powrót do logowania"
			backButtonHref="/auth/login"
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
											disabled={isPedning}
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
										<Input {...field} placeholder="*****" type="password" disabled={isPedning} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="re_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Powtórz hasło</FormLabel>
									<FormControl>
										<Input {...field} placeholder="*****" type="password" disabled={isPedning} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<div className="flex h-4 w-full items-center justify-start">
						<Checkbox id="terms" required />
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="terms"
								className="ml-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Akceptuję{" "}
								<Link className="text-blue-500" href="/regulamin">
									Regulamin
								</Link>
							</label>
						</div>
					</div>
					<Button type="submit" className="w-full" variant="default" disabled={isPedning}>
						Zarejestruj
					</Button>
				</form>
			</Form>
		</CardWrapperRegister>
	);
};
