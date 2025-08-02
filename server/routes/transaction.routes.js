import express from 'express';
import transactionSchema from '../db/schemas/transactions.Schema.js';
import agentSchema from "../db/schemas/agent.Schema.js";
import { ObjectId } from 'mongodb';


const router = express.Router();

router.get('/transaction-data', async (req, res) => {
    let data = {};
  try {
    const transactions = await transactionSchema.find().sort({createdAt: -1}).limit(10)
    data["transactions"] = transactions
    const agents = await agentSchema.find()
    data["agents"]=agents

    res.json({
      status: 'ok',
      data: data,
      message: null
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction data', error: error.message });
  }
});

router.post('/transaction', async (req, res) => {
  const { amount, agent_id } = req.body;

  try {
    const transaction = { amount, agentId: agent_id };
    const theTransaction = await transactionSchema.insertOne(transaction)
    res.json({ status: 'ok', data: theTransaction, message: null });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const deleted = await transactionSchema.deleteOne(query)

    res.send(deleted).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;