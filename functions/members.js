// Functions
import Airtable from 'airtable';

exports.handler = async(event, context, callback) => {
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
}