const http = require("http");


function requestToApi(word) {

  const options = {
    hostname: "api.dictionaryapi.dev",
    path: `/api/v2/entries/en/${word}`,
    method: "GET",
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const jsonResponse = JSON.parse(data);
        resolve(jsonResponse);
      });
    });

    req.on("error", (error) => {
      reject(`Error making API request: ${error}`);
    });

    req.end();
  });
}

module.exports = requestToApi;
