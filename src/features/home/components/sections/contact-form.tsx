"use client";

import { ChangeEvent, HTMLAttributes, useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { handleContact } from "../../actions/contactForm-action";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup } from "@/shared/components/inputs/radio-group";
import { Mail, Phone } from "lucide-react";
import { FormError } from "@/shared/types";

const inputConfig: Record<string, { 
  placeholder: string;
  type: "text" | "email" | "tel";
  icon: JSX.Element;
  inputMode: "email" | "search" | "text" | "numeric" | "tel" | "url" | "none" | "decimal";
  pattern: string;
}> = {
  email: {
    placeholder: "Correo Electrónico",
    icon: <Mail className="text-gray-400" />,
    type: "email",
    inputMode: "email",
    pattern: ""
  },
  phone: {
    placeholder: "Número de Teléfono",
    icon: <Phone className="text-gray-400" />,
    type: "tel",
    inputMode: "tel",
    pattern: "[0-9]*"
  },
};

export const ContactForm = () => {
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [error, setError] = useState<FormError>({});

  const onSubmit = async (formData: FormData) => {
    const handleError = await handleContact(formData) || {};
    setError(handleError)
  }

  return (
    <section className="relative w-full text-black my-16 flex justify-center">
      <div className="w-2/4 text-center">
        <h2 className="text-4xl font-bold text-wrap text-gradiant mb-8">
          CONTÁCTANOS
        </h2>
        <Card>
          <CardContent className="space-y-6 p-6">
            <form action={onSubmit}>
              <TextInput required={true} placeholder="Nombre(s)" name="name" />
              <div className="w-2/4 mt-4">
                <RadioGroup
                  label="Tipo de contacto"
                  name="contactType"
                  position="row"
                  defaultValue="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setContactType(e.target?.value as 'email' | 'phone')
                  }
                  options={[
                    { label: "Correo Electronico", value: "email" },
                    { label: "Número de Teléfono", value: "phone" },
                  ]}
                ></RadioGroup>
              </div>
              <div className="mt-5 mb-4">
                <TextInput
                  required
                  placeholder={inputConfig[contactType].placeholder}
                  type={inputConfig[contactType].type}
                  name={"contactMethod"}
                  error={error?.contactMethod}
                  icon={inputConfig[contactType].icon}
                  inputMode={inputConfig[contactType].inputMode}
                  pattern={inputConfig[contactType].pattern}
                />
              </div>
              <Textarea className="w-full" name="comment"></Textarea>
              <SubmitButton
                className="w-full mt-4"
                label="Enviar"
                labelPending="Enviando..."
              ></SubmitButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};