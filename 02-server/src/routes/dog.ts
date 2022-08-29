import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify';
import { dogRepoImpt } from '../repos/dogs-repo';
import { dogResponseSchema, dogsResponseSchema, postDogBodySchema } from '../schemas/dog';
import { myDog } from '../types/dogs';

const dogRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const getDogsResponseSchema: RouteShorthandOptions = {
        ...opts,
        schema: {
            response: {
                200: dogsResponseSchema
            }
        }
    };

    server.get('/dogs', getDogsResponseSchema, async (request, reply) => {
        const dogRepo = dogRepoImpt.of();

        try {
            const dogs = await dogRepo.getDogs()
            return reply.status(200).send({ dogs })
        } catch (err) {
            return reply.status(500).send({ msg: `Internal Server Error: ${err}` })
        }
    });

    const postDogsOptions: RouteShorthandOptions = {
        ...opts,
        schema: {
            body: postDogBodySchema,
            response: {
                201: dogResponseSchema
            }
        }

    };

    server.post('/dogs', postDogsOptions, async (request, reply) => {
        const dogRepo = dogRepoImpt.of();

        try {
            const dogBody = request.body as myDog;
            const dog = await dogRepo.addDog(dogBody);
            return reply.status(201).send({ dog });
        } catch (err) {
            server.log.error(`POST /dogs Error: ${err}`);
            return reply.status(500).send(`[Server Error]: ${err}`);
        };
    });

    interface IdParam {
        id: string
    }

    server.put<{ Params: IdParam; Body: myDog }>('/dogs/:id', opts, async (request, reply) => {
        const dogRepo = dogRepoImpt.of();
        try {
            const dogId = request.params.id;
            const dogBody = request.body;
            const dog = await dogRepo.updateDog(dogId, dogBody);
            if (dog) {
                return reply.status(200).send({ dog });
            } else {
                return reply.status(404).send({ msg: `Not Found Todo #${dogId}` });
            };
        }
        catch (err) {
            return reply.status(500).send(`[Server Error]: ${err}`);
        };
    });

    server.delete<{ Params: IdParam }>('/dogs/:id', opts, async (request, reply) => {
        const dogRepo = dogRepoImpt.of();
        try {
            const dogId = request.params.id;
            const dog = await dogRepo.deleteDog(dogId);
            if (dog) {
                return reply.status(204).send({ msg: `The dog(#${dogId}) has been deleted.` });
            } else {
                return reply.status(404).send({ msg: `Not Found Dog #${dogId}` });
            };

        } catch (err) {
            return reply.status(500).send(`[Sever Error]: ${err}`);
        };
    });

    done();
};

export { dogRouter };