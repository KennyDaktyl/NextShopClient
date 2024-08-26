import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Usługi",
	description: "Usługi description",
};

export default async function PageServices() {
	return (
		<div>
			<h1>Usługi</h1>
		</div>
	);
}
