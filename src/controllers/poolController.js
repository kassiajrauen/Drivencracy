import db from '../db.js';
import joi from 'joi';

const poolSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().required(),
});

export async function createPool(req, res) {
    const pool = req.body;

    const validate = poolSchema.validate(pool);
    
    if(validate.error){
        res.sendStatus(422)
    }

    try{
        const newPool = await db.collection('pools').insertOne(pool);
            if(newPool){
                res.sendStatus(201)
                return;
            }else(
                res.sendStatus(401)      
            )
        }catch(error){
            res.sendStatus(500);
        }
    
}

export async function getPool(req, res) {
    try {
        const pools = await db.collection('pools').find({}).toArray();
            if(pools){
                console.log(pools);
                res.status(200).send(pools);
            }
        
    } catch (error) {
        res.sendStatus(500)
    }
}