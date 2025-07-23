import express from "express";
import agentSchema from "../db/schemas/agent.Schema.js";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/", async (req, res) => {

    const agents = await agentSchema.find({})
    res.send(agents).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {

  let query = { _id: new ObjectId(req.params.id) };

    const agent = await agentSchema.findOne(query)

  if (!agent) res.send("Not found").status(404);
  else res.send(agent).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      region: req.body.region,
      rating: req.body.rating,
      fee: req.body.fee
    };

    const agent = agentSchema.create(newDocument)
    res.send(agent).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        region: req.body.region,
        rating: req.body.rating,
        fee: req.body.fee
      },
    };

    const agent = agentSchema.updateOne(query, updates)
    res.send(agent).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const agent = await agentSchema.deleteOne(query)

    res.send(agent).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;