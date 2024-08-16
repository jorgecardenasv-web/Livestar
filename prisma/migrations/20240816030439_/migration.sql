-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ADVISOR');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_REVIEW', 'BLACKLISTED');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "ProspectStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'CONVERTED', 'LOST', 'INACTIVE');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'REVISED');

-- CreateEnum
CREATE TYPE "TrackingNumberStatus" AS ENUM ('ACTIVE', 'CLOSED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCompany" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePlan" (
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
    "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospect" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "postalCode" TEXT,
    "advisorId" INTEGER,
    "status" "ProspectStatus" NOT NULL DEFAULT 'NEW',
    "additionalInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "customizations" JSONB,
    "totalPrice" DOUBLE PRECISION,
    "status" "QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingNumber" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "quoteId" INTEGER,
    "status" "TrackingNumberStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackingNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_uuid_key" ON "InsuranceCompany"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePlan_uuid_key" ON "InsurancePlan"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_uuid_key" ON "Prospect"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_uuid_key" ON "Quote"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_uuid_key" ON "TrackingNumber"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_number_key" ON "TrackingNumber"("number");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingNumber_quoteId_key" ON "TrackingNumber"("quoteId");

-- AddForeignKey
ALTER TABLE "InsurancePlan" ADD CONSTRAINT "InsurancePlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "InsuranceCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_planId_fkey" FOREIGN KEY ("planId") REFERENCES "InsurancePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingNumber" ADD CONSTRAINT "TrackingNumber_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingNumber" ADD CONSTRAINT "TrackingNumber_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
