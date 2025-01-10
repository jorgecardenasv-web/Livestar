import { createAdvisor } from "../../actions/create-advisor";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { TextInput } from "@/shared/components/ui/text-input";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { useAdvisorForm } from "../../hooks/use-advisor-form";

export const CreateAdvisorForm = () => {
  const { formAction, state } = useAdvisorForm(createAdvisor);

  return (
    <form action={formAction} className="space-y-4">
      <TextInput
        label="Nombre completo"
        placeholder="Escibe tu nombre completo"
        type="text"
        id="name"
        name="name"
        required
        error={state?.inputErrors?.name}
      />
      <TextInput
        label="Correo electrónico"
        type="email"
        placeholder="Escribe tu correo electrónico"
        id="email"
        name="email"
        required
        error={state?.inputErrors?.email}
      />
      <PasswordInput
        label="Contraseña"
        placeholder="Escibe tu contraseña"
        id="password"
        name="password"
        required
        error={state?.inputErrors?.password}
      />
      <PasswordInput
        label="Confirmar contraseña"
        placeholder="Escibe tu contraseña de nuevo"
        id="password-confirmation"
        name="password-confirmation"
        required
        error={state?.inputErrors?.passwordConfirmation}
      />

      <SubmitButton
        label="Crear Asesor"
        className="flex-1"
        labelPending="Creando Asesor..."
      />
    </form>
  );
};
