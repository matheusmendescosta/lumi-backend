import { Prisma, PDFFile } from '@prisma/client';

export interface InvoiceRepository {
  create(data: Prisma.PDFFileCreateInput): Promise<PDFFile>;
}
