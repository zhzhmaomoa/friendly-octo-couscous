import 'dotenv/config'
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { init as initDB } from "./model/initDb.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//统一数据返回格式
app.use((req,res,next)=>{
  res.succ = ((data='',message='成功')=>{
    res.send({
      code:200,
      message,
      data
    })
  });
  res.fail = ((err='',message="失败")=>{
    res.send({
      code:500,
      message,
      err
    })
  });
  next();
})
import membersHandler from "./handler/membersHandler.js";
app.use("/api/members",membersHandler);
import contributionsHandler from "./handler/contributionsHandler.js";
app.use("/api/contributions",contributionsHandler);
import memHandler from "./handler/memHandler.js";
app.use("/api/memory",memHandler);
const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
