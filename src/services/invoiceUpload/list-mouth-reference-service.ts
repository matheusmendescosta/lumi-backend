import { InvoiceRepository } from "@/repositories/invoice-repository";
import { basicInvoiceInformation } from "@prisma/client";

export class listMouthReferenceService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(): Promise<basicInvoiceInformation[]> {
    const invoices = await this.invoiceRepository.findByMonthReferenceOrder();

    return invoices;
  }
}
