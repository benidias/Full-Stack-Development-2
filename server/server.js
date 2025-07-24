import express from "express";
import cors from "cors";
// const records = require('../server/routes/record.js')
import agents from "./routes/agent.routes.js"
import login from "./routes/login.routes.js"
import openMongoConnection from "./db/connection.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/record", records);
app.use("/login", login)
app.use("/agent", agents)

openMongoConnection()
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});