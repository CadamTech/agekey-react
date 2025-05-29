// Common types
export type Language = 'en' | 'fr';
export type Ceremony = 'register' | 'authenticate' | 'update' | 'test';
export type VerificationMethod = "docScan" | "ageEstimation" | "digitalId" | "creditCard" | "mobile" | "ftn" | "swedishBankId" | "mitId" | "laWallet" | "socialSecurityNumber" | "usFloridaHb3" | "address" | "emailDirectCheck" | "doubleAnonymity"
export type CeremonyMessage = 'registered' | 'authenticated' | 'updated' | 'validated'  | 'error';
export type ErrorMessage = 'Invalid request' | 'Invalid credentials' | 'Credential not found' | 'Internal server error' | 'Failed to complete ceremony'

export interface BaseResult {
  message: CeremonyMessage;
  error?: ErrorMessage;
};

export type Verifications = {
  [K in VerificationMethod]?: VerificationDetails;
};

export interface VerificationDetails {
  ageThreshold: number;
  date: string; // YYYY-MM-DD
};

export interface RegisterResult extends BaseResult {
  redirectUrl?: string
};

export interface AuthenticateResult extends BaseResult {
  authenticationData?: Verifications;
  redirectUrl?: string
};

export interface UpdateResult extends BaseResult {
  authenticationData?: Verifications;
  redirectUrl?: string
};

export interface TestResult extends BaseResult  {};

// Base props interface
export interface BaseAgeKeyProps {
  publicKey: string;
  sessionId: string;
  ageThreshold?: number;
  language?: Language;
};

export interface StyleAgeKeyProps {
  ceremony: Ceremony;
  ageThreshold: number;
  language: Language;
  isLoading: boolean;
};

export interface StyleAgeKeyTestProps {
  language: Language;
  isLoading: boolean;
};

// Ceremony-specific props with typed onResult callbacks
export interface AuthenticateProps extends BaseAgeKeyProps{
  onResult: (result: AuthenticateResult) => void;
};

export interface RegisterProps  extends BaseAgeKeyProps{
  verificationMethod: VerificationMethod;
  onResult: (result: RegisterResult) => void;
};

export interface UpdateProps extends BaseAgeKeyProps{
  verificationMethod: VerificationMethod;
  onResult: (result: UpdateResult) => void;
};

export interface TestProps extends BaseAgeKeyProps{
  onResult: (result: TestResult) => void;
};

export type Outcome = "pending" | "signatureMismatch" | "timestampExpired" | "verificationFailed" | "success";

export type CallbackData = { 
  outcome: Outcome,
  expiresIn: number | null,
  data: Verifications | null
};