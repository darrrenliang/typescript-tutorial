import { createServer } from "./server";
import * as dotenv from 'dotenv';
import exp from "constants";

// load env config
dotenv.config();

// get port from env
const port = process.env.SERVER_PORT || '8888';

// create an api server
const server = createServer(parseInt(port));

export { server }