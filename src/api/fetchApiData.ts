import { notFound } from "next/navigation";

// Local dev convenience: media files usually only exist on the production
// server, not in a local checkout of the backend. When API_URL points at a
// local backend, rewrite absolute media/image URLs in API responses to the
// production host so images render locally without needing to sync media/.
const isLocalApiUrl = (url: string) => /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(url);

const rewriteMediaUrls = (rawJson: string): string => {
	const apiUrl = process.env.API_URL;
	const mediaFallback = process.env.MEDIA_FALLBACK_URL;
	if (!apiUrl || !mediaFallback || !isLocalApiUrl(apiUrl)) return rawJson;
	return rawJson.split(apiUrl).join(mediaFallback);
};

export const fetchGetApiData = async <TResult, TVariables extends Record<string, unknown>>({
	query,
	variables,
	next,
	cache = "default",
	token,
	sessionid,
}: {
	query: string;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
	token?: string;
	sessionid?: string;
}): Promise<TResult | { status: number }> => {
	if (!process.env.API_URL) {
		throw new TypeError("API_URL is not defined");
	}

	const url = new URL(`${process.env.API_URL}${query}`);
	Object.keys(variables).forEach((key) => url.searchParams.append(key, String(variables[key])));

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Cookie: `sessionid=${sessionid || ""}`,
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

	const rawText = await res.text();
	const data: TResult = JSON.parse(rewriteMediaUrls(rawText)) as TResult;
	if (!data) {
		throw new Error("API Response data is null");
	}
	return data;
};
