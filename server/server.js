import express from "express";
import cors from "cors";
// const records = require('../server/routes/record.js')
import agents from "./routes/agent.routes.js"
import login from "./routes/login.routes.js"
import transaction from "./routes/transaction.routes.js"
import session from "./routes/session.route.js"
import user from "./routes/user.routes.js"
import openMongoConnection from "./db/connection.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/record", records);
app.use("/login", login)
app.use("/admin", agents)
app.use("/transaction", transaction)
app.use("/session", session)
app.use("/users", user)


openMongoConnection()
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});