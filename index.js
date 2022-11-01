import express from "express";
import cors from "cors";
import { port } from "./config.js";
import routes from "./routes/index.js";

// Initializing variable express
const app = express();

// calling the cors method for access API
app.use(cors());

// calling the express.json() method for parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Calling Routes
app.use(routes);

// declare route
app.listen(port, () => {
  console.log(`PORT listen to ${port}`);
});