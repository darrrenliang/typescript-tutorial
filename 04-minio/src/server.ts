import fastify, { FastifyInstance } from "fastify";
import { createConnection } from "./plugins/mongoose";
import { AppConfig } from "./types/appConfig";
import { recordRepoImpt } from "./repos/record-repo";
import { recordRouter } from "./routes/record"


const listenAddress = '0.0.0.0'

const createServer = async (appConfig: AppConfig) => {

    const server: FastifyInstance = fastify({
        logger: {
            transport: {
                target: "pino-pretty"
            },
            level: 'debug'
        }
    });

    if (!!appConfig.MONGO_CONNECTION_STRING) {
        try {
            await createConnection(appConfig.MONGO_CONNECTION_STRING);
            server.log.info(`Mongo connect successfully`);
        } catch (err) {
            server.log.fatal(`Failed to connecto mongodb: ${err}`);
            throw new Error(`${err}`);
        }
    }

    server.register(recordRouter, { prefix: '/api/v1' });

    server.get('/api/v1/ping', async (request, reply) => {
        return reply.status(200).send({ msg: "pong" })
    });

    const fastifyConfig = {
        port: appConfig.FASTIFY_PORT,
        host: listenAddress
    }

    try {
        await server.listen(fastifyConfig)
    } catch (error) {
        server.log.fatal(`${error}`)
    }

    return server;
};


export { createServer }

