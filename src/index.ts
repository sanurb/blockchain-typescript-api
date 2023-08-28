import express  from "express";
import bodyParser from "body-parser";
import config from "./config/config";

const HTTP_PORT = config.server.port;

const app = express();

//using the body parser middleware
app.use(bodyParser.json());

app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
});