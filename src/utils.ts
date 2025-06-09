import { AxiosError } from "axios";
import { BaseResult, ErrorMessages } from "./components/types";

const baseApiUrlDev = import.meta.env.VITE_OPALE_API_URL_DEV;
const authUrlDev = import.meta.env.VITE_OPALE_AUTH_URL_DEV;

const baseApiUrlStage = import.meta.env.VITE_OPALE_API_URL_STAGE
const authUrlStage = import.meta.env.VITE_OPALE_AUTH_URL_STAGE

const baseApiUrlProd = import.meta.env.VITE_OPALE_API_URL_PROD
const authUrlProd = import.meta.env.VITE_OPALE_AUTH_URL_PROD


export function getEnvironmentUrls(publicKey: string): { baseApiUrl: string, authUrl: string } {
  if (publicKey.startsWith("dev-")) {
    return { baseApiUrl: baseApiUrlDev, authUrl: authUrlDev };
  } else if (publicKey.startsWith("staging-")) {
    return { baseApiUrl: baseApiUrlStage, authUrl: authUrlStage };
  } else {
    return { baseApiUrl: baseApiUrlProd, authUrl: authUrlProd };
  }
};

export const createErrorResponse = (errorMessages?: Partial<Record<number, string>>) => {
  const defaultMessages: ErrorMessages = {
    400: 'Invalid request',
    401: 'Invalid credentials',
    404: 'Credential not found',
    500: 'Internal server error',
    default: 'Failed to complete ceremony'
  };

  const messages: ErrorMessages = { 
    ...defaultMessages, 
    ...errorMessages,
    default: defaultMessages.default // Ensure default always exists
  };

  return (error: unknown): BaseResult => {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;
    
    return {
      message: 'error',
      error: statusCode !== undefined ? (messages[statusCode] || messages.default) : messages.default
    };
  };
};