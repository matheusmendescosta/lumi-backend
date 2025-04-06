import { PrismaInvoiceRepository } from "@/repositories/prisma/prisma-invoice-repository";
import { listMouthReferenceService } from "@/services/invoiceUpload/list-mouth-reference-service";
import { Request, Response } from "express";

export async function listMouthReferenceController(
  request: Request,
  response: Response
) {
  const listMouthReference = new listMouthReferenceService(
    new PrismaInvoiceRepository()
  );
  const invoices = await listMouthReference.execute();

  return response.status(200).json(invoices);
}
