import db from '../db.js';
import joi from 'joi';

const choiceSchema = joi.object({
    title: joi.string().required(),
    poolId: joi.string().required(),
});

export async function createChoice(req, res) {
    const choice = req.body;
    console.log(choice)

    const validate = choiceSchema.validate(choice);   

    if(validate.error){
        res.sendStatus(422)
    }
    
    try {
        // const poolExist = db.collection('pools').findOne({objectId: choice.poolId});

        const titleExist = await db.collection('choices').findOne({title: choice.title});
        if(titleExist){
            res.sendStatus(409);
        }
        
        const choices = await db.collection('choices').insertOne(choice);
            if(choices){
                res.sendStatus(201)
                return;
            }else(
                res.sendStatus(401)      
        )
        
    } catch (error) {
        res.sendStatus(500);
    }

} 

export async function getChoice(req, res) {
    try {
        const choices = await db.collection('choices').find({}).toArray();
            if(choices){
                console.log(choices);
                res.status(200).send(choices);
            }
        
    } catch (error) {
        res.sendStatus(500)
    }
}