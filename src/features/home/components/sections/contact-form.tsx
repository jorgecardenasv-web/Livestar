"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { sendAndSaveContactForm } from "../../actions/contactForm-action";

export const ContactForm = () => {
  const [contactMethod, setContactMethod] = useState("mail");
  const [contactValue, setContactValue] = useState("");
  const [error, setError] = useState("");

  const handleRadioChange = (value: string) => {
    setContactMethod(value);
    setContactValue("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();

    if (contactMethod === "mail") {
      if (!email || !isValidEmail(email)) {
        setError("Por favor ingresa un Correo Electtronico valido.");
        return;
      }
    }

    if (contactMethod === "phone") {
      if (!phone || !isValidPhone(phone)) {
        setError("Por favor ingresa un Número telefonico valido.");
        return;
      }
    }

    setError("");
    await sendAndSaveContactForm(formData);
  };

  return (
    <section className="relative w-full text-black my-16 flex justify-center">
      <div className="w-2/4 text-center">
        <h2 className="text-4xl font-bold text-wrap text-gradiant mb-8">
          CONTÁCTANOS
        </h2>
        <Card>
          <CardContent className="space-y-6 p-6">
            <form onSubmit={handleSubmit}>
              <TextInput required={true} placeholder="Nombre(s)" name="name" />
              <div className="w-2/6">
                <div className="flex mt-4">
                  <label htmlFor="mail" className="text-lg">
                    Correo electrónico
                  </label>
                  <Input
                    checked={contactMethod === "mail"}
                    className="ml-1 w-8 h-8"
                    id="mail"
                    type="radio"
                    name="contactMethod"
                    value="mail"
                    onChange={() => handleRadioChange("mail")}
                  />
                </div>
                <div className="flex mt-2">
                  <label htmlFor="phone" className="text-lg">
                    Número de teléfono
                  </label>
                  <Input
                    checked={contactMethod === "phone"}
                    className="ml-1 w-8 h-8"
                    id="phone"
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    onChange={() => handleRadioChange("phone")}
                  />
                </div>
              </div>
              <div className="mt-4 mb-4">
                {contactMethod === "mail" ? (
                  <TextInput
                    required={contactMethod === "mail"}
                    placeholder="Correo Electrónico"
                    name="email"
                    value={contactValue}
                    error={error}
                    onChange={(e) => {
                      setContactValue(e.target.value);
                    }}
                  />
                ) : (
                  <TextInput
                    required={contactMethod === "phone"}
                    placeholder="Número de teléfono"
                    name="phone"
                    value={contactValue}
                    error={error}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setContactValue(value);
                      }
                    }}
                  />
                )}
              </div>
              <textarea className="w-full" rows={10} name="comment"></textarea>
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

const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
  return phone.length === 10;
};
