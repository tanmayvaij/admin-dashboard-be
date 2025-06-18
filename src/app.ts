import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { rootRouter } from "./routes";

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", rootRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Admin Dashboard Backend start on port ${PORT}`);
});
