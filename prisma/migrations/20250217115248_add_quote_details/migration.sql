/*
  Warnings:

  - Added the required column `coInsurance` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coInsuranceCap` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverageFee` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductible` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumInsured` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Quote" ADD COLUMN     "coInsurance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coInsuranceCap" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coverageFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deductible" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deductiblesData" JSONB,
ADD COLUMN     "isMultipleDeductible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "membersData" JSONB,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "sumInsured" DOUBLE PRECISION NOT NULL;
