import db from '../db.js';
import joi from 'joi';
import dayjs from "dayjs";

const poolSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().allow(""),
});

export async function createPool(req, res) {
    let pool = req.body;
    
    const validate = poolSchema.validate(pool);
    if(validate.error){
        return res.sendStatus(422);
    }

    let date = pool.expireAt;
    if(!date){
        date = new Date(new Date().setDate(new Date().getDate() + 30));
        pool.expireAt = date;
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
                res.status(200).send(pools);
            }
        
    } catch (error) {
        res.sendStatus(500)
    }
}