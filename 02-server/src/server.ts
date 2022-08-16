import fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = fastify({
    logger: {
        transport: {
            target: "pino-pretty"
        },
        level: 'debug'
    }
});


const createServer: (port: number) => FastifyInstance = (port) => {

    const listenHost = '0.0.0.0'
    const fastifyCFG = {
        port: port,
        host: listenHost
    };

    server.listen(fastifyCFG, (err, _) => {
        if (err) {
            console.error(err);
        }
        return server;
    });


    server.get('/ping', async (request, reply) => {
        return reply.status(200).send({ msg: "pong" })
    });

    return server;
};

export { createServer }

