import { Prisma, PDFFile, basicInvoiceInformation } from "@prisma/client";

export interface InvoiceRepository {
  create(data: Prisma.PDFFileCreateInput): Promise<PDFFile>;

  createBasicInformation(
    data: Prisma.basicInvoiceInformationCreateInput
  ): Promise<basicInvoiceInformation>;

  list(): Promise<basicInvoiceInformation[]>;
}
