import { fetchPostApiData } from "./fetchPostApiData";
import type { StatusResponse } from "@/app/types";

export const updateUserAddress = async ({
	street,
	house_number,
	local_number,
	postal_code,
	city,
	token,
}: {
	street: string;
	house_number: string;
	local_number: string;
	postal_code: string;
	city: string;
	token: string;
}): Promise<void> => {
	const variables = {
		street: street,
		house_number: house_number,
		local_number: local_number,
		postal_code: postal_code,
		city: city,
	};

	await fetchPostApiData<StatusResponse, typeof variables>({
		query: `/api/accounts/update-address/`,
		variables,
		cache: "force-cache",
		token,
		next: {},
	});
};
