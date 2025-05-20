export interface FormError {
  [key: string]: string;
}

export type FormState = {
  message: string;
  success: boolean;
  inputErrors?: Record<string, string>;
  shouldRedirect?: boolean;
  redirectUrl?: string;
};

export interface GetAllResponse<T> {
  success: boolean;
  data: {
    items: T[];
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
