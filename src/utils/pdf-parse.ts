import fs from 'fs';
import pdf from 'pdf-parse';

export async function parsePDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

export function extractClientNumber(text: string): string | null {
  const match = text.match(/N[º°oO]?\s*DO\s*CLIENTE[\s:\-]*\n*\s*(\d{6,})/i);

  return match ? match[1] : null;
}
