import express from 'express';
import dotenv from 'dotenv';
import routerInvoice from './http/controllers/invoice/route';

dotenv.config();

const app = express();

app.use(express.json());

const baseUrl = '/api/v1/';

app.use(baseUrl + 'health', (req, res) => {
  res.status(200).json({
    msg: 'health',
  });
});

app.use(baseUrl + routerInvoice);

export default app;
