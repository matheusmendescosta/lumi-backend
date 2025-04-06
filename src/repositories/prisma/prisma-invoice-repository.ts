import { prisma } from "@/lib/prisma";
import { basicInvoiceInformation, PDFFile, Prisma } from "@prisma/client";
import { InvoiceRepository } from "../invoice-repository";

const mouthOrder = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export class PrismaInvoiceRepository implements InvoiceRepository {
  async findByMonthReferenceOrder(): Promise<basicInvoiceInformation[]> {
    const invoices = await prisma.basicInvoiceInformation.findMany({
      select: {
        id: true,
        name: true,
        clientNumber: true,
        installationNumber: true,
        mouthReference: true,
        dueDate: true,
        paymentValue: true,
        invoiceItems: true,
      },
    });
    const invoiceOrder = invoices.sort((a, b) => {
      const [mouthA, yearA] = a.mouthReference.split("/");
      const [mouthB, yearB] = b.mouthReference.split("/");

      const indexA = mouthOrder.indexOf(mouthA?.toUpperCase() || "");
      const indexB = mouthOrder.indexOf(mouthB?.toUpperCase() || "");

      const anoNumA = parseInt(yearA);
      const anoNumB = parseInt(yearB);

      if (isNaN(anoNumA) || isNaN(anoNumB) || indexA === -1 || indexB === -1) {
        return 0;
      }

      if (anoNumA !== anoNumB) {
        return anoNumA - anoNumB;
      }

      return indexA - indexB;
    });

    return invoiceOrder;
  }

  async findByDueDate(
    dueDate: string
  ): Promise<basicInvoiceInformation | null> {
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
