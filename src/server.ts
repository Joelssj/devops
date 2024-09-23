import { Signale } from "signale";
import express from "express";
import { usersRouter } from "./Users/infrastructure/api-rest/routes/UsersRouter";
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());
app.use(cors());
app.use("/user", usersRouter);
const port = 3010;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});
