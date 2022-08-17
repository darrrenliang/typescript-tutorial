import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { createServer } from "../server";
import { AppConfig } from "../types/appConfig";
import { dogRepoImpt } from "../repos/dogs-repo";
import { myDog } from "../types/dogs";

// create a function to do server testing
describe('Server test', () => {

    // declare a variable for server
    let server: FastifyInstance;
    const fastifyPort = 8888;
    const connectStr = 'mongodb://localhost:27017/myMERN';


    // pre-work
    beforeAll(async () => {

        const appConfig: AppConfig = {
            FASTIFY_PORT: fastifyPort,
            MONGO_CONNECTION_STRING: connectStr
        }
        server = await createServer(appConfig);

        await server.ready();
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    afterAll(async () => {
        try {
            await server.close();
            console.log('The fastify server has been closed!');

            await mongoose.connection.close();
            console.log('The mongoDB connection has been closed!');


        } catch (err) {
            console.log(`Failed to close the fastify server, the reason: ${err}`);
        }
    })

    it('Should be return an empty array, when GET /dogs', async () => {
        // arrange

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/dogs'
        });

        // assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(JSON.stringify({ dogs: [] }));
    });

    it('Given a dog item, it should be returned dog items, when GET /dogs', async () => {
        // arrange
        const dogBody = {
            name: "George",
            yell: "Bark"
        }

        await dogRepoImpt.of().addDog(dogBody);

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/dogs'
        });

        // assert
        expect(response.statusCode).toBe(200);
        const output = JSON.parse(response.body);
        expect(output['dogs'][0]['name']).toBe('George');
    });

    it('should successfully create a Dog to mongodb and the Dog can be found', async () => {
        // arrange

        // act

        const response = await server.inject({
            method: 'POST',
            url: '/api/todos',
            payload: {
                name: 'clean my desk',
                description: 'Should clean my desk before the remote meeting at 15:00.',
                status: false
            }
        });

        // assert
    });
});
