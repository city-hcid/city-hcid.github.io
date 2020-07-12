// Functions
var Airtable = require('airtable');

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = function(event, context, callback) {
    //pull the required information from your environment variables, which can be set in the Netlify UI
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
            body: JSON.stringify(body)
        });
    }

    // CONFIGURE YOUR AIRTABLE BASE CONNECTION
    Airtable.configure({
        endpointUrl: AIRTABLE_ENDPOINT,
        apiKey: HCID_KEY
    });
    var base = Airtable.base(HCID_ID);
    var table = base('members');

    var data = [];

    /**
      AIRTABLE REQUEST LOGIC GOES HERE, APPENDING TO DATA
      REFERENCE YOUR BASE-SPECIFIC API FOR EXAMPLES OF
      COMMON CRUD OPERATIONS
    */
   table.select({
    view: "Grid view"
}).firstPage((err, records) => {
    if (err) {
        console.error(err)
        return
    }
    //all records are in the `records` array, do something with it
    else {
        data = records;
    }
})
    send(data);
}

/* exports.handler = async(event, context, callback) => {
    const { HCID_ID, HCID_KEY } = process.env;

    const pass = (body) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        });
    }

    try {
        let response = await fetch("https://api.airtable.com/v0/" + HCID_ID + "/memnbers", {
            method: event.httpMethod,
            headers: {
                "Authorization": "Bearer" + HCID_KEY,
                "Content-Type": "application/json"
            },
            body: event.body
        })
        let data = await response.json()
        await pass(data)
    } catch (err) {
        let error = {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ error: err.message })
        }
        await pass(error)
    }
} */