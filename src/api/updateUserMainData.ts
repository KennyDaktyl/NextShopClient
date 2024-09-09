import { fetchPostApiData } from "./fetchPostApiData";
import type { StatusResponse } from "@/app/types";

export const updateUserMainData = async ({
	email,
	first_name,
	last_name,
	mobile,
	token,
}: {
	email: string;
	first_name: string;
	last_name: string;
	mobile: string;
	token: string;
}): Promise<void> => {
	const variables = {
		email: email,
		first_name: first_name,
		last_name: last_name,
		mobile: mobile,
	};

	await fetchPostApiData<StatusResponse, typeof variables>({
		query: `/api/accounts/update-main-data/`,
		variables,
		cache: "force-cache",
		token,
		next: {
			tags: ["order-status"],
		},
	});
};
