export interface FormError {
  [key: string]: string;
}

export type FormState = {
  message: string;
  success: boolean;
};
