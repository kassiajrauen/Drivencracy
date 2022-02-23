import db from "../db.js";
import { ObjectId } from "mongodb";

export async function vote(req, res) {
  const idChoice = req.params.id;
  let choiceExist;

  try {
    const id = new ObjectId(idChoice);
    choiceExist = await db.collection("choices").findOne({ _id: id });
    if (!choiceExist) {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }

  try {
    const insertVote = await db.collection("votes").insertOne({
      vote: idChoice,
      date: Date.now(),
      poolId: choiceExist.poolId,
    });
    if (insertVote) {
      res.sendStatus(201);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
