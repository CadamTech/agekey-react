import { AxiosError } from "axios";
import { BaseResult, ErrorMessages } from "./components/types";

const baseApiUrlDev = import.meta.env.VITE_OPALE_API_URL_DEV;
const authUrlDev = import.meta.env.VITE_OPALE_AUTH_URL_DEV;

const baseApiUrlStage = import.meta.env.VITE_OPALE_API_URL_STAGE
const authUrlStage = import.meta.env.VITE_OPALE_AUTH_URL_STAGE

const baseApiUrlProd = import.meta.env.VITE_OPALE_API_URL_PROD
const authUrlProd = import.meta.env.VITE_OPALE_AUTH_URL_PROD

const baseApiUrlDevV2 = import.meta.env.VITE_AGEKEY_API_URL_DEV
const authUrlDevV2 = import.meta.env.VITE_AGEKEY_AUTH_URL_DEV

const baseApiUrlStaingV2 = import.meta.env.VITE_AGEKEY_API_URL_STAGING
const authUrlStagingV2 = import.meta.env.VITE_AGEKEY_AUTH_URL_STAGING

const baseApiUrlV2Prod = import.meta.env.VITE_AGEKEY_API_URL_PROD
const authUrlV2Prod = import.meta.env.VITE_AGEKEY_AUTH_URL_PROD

export function getEnvironmentUrls(publicKey: string): { baseApiUrl: string, authUrl: string } {
  if (publicKey.startsWith("dev-")) {
    return { baseApiUrl: baseApiUrlDev, authUrl: authUrlDev };
  } else if (publicKey.startsWith("staging-")) {
    return { baseApiUrl: baseApiUrlStage, authUrl: authUrlStage };
  } else if (publicKey.startsWith("devv2-")){
    return { baseApiUrl: baseApiUrlDevV2, authUrl: authUrlDevV2 };
  } else if (publicKey.startsWith("stagingv2-")){
    return { baseApiUrl: baseApiUrlStaingV2, authUrl: authUrlStagingV2 };
  } else if (publicKey.startsWith("v2-")){
    return { baseApiUrl: baseApiUrlV2Prod, authUrl: authUrlV2Prod };
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
    default: defaultMessages.default
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