import { prisma } from "@/lib/prisma";
import { basicInvoiceInformation, PDFFile, Prisma } from "@prisma/client";
import { InvoiceRepository } from "../invoice-repository";

export class PrismaInvoiceRepository implements InvoiceRepository {
  async findByDueDate(dueDate: string): Promise<basicInvoiceInformation | null>  {
    const invoice = await prisma.basicInvoiceInformation.findFirst({
      where: {
        dueDate: dueDate,
      },
    });

    return invoice;
  }
  
  async list(): Promise<basicInvoiceInformation[]> {
    const pdfs = await prisma.basicInvoiceInformation.findMany();

    return pdfs;
  }

  async createBasicInformation(
    data: Prisma.basicInvoiceInformationCreateInput
  ): Promise<basicInvoiceInformation> {
    const basicInformation = await prisma.basicInvoiceInformation.create({
      data,
    });

    return basicInformation;
  }

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
