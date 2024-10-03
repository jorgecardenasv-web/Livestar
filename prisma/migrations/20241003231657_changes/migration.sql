/*
  Warnings:

  - Added the required column `additionalClauses` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalTier` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalFeeSchedule` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `InsurancePlan` table without a default value. This is not possible if the table is not empty.
  - Made the column `sumInsured` on table `InsurancePlan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deductible` on table `InsurancePlan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coInsurance` on table `InsurancePlan` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."HospitalTier" AS ENUM ('BASIC', 'INTERMEDIATE', 'EXECUTIVE', 'PLUS');

-- CreateEnum
CREATE TYPE "public"."MedicalFeeSchedule" AS ENUM ('BASIC', 'INTERMEDIATE', 'HIGH', 'EXECUTIVE');

-- AlterTable
ALTER TABLE "public"."InsurancePlan" ADD COLUMN     "additionalClauses" JSONB NOT NULL,
ADD COLUMN     "hospitalTier" "public"."HospitalTier" NOT NULL,
ADD COLUMN     "medicalFeeSchedule" "public"."MedicalFeeSchedule" NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "sumInsured" SET NOT NULL,
ALTER COLUMN "deductible" SET NOT NULL,
ALTER COLUMN "coInsurance" SET NOT NULL;
