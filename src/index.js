import express, {json} from 'express';
import cors from 'cors';
import {createPool, getPool} from './controllers/poolController.js';

const server = express();
server.use(json());
server.use(cors());

server.post('/pool', createPool);

server.get('/pool', getPool);

server.listen(5000, () => {
    console.log("Listening on 5000")
})