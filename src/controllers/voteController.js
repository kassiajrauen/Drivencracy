import db from '../db.js';
import { ObjectId } from 'mongodb';

export async function vote(req, res) {
    console.log(req.params.id, "aqui")
    const idChoice = new ObjectId(req.params.id);

    try {
        const choiceExist = await db.collection('choices').findOne({_id: idChoice});
        if(!choiceExist) {
            return res.sendStatus(404);
        }
        console.log(choiceExist)

        const insertVote = await db.collection('votes').insertOne({vote: idChoice, date: Date.now(), poolId: choiceExist.poolId});
        if(insertVote){
            res.sendStatus(201);
        }

    } catch (error) {
        res.sendStatus(500);
    }
}