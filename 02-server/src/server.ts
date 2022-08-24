import fastify, { FastifyInstance } from "fastify";
import { createConnection } from "./plugins/mongoose";
import { AppConfig } from "./types/appConfig";
import { dogRepoImpt } from "./repos/dogs-repo";
import { dogRouter } from "./routes/dog"


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

    server.get('/hello', async (request, reply) => {
        return reply.status(200).send({ msg: "world" })
    });


    // server.get('/dogs', async (request, reply) => {
    //     const dogRepo = dogRepoImpt.of();
    //     try {
    //         const dogs = await dogRepo.getDogs()
    //         return reply.status(200).send({ dogs })
    //     } catch (err) {
    //         return reply.status(500).send({ msg: `Internal Server Error: ${err}` })
    //     }s
    // });
    server.register(dogRouter, { prefix: '/api' });

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

