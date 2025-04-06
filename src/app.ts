import express from "express";
import routerInvoice from "./http/controllers/invoice/route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const baseUrl = "/api/v1/";

app.use(baseUrl + "health", (_, response) => {
  response.status(200).json({
    msg: "health",
  });
});

app.use(baseUrl, routerInvoice);

export default app;
