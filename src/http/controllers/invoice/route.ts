// src/routes/invoice.routes.ts
import { upload } from "@/lib/multer";
import { Router } from "express";
import { InvoicePdfUploadController } from "./invoice-pdf-upload-controller";
import { listInvoiceController } from "./list-invoice-controller";

const routerInvoice = Router();

routerInvoice.post(
  "/upload",
  upload.single("file"),
  InvoicePdfUploadController
);

routerInvoice.get("/list", listInvoiceController);

export default routerInvoice;
