const fetch = require("node-fetch");
const dotenv = require("dotenv");

exports.handler = async function (event, context) {
  const apiUrl = process.env.EXPRESS_API_URL; // Replace with your API URL

  try {
    const response = await fetch(apiUrl + event.path, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
