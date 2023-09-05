const https = require("https");

exports.handler = async function (event, context) {
  const apiUrl = `https://tonerhaven-api.netlify.app${event.path}`; // Replace with your API URL

  console.log(`connected to ${apiUrl}`);

  try {
    const response = await new Promise((resolve, reject) => {
      const req = https.request(
        apiUrl,
        {
          method: event.httpMethod,
          headers: event.headers,
        },
        (res) => {
          let responseBody = "";

          res.on("data", (chunk) => {
            responseBody += chunk;
          });

          res.on("end", () => {
            const statusCode = res.statusCode;
            const headers = {
              "Content-Type": "application/json",
            };
            const response = {
              statusCode,
              headers,
              body: responseBody,
            };

            console.log(JSON.stringify(response));

            resolve(response);
          });
        }
      );

      req.on("error", (error) => {
        console.error(`Error: ${error.message}`);
        reject(error);
      });

      // Write the request body if it exists
      if (event.body) {
        req.write(event.body);
      }

      req.end();
    });

    return response;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
