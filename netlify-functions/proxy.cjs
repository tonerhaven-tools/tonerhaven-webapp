const fetch = import("node-fetch").then((module) => module.default);
const dotenv = require("dotenv");

exports.handler = async function (event, context) {
  const apiUrl = process.env.EXPRESS_API_URL; // Replace with your API URL

  console.log(`connected to ${apiUrl}`);

  try {
    const response = await fetch(apiUrl + event.path, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    const data = await response.json();

    console.log(JSON.stringify(data));

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log(JSON.stringify(error));

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
