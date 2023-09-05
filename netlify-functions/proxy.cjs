exports.handler = async (event, context) => {
  try {
    // Define the URL of the external API
    const apiUrl = "https://tonerhaven-api.netlify.app";

    const fetch = await import("node-fetch");

    const httpMethod = event.httpMethod.toUpperCase();

    const options = {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (httpMethod === "POST" || httpMethod === "PUT") {
      options.body = event.body;
    }

    const url = `${apiUrl}${event.path}`;
    console.log(url);

    const response = await fetch.default(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the data as a JSON response
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Handle any errors and return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
