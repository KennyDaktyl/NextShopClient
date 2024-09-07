import { LoginForm } from "@/components/auth/login-form";
import { headers } from "next/headers";

export async function generateMetadata() {
	return {
		title: `Przypomnij hasło`,
		description: "Przypomnij hasło",
	};
}

export default function Page() {
	const headersList = headers();
	const referer = headersList.get("referer") || "/";

	return <LoginForm reffer={referer} />;
}
