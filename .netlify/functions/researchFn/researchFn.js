exports.handler = function(event, context, callback) {
  const Airtable = require('airtable');
  const { AIRTABLE_ENDPOINT, HCID_ID, HCID_KEY } = process.env;

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

  var result = new Airtable({apiKey: HCID_KEY})
    .base(HCID_ID)('publications')
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
      }
      send(data);
   })
}