// src/controllers/invoice.controller.ts
import { PrismaInvoiceRepository } from "@/repositories/prisma/prisma-invoice-repository";
import { InvoicePdfUploadService } from "@/services/invoiceUpload/invoice-pdf-upload-service";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

const invoiceUploadSchema = z.object({
  fileName: z.string().min(1, "O nome do arquivo é obrigatório."),
  filePath: z.string().min(1, "O caminho do arquivo é obrigatório."),
});

export const InvoicePdfUploadController = async (
  request: Request,
  response: Response
) => {
  try {
    console.log("📂 Arquivo recebido:", request.file); // Log para depuração

    if (!request.file) {
      return response.status(400).json({
        error: "Nenhum arquivo enviado.",
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

    return response.status(201).json({
      message: "Arquivo PDF enviado com sucesso.",
      pdf,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: "Erro de validação",
        details: error.errors,
      });
    }

    return response.status(500).json({
      error: "Erro interno do servidor.",
    });
  }
};
