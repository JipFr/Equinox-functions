const fetch = require("node-fetch");

exports.handler = async (evt) => {
	const query = evt.queryStringParameters.query || null;

	const aniListData = await fetch("https://graphql.anilist.co", {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: {
				search: query,
				type: "MANGA",
			},
		}),
		method: "POST",
	}).then((d) => d.json());

	const banner = aniListData?.data?.Media?.bannerImage ?? null;

	return {
		statusCode: 200,
		body: `Your query: ${banner}`,
	};
};
