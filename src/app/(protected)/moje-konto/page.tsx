import { getUserData } from "./actions";

export default async function ProfilePage() {
	const response = await getUserData();

	if (response.status == 200) {
		const user = response.data;

		return (
			<div className="w-full">
				<h1>User Profile</h1>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>
		);
	}
	return <div>Profile not found</div>;
}
