// import path from "path";
import express from "express";
import morgan from "morgan";
import { PORT } from "./env.js";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(logger);

import memHandler from "./handler/memory.js";
app.use("/api/memory",memHandler);
import membersHandler from "./handler/members.js";
app.use("/api/members",membersHandler);
app.listen(PORT, () => {
  console.log("启动成功", PORT);
});