import db from "../db.js";
import joi from "joi";
import { ObjectId } from "mongodb";

const choiceSchema = joi.object({
  title: joi.string().required(),
  poolId: joi.string().required(),
});

export async function createChoice(req, res) {
  const choice = req.body;
  let poolExist;

  const validate = choiceSchema.validate(choice);

  if (validate.error) {
    return res.sendStatus(422);
  }

  try {
    const id = ObjectId(choice.poolId);
    poolExist = await db.collection("pools").findOne({ _id: id });

    if (!poolExist) {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }

  try {
    if (new Date(poolExist.expireAt) < new Date()) {
      return res.sendStatus(403);
    }

    const titleExist = await db
      .collection("choices")
      .findOne({ title: choice.title });
    if (titleExist) {
      res.sendStatus(409);
      return;
    }

    const choices = await db.collection("choices").insertOne(choice);
    if (choices) {
      res.sendStatus(201);
      return;
    } else res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getChoice(req, res) {
  const idPool = req.params.id;

  try {
    const choices = await db
      .collection("choices")
      .find({ poolId: idPool })
      .toArray();
    if (choices.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(choices);
  } catch (error) {
    return res.sendStatus(500);
  }
}
