"use server";

import { simplifyZodErrors } from "@/shared/utils";
import { insuranceFormSchema } from "../schemas/get-quote-schema";
import prisma from "@/lib/prisma";
//TODO: pending model in prisma scheme :D left at bottom for now
import { InsuranceForm } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getQuoteForm = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const age = formData.get("age") as string;
  const gender = formData.get("gender") as string;
  const postalCode = formData.get("postalCode") as string;
  const protectWho = formData.get("protectWho") as string;
  const partnerGender = formData.get("partnerGender") as string;
  const partnerAge = formData.get("partnerAge") as string;
  const children = formData.get("children") as string;
  const childrenAges = formData.get("childrenAges") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const email = formData.get("email") as string;

  const zodResult = insuranceFormSchema.safeParse({
    name,
    age: parseInt(age),
    gender,
    postalCode,
    protectWho,
    partnerGender,
    partnerAge: partnerAge ? parseInt(partnerAge) : undefined,
    children: parseInt(children),
    childrenAges: childrenAges ? childrenAges.split(',').map(Number) : undefined,
    whatsapp,
    email,
  });
  

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);

    return {
      errors: simplifiedErrors,
    };
  }

  const insuranceForm: InsuranceForm | null = await createInsuranceForm(zodResult.data);

  if (!insuranceForm) {
    return {
      errors: {
        general: "Error al enviar el formulario",
      },
    };
  }

  revalidatePath("/");
  return {
    errors: null,
  };
};

async function createInsuranceForm(data: InsuranceForm): Promise<InsuranceForm | null> {
  try {
    const formData = await prisma.insuranceForm.create({
      data: {
        ...data,
        childrenAges: data.childrenAges ? data.childrenAges.join(',') : null,
      },
    });
    return formData;
  } catch (error) {
    console.error("Error al crear el formulario:", error);
    return null;
  }
}

/* InsuranceForm
model InsuranceForm {
  id            Int      @id @default(autoincrement())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  name          String
  age           Int
  gender        String
  postalCode    String
  protectWho    String
  partnerGender String?
  partnerAge    Int?
  children      Int
  childrenAges  String?  //is separated by comma, we can change it if tgeres a better approach
  whatsapp      String
  email         String
  status        String   @default("pending") //i think that theres already a status in prisma schema
  notes         String?
} */