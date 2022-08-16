import { FastifyInstance } from "fastify";
import { createServer } from "../src/server";

// create a function to do server testing
describe('Server test', () => {

    // declare a variable for server
    let server: FastifyInstance;

    // pre-work
    beforeAll(async () => {
        server = createServer(8888);
        await server.ready();
    });

    afterAll(async () => {
        try {
            await server.close();
            console.log('The fastify server has been closed!');
        } catch (err) {
            console.log(`Failed to close the fastify server, the reason: ${err}`);
        }
    })

    // create an unit test for testing GET /ping and it would be returned 'pong'
    it('should be returned status code 200 and html body {msg:pong}, when visit the endpoint GET /ping', async () => {
        // arrange

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/ping'
        });

        // assert
        expect(response.statusCode).toBe(200);

        const dataSet = JSON.parse(response.body)['msg'];
        expect(dataSet).toBe('pong');
    });

});
