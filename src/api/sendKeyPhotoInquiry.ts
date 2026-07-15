export const sendKeyPhotoInquiry = async (
	formData: FormData,
): Promise<{ message: string } | { status: number; errors?: Record<string, string[]> }> => {
	if (!process.env.API_URL) {
		throw new TypeError("API_URL is not defined");
	}

	const res = await fetch(`${process.env.API_URL}/api/inquiries/key-photo/`, {
		method: "POST",
		body: formData,
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		return { status: res.status, errors: data };
	}

	return data;
};
