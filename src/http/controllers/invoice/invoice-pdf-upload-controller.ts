import { PrismaInvoiceRepository } from '@/repositories/prisma/prisma-invoice-repository';
import { InvoicePdfUploadService } from '@/services/invoiceUpload/invoice-pdf-upload-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const invoiceUploadSchema = z.object({
  fileName: z.string(),
  filePath: z.string(),
});

export const InvoicePdfUploadController = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.file) {
      return response.status(400).json({
        error: 'File upload failed.',
      });
    }

    const validatedData = invoiceUploadSchema.parse({
      fileName: request.file.filename,
      filePath: request.file.path,
    });

    const invoicePdfUploadService = new InvoicePdfUploadService(
      new PrismaInvoiceRepository()
    );
    const { pdf } = await invoicePdfUploadService.execute(validatedData);

    return response.status(201).json(pdf);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'Validation error.',
        details: error.errors,
      });
    }
    console.log(error)
    return response.status(500).json({
      error: 'Internal server error.',
    });
  }
};
