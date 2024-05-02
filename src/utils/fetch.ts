const doGraphQLFetch = async (
	query: string,
	variables: object,
	token?: string,
) => {
	const url = import.meta.env.VITE_API_URL as string;

	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	});
	if (!response.ok) throw new Error(response.statusText);
	const json = await response.json();
	return json.data;
};

const doUploadFetch = async (image: File, token: string) => {
	const url = import.meta.env.VITE_UPLOAD_URL as string;

	const body = new FormData();
	body.set("image", image);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body,
	});

	if (!response.ok) throw new Error(response.statusText);

	const json = await response.json();
	return json;
};

export {doGraphQLFetch, doUploadFetch};
