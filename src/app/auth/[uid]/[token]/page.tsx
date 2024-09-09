"use client";
import { useEffect, useState, useRef } from "react";
import { activate } from "@/app/actions/activate";
import { useRouter } from "next/navigation";

export default function Page({
	params,
}: {
	params: {
		uid: string;
		token: string;
	};
}) {
	const { uid, token } = params;
	const router = useRouter();
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const hasActivated = useRef(false);

	useEffect(() => {
		const activateAccount = async () => {
			if (hasActivated.current) return;
			hasActivated.current = true;

			const response = await activate({ uid, token });
			if (response.success) {
				setSuccess(response.success);
				setTimeout(() => {
					router.push("/auth/login");
				}, 3000);
			} else {
				setError(response.error ?? null);
				setTimeout(() => {
					router.push("/auth/login");
				}, 3000);
			}
		};

		activateAccount();
	}, [uid, token, router]);

	return (
		<div>
			{success ? (
				<h1 className="text-md mx-auto text-xl text-green-600">
					Aktywacja udana. Przekierowanie do logowania
				</h1>
			) : error ? (
				<h1 className="text-md mx-auto text-xl text-red-500">
					Token wykorzystany lub stracił ważność.
				</h1>
			) : (
				<h1 className="text-md mx-auto text-xl text-gray-950">Trwa aktywacja konta.</h1>
			)}
		</div>
	);
}
