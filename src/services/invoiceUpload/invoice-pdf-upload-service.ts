import { InvoiceRepository } from '@/repositories/invoice-repository';
import { extractClientNumber, parsePDF } from '@/utils/pdf-parse';
import { PDFFile } from '@prisma/client';
import { NumberClientNotFound } from '../errors/number-client-not-found';

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

    const pdf = await this.invoiceRepository.create({
      fileName,
      content: clientNumber,
    });

    return { pdf };
  }
}
