import { PrismaInvoiceRepository } from "@/repositories/prisma/prisma-invoice-repository";
import { ListInvoiceService } from "@/services/invoiceUpload/list-invoice-service";
import { Request, Response } from "express";

export async function listInvoiceController(
  request: Request,
  response: Response
) {
  const listInvoice = new ListInvoiceService(new PrismaInvoiceRepository());
  const invoices = await listInvoice.execute();

  return response.status(200).json(invoices);
}
