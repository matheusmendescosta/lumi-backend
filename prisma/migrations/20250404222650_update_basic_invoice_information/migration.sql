/*
  Warnings:

  - You are about to drop the `invoicedValues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ICMS` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aliquotICMS` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseCalculationICMS` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceItems` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pisCofins` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateUnit` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueUnit` to the `basicInvoiceInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoicedValues" DROP CONSTRAINT "invoicedValues_basicInvoiceInformationId_fkey";

-- AlterTable
ALTER TABLE "basicInvoiceInformation" ADD COLUMN     "ICMS" TEXT NOT NULL,
ADD COLUMN     "aliquotICMS" TEXT NOT NULL,
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "baseCalculationICMS" TEXT NOT NULL,
ADD COLUMN     "invoiceItems" TEXT NOT NULL,
ADD COLUMN     "pisCofins" TEXT NOT NULL,
ADD COLUMN     "rateUnit" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ADD COLUMN     "valueUnit" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
ALTER COLUMN "paymentValue" SET DATA TYPE TEXT,
ALTER COLUMN "totalDays" SET DATA TYPE TEXT,
ALTER COLUMN "nextReading" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "invoicedValues";
