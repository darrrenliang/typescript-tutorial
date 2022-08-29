import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
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
    });

    it('Should be return an empty array, when GET /dogs', async () => {
        // arrange

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/api/dogs'
        });

        // assert
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(JSON.stringify({ dogs: [] }));
    });

    it('should successfully create a Dog to mongodb and the Dog can be found', async () => {
        // arrange

        // act
        const response1 = await server.inject({
            method: 'POST',
            url: '/api/dogs',
            payload: {
                name: "Mei",
                yell: "He He He"
            }
        });

        // assert-1: send a POST method request to check the result of creating a dog.
        expect(response1.statusCode).toBe(201);
        const res1: { dog: myDog } = JSON.parse(response1.body);
        expect(res1.dog.name).toBe('Mei');
        expect(res1.dog.yell).toBe('He He He');

        // assert-2: send a GET method request to check the dog we have created exists in database.
        const response2 = await server.inject({
            method: 'GET',
            url: '/api/dogs'
        });

        expect(response2.statusCode).toBe(200);
        const res2: { dogs: Array<myDog> } = JSON.parse(response2.body);
        console.log(res2)
        expect(res2.dogs.length).toBe(1);
        expect(res2.dogs[0].name).toBe('Mei');
        expect(res2.dogs[0].yell).toBe('He He He');
    });

    it("should successfully create a Dog to mongodb and then update it by Id", async () => {
        // arrange
        const response1 = await server.inject({
            method: 'POST',
            url: '/api/dogs',
            payload: {
                name: 'Terry',
                yell: 'QQQQ'
            }
        });

        expect(response1.statusCode).toBe(201);
        const res1: { dog: myDog } = JSON.parse(response1.body);
        expect(res1.dog.name).toBe('Terry');
        expect(res1.dog.yell).toBe('QQQQ');

        // act
        const dogId = res1.dog.id;
        const response2 = await server.inject({
            method: 'PUT',
            url: `/api/dogs/${dogId}`,
            payload: {
                yell: 'AAAA'
            }
        });

        // assert
        expect(response2.statusCode).toBe(200);
        const res2: { dog: myDog } = JSON.parse(response2.body);
        expect(res2.dog.name).toBe('Terry');
        expect(res2.dog.yell).toBe('AAAA')
    });

    it("should successfully create a Dog and then delete it by id", async () => {
        // arrange
        const response1 = await server.inject({
            method: 'POST',
            url: '/api/dogs',
            payload: {
                name: 'Stephen',
                yell: 'Bei Ba Man'
            }
        });

        expect(response1.statusCode).toBe(201);
        const res1: { dog: myDog } = JSON.parse(response1.body);
        expect(res1.dog.name).toBe('Stephen');
        expect(res1.dog.yell).toBe('Bei Ba Man');

        // act
        const dogId = res1.dog.id;
        const response2 = await server.inject({
            method: 'DELETE',
            url: `/api/dogs/${dogId}`
        })

        // assert
        expect(response2.statusCode).toBe(204);
    });
});