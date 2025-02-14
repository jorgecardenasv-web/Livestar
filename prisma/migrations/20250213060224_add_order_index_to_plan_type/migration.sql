-- AlterTable
ALTER TABLE "public"."Plan" ALTER COLUMN "deductibles" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."PlanType" ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;
