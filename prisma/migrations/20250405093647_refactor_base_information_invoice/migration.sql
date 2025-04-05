/*
  Warnings:

  - You are about to drop the column `ICMS` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `aliquotICMS` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `baseCalculationICMS` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `modalityTariff` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `nextReading` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `pisCofins` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `rateUnit` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `readingBefore` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `readingCurrent` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `subclass` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `totalDays` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `valueUnit` on the `basicInvoiceInformation` table. All the data in the column will be lost.
  - Changed the type of `invoiceItems` on the `basicInvoiceInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "basicInvoiceInformation" DROP COLUMN "ICMS",
DROP COLUMN "aliquotICMS",
DROP COLUMN "amount",
DROP COLUMN "baseCalculationICMS",
DROP COLUMN "class",
DROP COLUMN "modalityTariff",
DROP COLUMN "nextReading",
DROP COLUMN "pisCofins",
DROP COLUMN "rateUnit",
DROP COLUMN "readingBefore",
DROP COLUMN "readingCurrent",
DROP COLUMN "subclass",
DROP COLUMN "totalDays",
DROP COLUMN "unit",
DROP COLUMN "value",
DROP COLUMN "valueUnit",
DROP COLUMN "invoiceItems",
ADD COLUMN     "invoiceItems" JSONB NOT NULL;
