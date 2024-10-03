-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "auth"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('ADMIN', 'ADVISOR');

-- CreateEnum
CREATE TYPE "public"."CompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_REVIEW', 'BLACKLISTED');

-- CreateEnum
CREATE TYPE "public"."PlanStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "public"."ProspectStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'CONVERTED', 'LOST', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'REVISED');

-- CreateEnum
CREATE TYPE "public"."TrackingNumberStatus" AS ENUM ('ACTIVE', 'CLOSED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "auth"."Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "auth"."Role" NOT NULL,
    "status" "auth"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InsuranceCompany" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "status" "public"."CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InsurancePlan" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "description" TEXT,
    "sumInsured" DOUBLE PRECISION,
    "deductible" DOUBLE PRECISION,
    "coInsurance" DOUBLE PRECISION,
    "coInsuranceCap" DOUBLE PRECISION,
    "benefits" JSONB NOT NULL,
    "customizableOptions" JSONB NOT NULL,
    "status" "public"."PlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prospect" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "protectWho" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProspectAdditionalInfo" (
    "id" SERIAL NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "age" INTEGER,
    "partnerAge" INTEGER,
    "partnerGender" TEXT,
    "childrenCount" INTEGER,
    "children" JSONB,
    "momName" TEXT,
    "dadName" TEXT,
    "momAge" INTEGER,
    "dadAge" INTEGER,
    "protectedCount" INTEGER,
    "protectedPersons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProspectAdditionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quote" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "customizations" JSONB,
    "totalPrice" DOUBLE PRECISION,
    "status" "public"."QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrackingNumber" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "quoteId" INTEGER,
    "status" "public"."TrackingNumberStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackingNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "auth"."User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_uuid_key" ON "public"."InsuranceCompany"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePlan_uuid_key" ON "public"."InsurancePlan"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_uuid_key" ON "public"."Prospect"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ProspectAdditionalInfo_prospectId_key" ON "public"."ProspectAdditionalInfo"("prospectId");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_uuid_key" ON "public"."Quote"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_uuid_key" ON "public"."TrackingNumber"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_number_key" ON "public"."TrackingNumber"("number");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_quoteId_key" ON "public"."TrackingNumber"("quoteId");

-- AddForeignKey
ALTER TABLE "auth"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InsurancePlan" ADD CONSTRAINT "InsurancePlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."InsuranceCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prospect" ADD CONSTRAINT "Prospect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProspectAdditionalInfo" ADD CONSTRAINT "ProspectAdditionalInfo_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."InsurancePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrackingNumber" ADD CONSTRAINT "TrackingNumber_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrackingNumber" ADD CONSTRAINT "TrackingNumber_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
