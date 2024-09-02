import { fetchPostApiData } from "./fetchPostApiData";
import type { StatusResponse } from "@/app/types";

export const updatePassword = async ({
	new_password,
	token,
}: {
	new_password: string;
	token: string;
}): Promise<void> => {
	const variables = {
		new_password: new_password,
	};

	await fetchPostApiData<StatusResponse, typeof variables>({
		query: `/api/accounts/update-password/`,
		variables,
		cache: "force-cache",
		token,
		next: {},
	});
};
