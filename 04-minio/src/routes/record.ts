import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { recordRepoImpt } from '../repos/record-repo';
import { recordResponseSchema, recordsResponseSchema, postRecordBodySchema } from '../schemas/record';
import { actionRecord } from '../types/record';

const recordRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
    const recordRepo = recordRepoImpt.of();

    const getRecordsResponseSchema: RouteShorthandOptions = {
        ...opts,
        schema: {
            response: {
                200: recordsResponseSchema
            }
        }
    };

    server.get('/records', getRecordsResponseSchema, async (request, reply) => {

        try {
            const records = await recordRepo.getRecords()
            return reply.status(200).send({ records })
        } catch (err) {
            return reply.status(500).send({ msg: `Internal Server Error: ${err}` })
        }
    });

    const postRecordsOptions: RouteShorthandOptions = {
        ...opts,
        schema: {
            body: postRecordBodySchema,
            response: {
                201: recordResponseSchema
            }
        }

    };

    server.post('/records', postRecordsOptions, async (request, reply) => {
        try {
            const recordBody = request.body as actionRecord;
            const record = await recordRepo.addRecord(recordBody);
            return reply.status(201).send({ record });
        } catch (err) {
            server.log.error(`POST /records Error: ${err}`);
            return reply.status(500).send(`[Server Error]: ${err}`);
        };
    });

    done();
};

export { recordRouter };