import { InvoiceRepository } from "@/repositories/invoice-repository";

interface listInvoiceServiceRequest {}

interface listInvoiceServiceResponse {}

export class ListInvoiceService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(): Promise<listInvoiceServiceResponse[]> {
    const invoices = await this.invoiceRepository.list();

    return invoices;
  }
}
