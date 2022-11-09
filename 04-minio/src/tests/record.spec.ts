import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { createServer } from "../server";
import { AppConfig } from "../types/appConfig";
import { actionRecord } from "../types/record";

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

    it('Should be return an empty array, when GET /records', async () => {
        // arrange

        // act
        const response = await server.inject({
            method: 'GET',
            url: '/api/v1/records'
        });

        // assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(JSON.stringify({ records: [] }));
    });

    it('should successfully create a record to mongodb and the record can be found', async () => {
        // arrange

        // act
        const response1 = await server.inject({
            method: 'POST',
            url: '/api/v1/records',
            payload: {
                user: "ysliange",
                action: "Login",
            }
        });

        // assert-1: send a POST method request to check the result of creating a record.
        expect(response1.statusCode).toBe(201);
        const res1: { record: actionRecord } = JSON.parse(response1.body);
        expect(res1.record.user).toBe('ysliange');
        expect(res1.record.action).toBe('Login');

        // assert-2: send a GET method request to check the record we have created exists in database.
        const response2 = await server.inject({
            method: 'GET',
            url: '/api/v1/records'
        });

        expect(response2.statusCode).toBe(200);
        const res2: { records: Array<actionRecord> } = JSON.parse(response2.body);
        expect(res2.records.length).toBe(1);
        expect(res2.records[0].user).toBe('ysliange');
        expect(res2.records[0].action).toBe('Login');
    });

});