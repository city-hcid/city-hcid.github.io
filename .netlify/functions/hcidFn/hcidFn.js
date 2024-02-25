exports.handler = function (event, context, callback) {
	const Airtable = require("airtable");
	const { HCID_ID, hcid_personal_access_token } = process.env;
	const table = decodeURIComponent(event.queryStringParameters.table);
	const view = decodeURIComponent(event.queryStringParameters.view);
	const fields = decodeURIComponent(event.queryStringParameters.fields).split(
		","
	);
	const sortString = JSON.parse(
		decodeURIComponent(event.queryStringParameters.sort)
	);
	var sort = [];
	sort.push(sortString);

	const send = (body) => {
		callback(null, {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers":
					"Origin, X-Requested-With, Content-Type, Accept",
			},
			body: JSON.stringify(body),
		});
	};

	new Airtable({ apiKey: hcid_personal_access_token })
		.base(HCID_ID)(table)
		.select({
			view: view,
			fields: fields,
			sort: sort,
		}).eachPage(function page(records, fetchNextPage) {
			// Add records to the data array
			records.forEach(function(record) {
				data.push(record.fields);
			});
			
			console.log("fetch next page");
			// Proceed to the next page
			fetchNextPage();
			console.log("fetch next page");

	
		}, function done(err) {
			if (err) {
				console.error(err);
				return;
			}
			// All records have been retrieved and added to the data array
			send(data); // Now send the complete array
			console.log('All records have been retrieved and sent');
		});
	
};
