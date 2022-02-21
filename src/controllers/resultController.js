import db from '../db.js';
import {ObjectId} from 'mongodb';

export async function result(req, res) {
    const poolId = new ObjectId(req.params.id);

    try {
        const poolExist = await db.collection('pools').findOne({_id: poolId});
        if(!poolExist) {
            return res.sendStatus(404);
        }
        console.log(poolExist)

        const optionChoice = await db.collection('choices').find({_id: ObjectId}).toArray();
        console.log(optionChoice)
        

        const votes = await db.collection('votes').find({poolId: poolId.toString()}).toArray();
        if(votes){
            

            res.status(200).send(votes);
        }
        
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }

}