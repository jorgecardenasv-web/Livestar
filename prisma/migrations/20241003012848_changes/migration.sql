/*
  Warnings:

  - You are about to drop the column `lastProspectAssigned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."User" DROP COLUMN "lastProspectAssigned";

-- AlterTable
ALTER TABLE "public"."Prospect" ADD COLUMN     "assignmentOrder" SERIAL NOT NULL;
