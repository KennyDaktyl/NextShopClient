import { ChangePasswordForm } from "@/components/auth/change-password";

export async function generateMetadata() {
	return {
		title: `Przypomnij hasło`,
		description: "Przypomnij hasło",
	};
}

export default function Page({
	params,
}: {
	params: {
		uid: string;
		token: string;
	};
}) {
	return <ChangePasswordForm uid={params.uid} token={params.token} />;
}
