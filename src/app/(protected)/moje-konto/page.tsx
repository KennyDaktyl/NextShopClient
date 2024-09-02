// ProfilePage.tsx (Server Component)
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserFullData } from "@/api/getUserData";
import { Session } from "next-auth";
import ClientProfilePage from "@/components/account/ClientProfilePage";

export async function generateMetadata() {
	return {
		title: `Konto użytkownika`,
		description: "Konto użytkownika",
	};
}

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

	const response = await getUserFullData(accessToken);

	if (response.status === 401) {
		console.log("redirecting to login");
		redirect("/auth/login");
		return null;
	}

	if (response.status === 200) {
		const user = response.data;
		return <ClientProfilePage user={user} token={accessToken} />;
	}

	console.error("Error fetching user data");
	return <div>Profile not found</div>;
}
