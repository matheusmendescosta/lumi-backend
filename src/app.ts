import express from "express";
import routerInvoice from "./http/controllers/invoice/route";

const app = express();

app.use(express.json());

const baseUrl = "/api/v1/";

app.use(baseUrl + "health", (_, response) => {
  response.status(200).json({
    msg: "health",
  });
});


app.use(baseUrl, routerInvoice);

export default app;
