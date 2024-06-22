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
		<div className="flex items-center justify-end">
			{isAuthenticated ? (
				<>
					<Link href="/moje-konto">
						<button className="text-dark mr-2 flex h-10 w-10 items-center justify-center rounded-full">
							<UserRound size={24} />
						</button>
					</Link>
					<button
						className="text-dark mr-2 flex h-10 w-10 items-center justify-center rounded-full"
						onClick={handleLogout}
					>
						<LogOut size={24} />
					</button>
				</>
			) : (
				<Link href="/auth/login">
					<button className="text-dark mr-2 flex h-10 w-10 items-center justify-center rounded-full">
						<LogIn size={24} />
					</button>
				</Link>
			)}
		</div>
	);
}
