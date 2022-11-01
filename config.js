// import library
import dotenv from "dotenv";

// use dotenv
dotenv.config();

const port = process.env.PORT;

const db = process.env.DATABASE_URL;

const jwt_secret = process.env.JWT_SECRET;

export { port, db, jwt_secret };
