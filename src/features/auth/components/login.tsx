"use client";

import { Button, TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../actions/auth";
import { useTranslations } from 'next-intl';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('signin');

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      color="cyan"
    >
      {pending ? t('submit.pending') : t('submit.label')}
    </Button>
  );
}

export const SigninForm = () => {
  const router = useRouter();
  const t = useTranslations('signin');
  const [state, formAction] = useFormState(authenticate, {
    errors: {
      email: "",
      password: "",
    },
  });

  if (state?.success) {
    router.push("/dashboard");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-3xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {t('title')}
          </h3>
          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                {t('email.label')}
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder={t('email.placeholder')}
                className="mt-2"
              />
              <span className="text-sm text-red-500">
                {state?.errors?.email && t(state.errors.email)}
              </span>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                {t('password.label')}
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder={t('password.placeholder')}
                className="mt-2"
              />
              <span className="text-sm text-red-600">
                {state?.errors?.password && t(state.errors.password)}
              </span>
            </div>
            {state?.error && <p className="text-red-500">{t(state.error)}</p>}
            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  );
};