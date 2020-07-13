// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const { AIRTABLE_ENDPOINT, HCID_ID, HCID_KEY } = process.env;
    const Airtable = require('airtable');
    var data = [];
    await new Airtable({apiKey: HCID_KEY})
      .base(HCID_ID)('members')
      .select({
        maxRecords: 3,
        view: "Grid view"
     }).firstPage((err, records) => {
        if (err) {
            console.error(err);
            return
        }
        //all records are in the `records` array, do something with it
        else {
          console.log(records);
          data = records
        }
    })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify(data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}