import fastify, { FastifyInstance } from "fastify";
import { createConnection } from "./plugins/mongoose";
import { AppConfig } from "./types/appConfig";
import { recordRepoImpt } from "./repos/record-repo";
import { recordRouter } from "./routes/record"
import axios from 'axios'

// // UTC时间格式
// var dateStr = '2021-11-22T04:25:32.000Z'
// // UTC转为date
// var date = new Date(Date.parse(dateStr))
// document.cookie = 'api=abcdefg;'
// document.cookie = 'token=1234567;'
// document.cookie = 'identity=adddfewwerwerwf;' + ' path=/;' + ' expires=' + date.toGMTString() + ';'

const userLogin = async () => {
    const accesskey: string = 'minioadmin'
    const secretkey: string = 'adminminio'
    const url: string = "http://localhost:9001/api/v1/login"
    return axios.post(url, {
        "accesskey": accesskey,
        "secretkey": secretkey
    })
    // .then(res => {
    //     // console.log(res)
    //     const token: string = res.headers['set-cookie']
    //     // console.log(res.headers['set-cookie'][0])
    //     // console.log(token)
    //     return token
    // })
}

const getBuckets = async (cookies: any) => {
    // const url: string = "http://localhost:9001/api/v1/buckets"
    // const url: string = "http://localhost:9001/api/v1/buckets/test"
    // const url: string = "http://localhost:9001/api/v1/buckets/test/quota"
    const url: string = "http://localhost:9001/api/v1/buckets/test"
    axios.get(url, {
        headers: { cookie: cookies }
    }).then(res => {
        console.log(res.data)
    })


}

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

    server.register(recordRouter, { prefix: '/api/v1' });

    server.get('/api/v1/ping', async (request, reply) => {
        return reply.status(200).send({ msg: "pong" })
    });

    const fastifyConfig = {
        port: appConfig.FASTIFY_PORT,
        host: listenAddress
    }

    try {
        await server.listen(fastifyConfig)
        userLogin().then(res => {
            // console.log(res)
            const token: any = res.headers['set-cookie']
            getBuckets(token)
        })
        // 
        // console.log(token)
    } catch (error) {
        server.log.fatal(`${error}`)
    }

    return server;
};


export { createServer }

