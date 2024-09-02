import { fetchGetApiData } from "@/api/fetchApiData";

export async function getUserData(accessToken: string): Promise<any> {
	try {
		const url = "/api/accounts/profile/";
		const response = await fetchGetApiData<any, {}>({
			query: url,
			variables: {},
			cache: "no-cache",
			token: accessToken,
		});

		if ("status" in response && response.status === 401) {
			return { status: 401, data: null };
		}

		return { data: response, status: 200 };
	} catch (error: any) {
		console.error("Error fetching user data:", error);
		throw new Error("An error occurred while fetching user data.");
	}
}

export async function getUserFullData(accessToken: string): Promise<any> {
	try {
		const url = "/api/accounts/full-data/";
		const response = await fetchGetApiData<any, {}>({
			query: url,
			variables: {},
			cache: "no-cache",
			token: accessToken,
		});

		if ("status" in response && response.status === 401) {
			return { status: 401, data: null };
		}

		return { data: response, status: 200 };
	} catch (error: any) {
		console.error("Error fetching user data:", error);
		throw new Error("An error occurred while fetching user data.");
	}
}
