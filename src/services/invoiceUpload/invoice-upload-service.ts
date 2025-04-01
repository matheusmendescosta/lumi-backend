import { InvoiceRepository } from "@/repositories/invoice-repository";
import { basicInvoiceInformation } from "@prisma/client";
import pdf from "pdf-parse";

interface InvoiceUploadServiceRequest {
  invoiceData: Buffer;
}

interface InvoiceUploadServiceResponse {
  success: boolean;
  message: string;
}

export class InvoiceUploadService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute({
    invoiceData,
  }: InvoiceUploadServiceRequest): Promise<InvoiceUploadServiceResponse> {
    try {
      // Extrair texto do PDF
      const data = await pdf(invoiceData);
      const extractedInfo = this.parseInvoiceData(data.text);

      if (!extractedInfo) {
        return {
          success: false,
          message: "Não foi possível extrair os dados da conta de energia.",
        };
      }

      // Salvar os dados no banco
      await this.invoiceRepository.create(extractedInfo);

      return {
        success: true,
        message: "Fatura processada e salva com sucesso.",
      };
    } catch (error) {
      console.error("Erro ao processar o PDF:", error);
      return { success: false, message: "Erro ao processar o PDF." };
    }
  }

  private parseInvoiceData(text: string): basicInvoiceInformation | null {
    // Exemplo de regex para extrair informações (ajuste conforme o layout do PDF)
    const regexName = /Nome:\s+(.+)/;
    const regexClientNumber = /Número do Cliente:\s+(\d+)/;
    const regexInstallationNumber = /Número da Instalação:\s+(\d+)/;
    const regexMonthReference = /Mês de Referência:\s+(\d{2}\/\d{4})/;
    const regexDueDate = /Vencimento:\s+(\d{2}\/\d{2}\/\d{4})/;
    const regexPaymentValue = /Total a pagar: R\$(\d+,\d{2})/;
    const regexClass = /Classe:\s+(.+)/;
    const regexSubclass = /Subclasse:\s+(.+)/;
    const regexModalityTariff = /Modalidade Tarifária:\s+(.+)/;
    const regexReadingBefore = /Leitura Anterior:\s+(\d+)/;
    const regexReadingCurrent = /Leitura Atual:\s+(\d+)/;
    const regexTotalDays = /Total de Dias:\s+(\d+)/;
    const regexNextReading = /Próxima Leitura:\s+(\d{2}\/\d{2}\/\d{4})/;

    const name = regexName.exec(text)?.[1] || "";
    const clientNumber = regexClientNumber.exec(text)?.[1] || "";
    const installationNumber = regexInstallationNumber.exec(text)?.[1] || "";
    const mouthReference = regexMonthReference.exec(text)?.[1] || "";
    const dueDate = regexDueDate.exec(text)?.[1] || "";
    const paymentValue = parseFloat(
      regexPaymentValue.exec(text)?.[1]?.replace(",", ".") || "0"
    );
    const classType = regexClass.exec(text)?.[1] || "";
    const subclass = regexSubclass.exec(text)?.[1] || "";
    const modalityTariff = regexModalityTariff.exec(text)?.[1] || "";
    const readingBefore = regexReadingBefore.exec(text)?.[1] || "";
    const readingCurrent = regexReadingCurrent.exec(text)?.[1] || "";
    const totalDays = parseInt(regexTotalDays.exec(text)?.[1] || "0");
    const nextReading = regexNextReading.exec(text)?.[1] || "";

    if (!clientNumber || !installationNumber || !dueDate) {
      return null; // Retorna nulo se informações essenciais não forem encontradas
    }

    return {
      name,
      clientNumber,
      installationNumber,
      mouthReference,
      dueDate,
      paymentValue,
      class: classType,
      subclass,
      modalityTariff,
      readingBefore,
      readingCurrent,
      totalDays,
      nextReading,
      invoicedValues: undefined, // Pode ser preenchido depois se necessário
    };
  }
}
