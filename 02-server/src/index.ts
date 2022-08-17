import { createServer } from "./server";
import * as dotenv from 'dotenv';
import { AppConfig } from './types/appConfig'

// load env config
dotenv.config();

// get port from env
const port = process.env.SERVER_PORT || '8888' as string;
const connStr = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/myMERN' as string;;

const appConfig: AppConfig = {
    FASTIFY_PORT: parseInt(port),
    MONGO_CONNECTION_STRING: connStr
}
// create an api server
const server = createServer(appConfig);

export { server }