import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata() {
	return {
		title: `Przypomnij hasło`,
		description: "Przypomnij hasło",
	};
}

export default function Page() {
	return <LoginForm />;
}
