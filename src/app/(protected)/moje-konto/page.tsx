// app/(protected)/moje-konto/page.tsx

import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getUserData() {
	try {
		const headerList = headers();
		const token = headerList.get("Authorization");

		if (!token) {
			redirect("/auth/login");
		}

		const response = await fetch(`${process.env.API_URL}/api/accounts/profile/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		if (!response.ok) {
			if (response.status === 401) {
				redirect("/auth/login");
			} else {
				throw new Error("Failed to fetch user data");
			}
		}

		return response.json();
	} catch (error) {
		console.error("Error fetching user data:", error);
		redirect("/auth/login");
	}
}

const ProfilePage = async () => {
	const user = await getUserData();

	return (
		<div className="w-full">
			<h1>User Profile</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
};

export default ProfilePage;
