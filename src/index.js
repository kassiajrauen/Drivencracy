import express, {json} from 'express';
import cors from 'cors';

const server = express();
server.use(json());
server.use(cors());

server.post('/pool', );

server.listen(5000, () => {
    console.log("Listening on 5000")
})