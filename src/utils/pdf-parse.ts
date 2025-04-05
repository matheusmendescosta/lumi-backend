import fs from "fs";
import pdf from "pdf-parse";

export async function parsePDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

export function extractClientNumber(text: string) {
  const firstMatch = text.match(/(instalação)(\n| |[0-9])+(Referente)/i)?.at(0);

  if (!firstMatch) return "";

  const clientNumber = firstMatch.match(/[0-9]+/g)?.at(0);

  if (!clientNumber) return "";

  return clientNumber;
}

export function extractInstallNumber(text: string) {
  const firstMatch = text.match(/(instalação)(\n| |[0-9])+(Referente)/i)?.at(0);

  if (!firstMatch) return "";

  const installNumber = firstMatch.match(/[0-9]+/g)?.at(1);

  if (!installNumber) return "";

  return installNumber;
}

export function extractReferenceMonth(text: string) {
  return text
    .match(/(Referente)(.|\n)*(NOTA FISCAL N)/)
    ?.at(0)
    ?.match(/([A-Z]{3}\/[0-9]{4})/)
    ?.at(0);
}

export function extractTotalPayment(text: string) {
  return text
    .match(/(Referente)(.|\n)*(NOTA FISCAL N)/)
    ?.at(0)
    ?.match(/\d+,\d{2}/)
    ?.at(0);
}

export function extractDueDate(text: string) {
  return text
    .match(/(Referente)(.|\n)*(NOTA FISCAL N)/)
    ?.at(0)
    ?.match(/\d{2}\/\d{2}\/\d{4}/)
    ?.at(0);
}

export function extractInvoiceItems(text: string) {
  const rawSection = text.match(/(Valores Faturados)(.|\n)*(DiaDias)/)?.at(0);

  if (!rawSection) return null;

  const lines = rawSection
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line !== "" &&
        !line.startsWith("Valores Faturados") &&
        !line.startsWith("DiaDias")
    );

  const items = [];

  for (const line of lines) {
    if (line.toUpperCase().includes("TOTAL")) continue;

    const matches = line.match(/-?\d+,\d{2}/g);
    if (!matches) continue;

    const valor = parseFloat(matches.at(-1)!.replace(",", "."));
    const quant = matches.length >= 4 ? parseInt(matches[0]) : null;
    const precoUnit =
      matches.length >= 4 ? parseFloat(matches[1].replace(",", ".")) : null;
    const pisCofins =
      matches.length >= 4 ? parseFloat(matches[3].replace(",", ".")) : null;

    const nomeItem = line.split(/kWh| \d{1,3} /)[0].trim();
    const unid = line.includes("kWh") ? "kWh" : null;

    items.push({
      item: nomeItem,
      unid,
      quant,
      precoUnit,
      valor,
      pisCofins,
    });
  }

  const totalMatch = rawSection.match(/TOTAL\s+(\d+,\d{2})/);
  const total = totalMatch ? parseFloat(totalMatch[1].replace(",", ".")) : null;

  return { items, total };
}
