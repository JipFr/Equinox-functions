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

	let banner = "";
	if (
		aniListData &&
		aniListData.data &&
		aniListData.data.Media &&
		aniListData.data.Media.bannerImage
	) {
		banner = aniListData.data.Media.bannerImage;
	}

	return {
		statusCode: 302,
		headers: {
		   "Location": banner,
		}
  }
};
