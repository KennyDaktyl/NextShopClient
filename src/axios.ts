// import axios, { AxiosError } from "axios";
// import { getSession } from "@/lib";

// const apiClient = axios.create({
// 	baseURL: process.env.API_URL,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// });

// // Interceptor dla odpowiedzi
// apiClient.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response.status === 401) {
// 			error.isUnauthorized = true;
// 		}
// 		if (error.response.status === 500) {
// 			error.serverError = true;
// 		}
// 		return Promise.reject(error);
// 	},
// );

// // Interceptor dla żądań
// apiClient.interceptors.request.use(
// 	async (config) => {
// 		const token = await getSession();
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );

// interface CustomAxiosError extends AxiosError {
// 	isUnauthorized?: boolean;
// 	serverError?: boolean;
// }

// export const postRequest = async (url: string, data: any, additionalHeaders?: any) => {
// 	try {
// 		const response = await apiClient.post(url, data, {
// 			headers: {
// 				...additionalHeaders,
// 			},
// 		});
// 		return response.data;
// 	} catch (error) {
// 		const customError = error as CustomAxiosError;
// 		if (customError.isUnauthorized) {
// 			console.error("Unauthorized access - 401");
// 		}
// 		if (customError.serverError) {
// 			console.error("Server error - 500");
// 		}
// 		// Rzucenie błędu, aby można było go obsłużyć w miejscu wywołania
// 		throw customError;
// 	}
// };

// export default apiClient;
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
	withToken?: boolean;
	withCredentials?: boolean;
}

interface CustomAxiosError extends AxiosError {
	status?: number;
}

const axiosInstance = async <T>({
	method,
	url,
	data = null,
	withToken = false,
	withCredentials,
}: AxiosInstanceConfig): Promise<T> => {
	try {
		const token = withToken ? await getSession() : null;
		const config: AxiosRequestConfig = {
			method,
			url: `${process.env.API_URL}${url}`,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
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
