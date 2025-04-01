import { Prisma, PDFFile } from '@prisma/client';
import { InvoiceRepository } from '../invoice-repository';
import { prisma } from '@/lib/prisma';

export class PrismaInvoiceRepository implements InvoiceRepository {
  async create(data: Prisma.PDFFileCreateInput): Promise<PDFFile> {
    const pdf = await prisma.pDFFile.create({ data });

    return pdf;
  }
}
