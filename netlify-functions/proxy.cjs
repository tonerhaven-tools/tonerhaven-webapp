exports.handler = async (event, context) => {
  try {
    // Define the URL of the external API
    const apiUrl = "https://tonerhaven-api.netlify.app/api";

    // Extract query parameters from the incoming request
    const params = new URLSearchParams(event.queryStringParameters);

    // Dynamically import node-fetch as an ES module
    const fetch = await import("node-fetch");

    // Make a request to the external API
    const response = await fetch.default(`${apiUrl}?${params.toString()}`, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      // If the request method is POST or PUT, you can pass the request body here
      body: event.body,
    });

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
