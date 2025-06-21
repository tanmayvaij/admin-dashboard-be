import express from "express";
import cors from "cors";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";

import { rootRouter } from "./routes";
import { rateLimiter } from "./middlewares";
import { swaggerSpec } from "./docs/swagger";

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", rateLimiter, rootRouter);

app.listen(5000, () => {
  console.log("Admin Dashboard Backend start on port 5000");
});
