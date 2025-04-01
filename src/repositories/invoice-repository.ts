import { Prisma } from "@prisma/client";

export interface InvoiceRepository {
  create(
    data: Prisma.basicInvoiceInformationCreateInput
  ): Promise<Prisma.basicInvoiceInformationCreateInput>;
}
