// api/getProductsList.ts

"use server";

import { fetchGetApiData } from "@/api/fetchApiData";
import { ContactData } from "@/app/types";

export const getContactData = async (): Promise<ContactData | { status: number }> => {
	try {
		const response = await fetchGetApiData<ContactData, Record<string, unknown>>({
			query: "/api/front/contact",
			variables: {},
			cache: "force-cache",
			next: {},
		});
		return response;
	} catch (error) {
		console.error("API Error:", error);
		return { status: 500 };
	}
};
