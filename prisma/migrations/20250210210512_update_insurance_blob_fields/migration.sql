-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "auth"."UserStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('ADMIN', 'ASESOR');

-- CreateEnum
CREATE TYPE "public"."InsuranceStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "public"."PlanTypeStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "public"."PlanStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "public"."QuoteStatus" AS ENUM ('NUEVO', 'CONTACTADO', 'EN_PROGRESO', 'CERRADO');

-- CreateTable
CREATE TABLE "auth"."Session" (
    "id" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "auth"."Role" NOT NULL,
    "status" "auth"."UserStatus" NOT NULL DEFAULT 'ACTIVO',
    "isNewAdvisor" BOOLEAN NOT NULL DEFAULT true,
    "lastProspectAssigned" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Insurance" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."InsuranceStatus" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlanType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."PlanTypeStatus" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" UUID NOT NULL,
    "planTypeId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "sumInsured" DOUBLE PRECISION NOT NULL,
    "coInsurance" DOUBLE PRECISION NOT NULL,
    "coInsuranceCap" DOUBLE PRECISION,
    "status" "public"."PlanStatus" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "prices" JSONB NOT NULL,
    "deductibles" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prospect" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER,
    "postalCode" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quote" (
    "id" UUID NOT NULL,
    "prospectId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" "public"."QuoteStatus" NOT NULL DEFAULT 'NUEVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "protectWho" TEXT NOT NULL,
    "additionalInfo" JSONB,
    "medicalHistories" JSONB[],
    "userId" UUID,
    "lastContactDate" TIMESTAMP(3),

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrackingNumber" (
    "id" UUID NOT NULL,
    "number" TEXT NOT NULL,
    "quoteId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityLog" JSONB,

    CONSTRAINT "TrackingNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_name_key" ON "public"."Insurance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_planTypeId_companyId_key" ON "public"."Plan"("planTypeId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_number_key" ON "public"."TrackingNumber"("number");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_quoteId_key" ON "public"."TrackingNumber"("quoteId");

-- AddForeignKey
ALTER TABLE "auth"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_planTypeId_fkey" FOREIGN KEY ("planTypeId") REFERENCES "public"."PlanType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Insurance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrackingNumber" ADD CONSTRAINT "TrackingNumber_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
