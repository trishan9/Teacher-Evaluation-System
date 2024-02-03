import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import config from "./config";
import router from "./modules/main.router";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(session(config.session));

app.use(express.json());

app.use("/api", router);

app.listen(config.app.port, () =>
  console.log(`Listening on port ${config.app.port}`),
);
