import { LoginForm } from "@/components/auth/login-form";
import { cookies, headers } from "next/headers";

export async function generateMetadata() {
	return {
		title: `Logowanie do aplikacji`,
		description: "Logowanie do aplikacji",
	};
}

export default function Page() {
	const headersList = headers();
	let referer = headersList.get("referer") || "/";

	const refferAllowed = ["/koszyk"];

	if (!refferAllowed.includes(referer)) {
		referer = "/";
	}
	return <LoginForm reffer={referer} />;
}
