exports.handler = function(event, context, callback) {
  const Airtable = require('airtable');
  const { HCID_ID, HCID_KEY } = process.env;
  const table = decodeURIComponent(event.queryStringParameters.table);
  const filter = decodeURIComponent(event.queryStringParameters.filter);
  const view = decodeURIComponent(event.queryStringParameters.view);
  console.log(filter);
  const fields = decodeURIComponent(event.queryStringParameters.fields).split(',');
  
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

    new Airtable({apiKey: HCID_KEY})
    .base(HCID_ID)(table)
    .select({
      maxRecords: 1,
      view: view,
      filterByFormula: filter,
      fields: fields
    }).firstPage((err, records) => {
      if (err) {
          console.error(err);
          return
      }
      var data = [];
      for (i in records) {
          data.push(records[i].fields);
      }
      send(data);
      console.log(data)
   })
}