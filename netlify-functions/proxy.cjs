const dotenv = require("dotenv");
const { default: fetch } = require("node-fetch");

exports.handler = async function (event, context) {
  const apiUrl = `https://tonerhaven-api.netlify.app`; // Replace with your API URL

  console.log(`connected to ${apiUrl}`);

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

  // try {

  // } catch (error) {
  //   console.log(JSON.stringify(error));
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(error),
  //   };
  // }
};
