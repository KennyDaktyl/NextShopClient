// api/fetchPostApiData.ts
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const fetchPostApiData = async <TResult, TVariables>({
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
}): Promise<TResult> => {
	if (!process.env.API_URL) {
		throw new TypeError("API_URL is not defined");
	}

	const url = new URL(`${process.env.API_URL}${query}`);
	let headers: HeadersInit = {
		"Content-Type": "application/json",
		Cookie: `sessionid=${cookies().get("sessionid")?.value || ""}`,
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	const res = await fetch(url.toString(), {
		method: "POST",
		headers,
		body: JSON.stringify(variables),
		cache,
		...(next && { next }),
		credentials: "include",
	});

	if (!res.ok) {
		let errorMessage = "Unexpected status code";
		try {
			const errorData = await res.json();
			errorMessage = errorData.error || errorMessage;
		} catch {
			// If parsing JSON fails, fallback to default error message
		}
		if (res.status === 401) {
			throw new Error("Unauthorized");
		} else if (res.status === 404) {
			throw notFound();
		} else if (res.status === 400) {
			throw new Error(errorMessage);
		} else {
			throw new Error(`${errorMessage}: ${res.status}`);
		}
	}

	const data: TResult = await res.json();

	const setCookieHeader = res.headers.get("set-cookie");
	if (setCookieHeader) {
		const parsedCookies = setCookieHeader.split(",").map((cookieStr) => cookieStr.trim());
		parsedCookies.forEach((cookieStr) => {
			const cookieParts = cookieStr.split(";")[0].split("=");
			if (cookieParts[0] === "sessionid") {
				cookies().set({
					name: "sessionid",
					value: cookieParts[1],
					path: "/",
					httpOnly: true,
					sameSite: "none",
					secure: true,
				});
			}
		});
	}

	if (!data) {
		throw new Error("API Response data is null");
	}
	return data;
};
