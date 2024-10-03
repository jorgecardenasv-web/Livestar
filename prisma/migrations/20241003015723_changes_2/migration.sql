/*
  Warnings:

  - You are about to drop the column `lastAssignmentDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."User" DROP COLUMN "lastAssignmentDate",
ADD COLUMN     "lastProspectAssigned" TIMESTAMP(3),
ALTER COLUMN "role" DROP DEFAULT;
