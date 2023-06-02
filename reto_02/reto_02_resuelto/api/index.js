const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const handler = require("./src/apiRequest");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Cors para poder acceder a la api desde el front.
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});


app.get("/search", async (req, res) => {

    const word = req.query.word;

    try {
        const data = await handler(word);
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.listen(3001, () => {

  console.log(`listening on port 3001`); 

});