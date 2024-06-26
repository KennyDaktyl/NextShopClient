// src/app/(protected)/moje-konto/page.tsx

import { getUserData } from "./actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ProfilePage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/login");
	}

	try {
		const response = await getUserData(session.user.accessToken ?? "");
		if (response.status === 200) {
			const user = response.data;

			return (
				<div className="w-full">
					<h1>User Profile</h1>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</div>
			);
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
	}

	return <div>Profile not found</div>;
}
