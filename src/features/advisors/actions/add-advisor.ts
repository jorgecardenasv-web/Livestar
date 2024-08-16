'use server'
import { simplifyZodErrors } from "@/shared/utils";
import { addAdvisorSchema } from "../schemas/add-advisor";

export const addAdvisor = async (prevState: any, formData: FormData) => {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const name: string = formData.get("name") as string;

    const zodResult = addAdvisorSchema.safeParse({
        email,
        password,
        name
    });

    if (!zodResult.success) {
        const simplifiedErrors = simplifyZodErrors(zodResult.error);

        return {
            errors: simplifiedErrors,
        };
    }

    console.log("Email:", email);
}