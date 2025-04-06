export class InvoiceAlreadyExists extends Error {
  constructor() {
    super("Invoice already exists");
  }
}
