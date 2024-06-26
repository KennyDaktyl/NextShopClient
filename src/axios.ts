import { getSession } from "@/lib";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod =
	| "get"
	| "post"
	| "put"
	| "delete"
	| "options"
	| "patch"
	| "head"
	| "connect"
	| "trace";

interface AxiosInstanceConfig {
	method: HttpMethod;
	url: string;
	data?: any;
	params?: Record<string, any>;
	token?: string;
	withCredentials?: boolean;
}

interface CustomAxiosError extends AxiosError {
	status?: number;
}

const axiosInstance = async <T>({
	method,
	url,
	data = null,
	params = {},
	token = "",
	withCredentials,
}: AxiosInstanceConfig): Promise<T> => {
	try {
		const config: AxiosRequestConfig = {
			method,
			url: `${process.env.API_URL}${url}`,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
			params,
			withCredentials,
		};
		if (method === "post") {
			config.data = data;
		} else if (method === "get" && data) {
			config.params = data;
		}

		const response: AxiosResponse<T> = await axios(config);
		switch (response.status) {
			case 200:
			case 201:
			case 202:
			case 204:
				return response.data;
			default:
				console.error("UNEXPECTED status code:", response.status);
				throw new Error(`Unexpected status code: ${response.status}`);
		}
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			const statusCode = error.response?.status;

			if (!error.response) {
				// Network error
				console.error("Network error:", error);
				throw { status: "Network error" };
			} else {
				console.error(`Error ${statusCode}:`, error.response.data);

				const customError: CustomAxiosError = error;
				customError.status = statusCode;

				throw { status: statusCode, data: error.response.data };
			}
		} else {
			// Inne błędy, które nie są związane z Axios
			console.error("Unexpected error:", error);
			throw { status: "Unexpected error" };
		}
	}
};

export default axiosInstance;
