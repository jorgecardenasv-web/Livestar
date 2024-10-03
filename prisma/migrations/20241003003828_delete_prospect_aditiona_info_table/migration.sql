/*
  Warnings:

  - You are about to drop the `ProspectAdditionalInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProspectAdditionalInfo" DROP CONSTRAINT "ProspectAdditionalInfo_prospectId_fkey";

-- AlterTable
ALTER TABLE "public"."Prospect" ADD COLUMN     "additionalInfo" JSONB;

-- DropTable
DROP TABLE "public"."ProspectAdditionalInfo";
