import fs from 'fs';
import pdf from 'pdf-parse';

export async function parsePDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

export function extractClientNumber(text: string): string | null {
  const match = text.match(/Nº DO CLIENTE\s+(\d+)/i);

  return match ? match[1] : null;
}

export function extractPaymentAmount(text: string): string | null {
  const match = text.match(/Valor a pagar.*?\n.*?(\d{1,3}(?:\.\d{3})*,\d{2})/i);

  return match ? match[1] : null;
}

export function extractInstallationNumber(text: string): string | null {
  const match = text.match(/Nº DA INSTALAÇÃO\s+(\d+)/i);

  return match ? match[1] : null;
}

export function extractBilledValues(text: string): string {
  const regex =
    /(Energia Elétrica|Energia SCEE s\/ ICMS|Energia compensada GD I|Contrib Ilum Publica Municipal)\s+(\w+)?\s*(\d+)?\s*([\d.,]+)?\s*([\d.,-]+)?\s*([\d.,-]+)?/g;
  const matches = text.matchAll(regex);

  let result = 'Itens Faturados:\n';

  for (const match of matches) {
    const item = match[1];
    const unit = match[2] || '';
    const quantity = match[3] ? match[3] : '';
    const unitPrice = match[4] ? match[4].replace(',', '.') : '';
    const totalValue = match[5] ? match[5].replace(',', '.') : '';
    const pisCofins = match[6] ? match[6].replace(',', '.') : '';

    result += `${item} ${unit} ${quantity} ${unitPrice} ${totalValue} ${pisCofins}\n`;
  }

  return result;
}
