import { SubmitButton } from "@/shared/components/submit-button";
import { TextInput } from "@tremor/react";
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { addAdvisor } from "../../actions/add-advisor";

export const AddAdvisorForm = () => {
  const { formAction, state } = useAdvisorActions(addAdvisor);

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
          error={Boolean(state?.errors?.name?.length)}
          errorMessage={state?.errors?.name}
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
          error={Boolean(state?.errors?.email?.length)}
          errorMessage={state?.errors?.email}
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
          error={Boolean(state?.errors?.password?.length)}
          errorMessage={state?.errors?.password}
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
          error={Boolean(state?.errors?.passwordConfirmation?.length)}
          errorMessage={state?.errors?.passwordConfirmation}
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
