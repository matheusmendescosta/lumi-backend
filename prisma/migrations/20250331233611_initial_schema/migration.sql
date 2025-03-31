-- CreateTable
CREATE TABLE "basicInvoiceInformation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "installationNumber" TEXT NOT NULL,
    "mouthReference" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentValue" DOUBLE PRECISION NOT NULL,
    "class" TEXT NOT NULL,
    "subclass" TEXT NOT NULL,
    "modalityTariff" TEXT NOT NULL,
    "readingBefore" TEXT NOT NULL,
    "readingCurrent" TEXT NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "nextReading" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basicInvoiceInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoicedValues" (
    "id" TEXT NOT NULL,
    "invoiceItems" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "valueUnit" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "pisCofins" TEXT NOT NULL,
    "baseCalculationICMS" TEXT NOT NULL,
    "aliquotICMS" TEXT NOT NULL,
    "ICMS" TEXT NOT NULL,
    "rateUnit" DOUBLE PRECISION NOT NULL,
    "basicInvoiceInformationId" TEXT NOT NULL,

    CONSTRAINT "invoicedValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoicedValues" ADD CONSTRAINT "invoicedValues_basicInvoiceInformationId_fkey" FOREIGN KEY ("basicInvoiceInformationId") REFERENCES "basicInvoiceInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
