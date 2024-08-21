import { RegisterForm } from "@/components/auth/register-form";

export async function generateMetadata() {
	return {
		title: `Rejestrowanie nowego konta`,
		description: "Rejestrowanie nowego konta",
	};
}

export default function Page() {
	return <RegisterForm />;
}
