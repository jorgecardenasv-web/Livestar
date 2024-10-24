-- CreateTable
CREATE TABLE "public"."MedicalHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_uuid_key" ON "public"."MedicalHistory"("uuid");

-- AddForeignKey
ALTER TABLE "public"."MedicalHistory" ADD CONSTRAINT "MedicalHistory_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "public"."Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
