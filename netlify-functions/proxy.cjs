exports.handler = async function (event, context) {
  const apiUrl = `https://tonerhaven-api.netlify.app`; // Replace with your API URL

  console.log(`connected to ${apiUrl}`);

  const response = fetch(apiUrl + event.path, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
  });

  const data = response.json();

  console.log(JSON.stringify(data));

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
