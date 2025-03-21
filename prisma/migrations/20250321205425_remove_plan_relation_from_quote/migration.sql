/*
  Warnings:

  - You are about to drop the column `planId` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `planData` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Quote" DROP CONSTRAINT "Quote_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quote" DROP CONSTRAINT "Quote_prospectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrackingNumber" DROP CONSTRAINT "TrackingNumber_quoteId_fkey";

-- AlterTable
ALTER TABLE "public"."Quote" DROP COLUMN "planId",
ADD COLUMN     "planData" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrackingNumber" ADD CONSTRAINT "TrackingNumber_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
