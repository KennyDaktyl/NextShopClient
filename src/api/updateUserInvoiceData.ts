import { fetchPostApiData } from "./fetchPostApiData";
import type { StatusResponse } from "@/app/types";

export const updateUserinvoiceData = async ({
	company,
	company_payer,
	nip,
	invoice_street,
	invoice_house_number,
	invoice_local_number,
	invoice_postal_code,
	invoice_city,
	token,
}: {
	company: string;
	company_payer: string;
	nip: string;
	invoice_street: string;
	invoice_house_number: string;
	invoice_local_number: string;
	invoice_postal_code: string;
	invoice_city: string;
	token: string;
}): Promise<void> => {
	const variables = {
		company: company,
		company_payer: company_payer,
		nip: nip,
		invoice_street: invoice_street,
		invoice_house_number: invoice_house_number,
		invoice_local_number: invoice_local_number,
		invoice_postal_code: invoice_postal_code,
		invoice_city: invoice_city,
	};

	await fetchPostApiData<StatusResponse, typeof variables>({
		query: `/api/accounts/update-invoice-data/`,
		variables,
		cache: "force-cache",
		token,
		next: {},
	});
};
