import { FastifyInstance } from "fastify";
import { createServer } from "../server";
import { AppConfig } from '../types/appConfig'

// create a function to do server testing
describe('Server test', () => {

    // declare a variable for server
    let server: FastifyInstance;
    const fastifyPort = 8888;
    const connectStr = 'mongodb://localhost:27017/minioUserService';


    // pre-work
    beforeAll(async () => {

        const appConfig: AppConfig = {
            FASTIFY_PORT: fastifyPort,
            MONGO_CONNECTION_STRING: connectStr
        }
        server = await createServer(appConfig);

        await server.ready();
    });

    afterAll(async () => {
        try {
            await server.close();
            console.log('The fastify server has been closed!');
        } catch (err) {
            console.log(`Failed to close the fastify server, the reason: ${err}`);
        }
    });

    // create an unit test for testing GET /ping and it would be returned 'pong'
    it('Should be returned status code 200 and html body {msg:world}, when visit the endpoint GET /hello', async () => {
        // arrange

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/api/v1/ping'
        });

        // assert
        expect(response.statusCode).toBe(200);

        const dataSet = JSON.parse(response.body)['msg'];
        expect(dataSet).toBe('pong');
    });
});
