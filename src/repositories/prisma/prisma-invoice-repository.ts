import { prisma } from '@/lib/prisma';
import { PDFFile, Prisma } from '@prisma/client';
import { InvoiceRepository } from '../invoice-repository';

export class PrismaInvoiceRepository implements InvoiceRepository {
  async create(data: Prisma.PDFFileCreateInput): Promise<PDFFile> {
    const pdf = await prisma.pDFFile.create({
      data: {
        fileName: data.fileName,
        content: data.content,
      },
    });

    return pdf;
  }
}
