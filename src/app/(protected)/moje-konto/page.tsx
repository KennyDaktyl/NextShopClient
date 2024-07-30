import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserData } from "@/api/getUserData";
import { Session } from "next-auth";

export default async function ProfilePage() {
	const session: Session | null = await auth();
	if (!session || !session.user) {
		redirect("/auth/login");
		return null;
	}

	const accessToken = session.user.accessToken;
	if (!accessToken) {
		redirect("/auth/login");
		return null;
	}

	const response = await getUserData(accessToken);

	if (response.status === 401) {
		console.log("redirecting to login");
		redirect("/auth/login");
		return null;
	}

	if (response.status === 200) {
		const user = response.data;

		return (
			<div className="w-full">
				<h1>User Profile</h1>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>
		);
	}

	console.error("Error fetching user data");
	return <div>Profile not found</div>;
}
