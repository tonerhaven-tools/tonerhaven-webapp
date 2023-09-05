exports.handler = async (event, context) => {
  try {
    // Define the URL of the external API
    const apiUrl = "https://tonerhaven-api.netlify.app";

    // Extract query parameters from the incoming request

    // Dynamically import node-fetch as an ES module
    const fetch = await import("node-fetch");

    // Determine the request method (GET, POST, PUT, etc.)
    const httpMethod = event.httpMethod.toUpperCase();

    // Initialize options object with common headers
    const options = {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
    };

    // Include request body for POST and PUT requests
    if (httpMethod === "POST" || httpMethod === "PUT") {
      options.body = event.body;
    }

    const url = `${apiUrl}${event.path}`;
    console.log(url);

    // Make a request to the external API
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
