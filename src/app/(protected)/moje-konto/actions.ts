"use server";
import { updatePassword } from "@/api/updatePassword";
import { updateUserAddress } from "@/api/updateUserAddress";
import { updateUserinvoiceData } from "@/api/updateUserInvoiceData";
import { updateUserMainData } from "@/api/updateUserMainData";

export async function updateUserMainDataAction({
	email,
	first_name,
	last_name,
	token,
}: {
	email: string;
	first_name: string;
	last_name: string;
	token: string;
}): Promise<void> {
	const response = await updateUserMainData({ email, first_name, last_name, token });
}

export async function updateUserPasswordAction({
	new_password,
	token,
}: {
	new_password: string;
	token: string;
}): Promise<void> {
	const response = await updatePassword({ new_password, token });
	return response;
}

export async function updateUserAddressAction({
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
}): Promise<void> {
	const response = await updateUserAddress({
		street,
		house_number,
		local_number,
		postal_code,
		city,
		token,
	});
	return response;
}

export async function updateUserInvoiceDataAction({
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
}): Promise<void> {
	const response = await updateUserinvoiceData({
		company,
		company_payer,
		nip,
		invoice_street,
		invoice_house_number,
		invoice_local_number,
		invoice_postal_code,
		invoice_city,
		token,
	});
	return response;
}
