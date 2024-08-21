import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata() {
	return {
		title: `Logowanie do aplikacji`,
		description: "Logowanie do aplikacji",
	};
}

export default function Page() {
	return <LoginForm />;
}
