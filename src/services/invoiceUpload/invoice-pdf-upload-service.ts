import { InvoiceRepository } from "@/repositories/invoice-repository";
import {
  extractClientNumber,
  extractDueDate,
  extractInstallNumber,
  extractInvoiceItems,
  extractReferenceMonth,
  extractTotalPayment,
  parsePDF,
} from "@/utils/pdf-parse";
import { PDFFile } from "@prisma/client";
import { NumberClientNotFound } from "../errors/number-client-not-found";

interface InvoicePdfUploadServiceRequest {
  fileName: string;
  filePath: string;
}

interface InvoicePdfUploadServiceResponse {
  pdf: PDFFile;
}

export class InvoicePdfUploadService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute({
    fileName,
    filePath,
  }: InvoicePdfUploadServiceRequest): Promise<InvoicePdfUploadServiceResponse> {
    const text = await parsePDF(filePath);

    const clientNumber = extractClientNumber(text);
    if (!clientNumber) throw new NumberClientNotFound();

    const installNumber = extractInstallNumber(text);
    if (!installNumber) throw new Error("NumberClientNotFound");

    const referenceMonth = extractReferenceMonth(text);
    if (!referenceMonth) throw new Error("ReferenceMonthNotFound");

    const paymentValue = extractTotalPayment(text);
    if (!paymentValue) throw new Error("DueDateNotFound");

    const dueDate = extractDueDate(text);
    if (!dueDate) throw new Error("DueDateNotFound");

    const invoiceItems = extractInvoiceItems(text);
    if (!invoiceItems) throw new Error("InvoiceItemsNotFound");

    await this.invoiceRepository.createBasicInformation({
      name: "",
      clientNumber: clientNumber,
      installationNumber: installNumber,
      mouthReference: referenceMonth,
      dueDate: dueDate,
      paymentValue: paymentValue,
      // class: "no",
      // subclass: "no",
      // modalityTariff: "no",
      // readingBefore: "no",
      // readingCurrent: "no",
      // totalDays: "no",
      // nextReading: "no",
      invoiceItems: invoiceItems,
      // unit: "no",
      // amount: "no",
      // valueUnit: "no",
      // value: "no",
      // pisCofins: "no",
      // baseCalculationICMS: "no",
      // aliquotICMS: "no",
      // ICMS: "no",
      // rateUnit: "no",
    });

    const pdf = await this.invoiceRepository.create({
      fileName,
      content: text,
    });

    return { pdf };
  }
}
