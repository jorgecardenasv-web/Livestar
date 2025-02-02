import { useNotificationStore } from "@/features/notification/store/notification-store";
import { FormState } from "@/shared/types";
import { prefix } from "@/features/layout/nav-config/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export const useLoginForm = (
  serverAction: (prevState: any, formData: FormData) => Promise<FormState>
) => {
  const [state, formAction] = useFormState(serverAction, {
    message: "",
    success: false,
  });

  const { showNotification } = useNotificationStore();

  const { replace } = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification(state.message, "success");
      replace(`${prefix}/panel`);
    }
  }, [state.success, state.message, replace, showNotification]);

  return {
    state,
    formAction,
  };
};
