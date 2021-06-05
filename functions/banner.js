exports.handler = async (evt) => {
	const query = event.queryStringParameters.query || null
	return {
		statusCode: 200,
		body: `Your query: ${query}`
	}
}