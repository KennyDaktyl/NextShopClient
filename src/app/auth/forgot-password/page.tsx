import { EmailForResetPasswordSchemaForm } from "@/components/auth/send-email-fot-reset_password";
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

	return <EmailForResetPasswordSchemaForm reffer={referer} />;
}
