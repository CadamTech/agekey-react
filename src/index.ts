export { AgeKeyRegister } from './components/AgeKeyRegister';
export { AgeKeyAuthenticate } from './components/AgeKeyAuthenticate';
export { AgeKeyUpdate } from './components/AgeKeyUpdate';
export { AgeKeyTest } from './components/AgeKeyTest';
export { AgeKeyManage } from './components/AgeKeyManage';
export { useOpaleSignature } from './hooks/useOpaleSignature';
export type {
        Ceremony,
        Language,
        VerificationMethod,
        VerificationDetails,
        ErrorMessage,
        RegisterResult,
        AuthenticateResult,
        UpdateResult,
        TestResult,
        ManageResult,
        RegisterProps,
        AuthenticateProps,
        UpdateProps,
        ManageProps,
        CallbackData,
        Verifications
 } from './components/types';