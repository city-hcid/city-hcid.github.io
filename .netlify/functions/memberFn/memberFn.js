/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = function(event, context, callback) {
    const Airtable = require('airtable');
    const { AIRTABLE_ENDPOINT, HCID_ID, HCID_KEY } = process.env;

    // THIS FUNCTION FORMATS AND SENDS YOUR RESPONSE BACK TO YOUR FRONT-END
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify( body )
        });
    }
    
    // CONFIGURE YOUR AIRTABLE BASE CONNECTION
    /* Airtable.configure({
        endpointUrl: AIRTABLE_ENDPOINT,
        apiKey: HCID_KEY
    }); */

    var result = new Airtable({apiKey: HCID_KEY})
      .base(HCID_ID)('members')
      .select({
        view: "Grid view",
        fields: ["name", "first-name", "last-name", "status", "bio-url", "photo-url", "post", "short-bio"],
        sort: [{field: "last-name", direction: "asc"}]
     }).firstPage((err, records) => {
        if (err) {
            console.error(err);
            return
        }
        var data = [];
        for (i in records) {
            data.push(records[i].fields);
            //console.log(records[i].fields);
        }
        send(data);
     })
}