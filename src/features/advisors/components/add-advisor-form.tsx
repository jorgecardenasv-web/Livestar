import { SubmitButton } from "@/shared/components/submit-button";
import { TextInput } from "@tremor/react";
import { useAddAdvisor } from "../hooks/useAddAdvisor";

export const AddAdvisorForm = () => {
  const { formAction, formState } = useAddAdvisor();

  return (
    <form action={formAction} className="mt-5">
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default dark:text-dark-tremor-content text-dark-tremor-background">
          Nombre completo
        </p>
        <TextInput
          placeholder=""
          type="text"
          id="name"
          name="name"
          required
          error={Boolean(formState?.errors?.name?.length)}
          errorMessage={formState?.errors?.name}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default dark:text-dark-tremor-content text-dark-tremor-background">
          Email
        </p>
        <TextInput
          type="email"
          placeholder=""
          id="email"
          name="email"
          required
          error={Boolean(formState?.errors?.email?.length)}
          errorMessage={formState?.errors?.email}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default dark:text-dark-tremor-content text-dark-tremor-background">
          Contraseña
        </p>
        <TextInput
          type="password"
          placeholder=""
          id="password"
          name="password"
          required
          error={Boolean(formState?.errors?.password?.length)}
          errorMessage={formState?.errors?.password}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default dark:text-dark-tremor-content text-dark-tremor-background">
          Confirme contraseña
        </p>
        <TextInput
          type="password"
          placeholder=""
          id="password-confirmation"
          name="password-confirmation"
          required
          error={Boolean(formState?.errors?.passwordConfirmation?.length)}
          errorMessage={formState?.errors?.passwordConfirmation}
        />
      </div>
      <div className="mt-8 w-full flex flex-row gap-2">
        <SubmitButton
          textStatic="Crear Asesor"
          className="flex-1"
          textPending="Creando Asesor..."
        />
      </div>
    </form>
  );
};
