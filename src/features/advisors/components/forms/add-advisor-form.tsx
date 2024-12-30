import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { addAdvisor } from "../../actions/add-advisor";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { TextInput } from "@/shared/components/ui/text-input";
import { PasswordInput } from "@/shared/components/ui/password-input";

export const AddAdvisorForm = () => {
  const { formAction, state } = useAdvisorActions(addAdvisor);

  return (
    <form action={formAction} className="space-y-4">
      <TextInput
        label="Nombre completo"
        placeholder="Escibe tu nombre completo"
        type="text"
        id="name"
        name="name"
        required
        error={state?.errors?.name}
      />
      <TextInput
        label="Correo electrónico"
        type="email"
        placeholder="Escribe tu correo electrónico"
        id="email"
        name="email"
        required
        error={state?.errors?.email}
      />
      <PasswordInput
        label="Contraseña"
        placeholder="Escibe tu contraseña"
        id="password"
        name="password"
        required
        error={state?.errors?.password}
      />
      <PasswordInput
        label="Confirmar contraseña"
        placeholder="Escibe tu contraseña de nuevo"
        id="password-confirmation"
        name="password-confirmation"
        required
        error={state?.errors?.passwordConfirmation}
      />

      <SubmitButton
        textStatic="Crear Asesor"
        className="flex-1"
        textPending="Creando Asesor..."
      />
    </form>
  );
};
