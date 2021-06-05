const fetch = require("node-fetch");

exports.handler = async (evt) => {
	const searchQuery = evt.queryStringParameters.query || null;

	const query = `
	query media($search:String, $type:MediaType) { 
		Media(search:$search, type:$type){
			id
			bannerImage
		}
	}
	`;

	const aniListData = await fetch("https://graphql.anilist.co", {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: {
				search: searchQuery,
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
