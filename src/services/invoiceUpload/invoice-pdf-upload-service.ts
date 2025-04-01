import { InvoiceRepository } from '@/repositories/invoice-repository';
import { parsePDF } from '@/utils/pdf-parse';
import { PDFFile } from '@prisma/client';

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
    const content = await parsePDF(filePath);

    const pdf = await this.invoiceRepository.create({
      fileName,
      content,
    });

    return { pdf };
  }
}
