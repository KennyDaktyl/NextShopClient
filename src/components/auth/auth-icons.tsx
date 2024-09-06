"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthIcons() {
	const { data: session, status } = useSession();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsAuthenticated(!!session);
	}, [session]);

	const handleLogout = async () => {
		await signOut({ redirect: false });
		setIsAuthenticated(false);
		router.push("/");
	};

	return (
		<div className="flex w-20 items-center justify-end">
			{isAuthenticated ? (
				<>
					<Link href="/moje-konto">
						<button
							className="text-dark flex h-10 w-10 items-center justify-center rounded-full p-1"
							aria-label="Przejdź do mojego konta"
						>
							<UserRound size={24} className="hover:text-gray-500" />
						</button>
					</Link>
					<button
						className="text-dark flex h-10 w-10 items-center justify-center rounded-full"
						onClick={handleLogout}
						aria-label="Wyloguj się"
					>
						<LogOut size={24} className="hover:text-gray-500" />
					</button>
				</>
			) : (
				<Link href="/auth/login">
					<button
						className="text-dark flex items-center justify-center rounded-full"
						aria-label="Zaloguj się"
					>
						<LogIn size={24} className="hover:text-gray-500" />
					</button>
				</Link>
			)}
		</div>
	);
}
