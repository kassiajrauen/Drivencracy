import db from '../db.js';
import {ObjectId} from 'mongodb';

export async function result(req, res) {
    const poolId = new ObjectId(req.params.id);
    try {
        const poolExist = await db.collection('pools').findOne({_id: poolId});
        if(!poolExist) {
            return res.sendStatus(404);
        }

        const optionChoice = await db.collection('choices').find({_id: ObjectId}).toArray();

        const votes = await db.collection('votes').find({poolId: poolId.toString()}).toArray();
        if(votes){
            const t = [];
            for(let i = 0; i < votes.length; i++){
                const item = votes[i].vote;
                t.push(item.toString());
            }
            const test = Array.from(new Set(t));
            const d = [];
            for(let i = 0; i < test.length; i++){
                const test2 = t.filter(value => value === test[i])
                d.push(test2);
            }
            let count = 0;
            let id = "";
            for(let i = 0; i < d.length; i++){
                if(count < d[i].length){
                    count = d[i].length;
                    id = d[i][0];
                }
            }
            console.log(id)
            const choiceWin = await db.collection('choices').findOne({_id: new ObjectId(id)});
            console.log(choiceWin)

            poolExist.result = {title: choiceWin.title, count: count}
            console.log(poolExist)
        }
        
        res.status(200).send(poolExist);
    } catch (error) {
        res.sendStatus(500);
    }

}
        