import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify';
import { myDog } from '../types/dogs';
import { dogRepoImpt } from '../repos/dogs-repo';

const dogRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
    server.get('/dogs', async (request, reply) => {
        const dogRepo = dogRepoImpt.of();
        try {
            const dogs = await dogRepo.getDogs()
            return reply.status(200).send({ dogs })
        } catch (err) {
            return reply.status(500).send({ msg: `Internal Server Error: ${err}` })
        }
    });

    done();
};

export { dogRouter };