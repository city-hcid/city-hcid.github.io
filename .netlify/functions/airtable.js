// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require('airtable');

exports.handler = async(event, context, callback) => {
    const { API_URL, API_CLIENT_ID, API_KEY } = process.env;

    const pass = (body) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        });
    }

    try {
        let response = await fetch("https://api.airtable.com/v0/" + API_CLIENT_ID + "/memnbers", {
            method: event.httpMethod,
            headers: {
                "Authorization": "Bearer" + API_KEY,
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