import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const fetchGetApiData = async <TResult, TVariables extends Record<string, unknown>>({
	query,
	variables,
	next,
	cache = "default",
	token,
}: {
	query: string;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
	token?: string;
}): Promise<TResult | { status: number }> => {
	if (!process.env.API_URL) {
		throw new TypeError("API_URL is not defined");
	}

	const url = new URL(`${process.env.API_URL}${query}`);
	Object.keys(variables).forEach((key) => url.searchParams.append(key, String(variables[key])));

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Cookie: `sessionid=${cookies().get("sessionid")?.value || ""}`,
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	const res = await fetch(url.toString(), {
		method: "GET",
		headers,
		cache,
		...(next && { next }),
	});

	if (!res.ok) {
		if (res.status === 401) {
			return { status: 401 };
		} else if (res.status === 404) {
			throw notFound();
		}
		throw new Error(`Unexpected status code: ${res.status}`);
	}

	const data: TResult = (await res.json()) as TResult;
	if (!data) {
		throw new Error("API Response data is null");
	}
	return data;
};
