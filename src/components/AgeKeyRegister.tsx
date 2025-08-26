import React, { JSX, useEffect, useState } from 'react'
import axios from "axios";
import { RegisterProps } from './types'
import { startRegistration, RegistrationResponseJSON } from '@simplewebauthn/browser';
import AgeKeyStyleComponent from './Shared';
import { getEnvironmentUrls, createErrorResponse } from '../utils';

export const AgeKeyRegister = ({ publicKey, sessionId, ageThreshold = 18, verificationMethod, onResult, ref, stateEncrypted }: RegisterProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ baseApiUrl, authUrl }, setEnvironmentUrls] = useState({ baseApiUrl: "", authUrl: "" });

  useEffect(() => {
    if (!publicKey || !sessionId) return
    setEnvironmentUrls(getEnvironmentUrls(publicKey));
    setIsLoading(false);
  }, [publicKey, sessionId]);

  async function getRegistrationOptions(publicKey: string, sessionId: string, ageThreshold: number, verificationMethod: string) {
    const url = `${baseApiUrl}/agekey/registration-options/${sessionId}/?publicKey=${publicKey}`;
    const state = { ageThreshold: ageThreshold, verificationMethod: verificationMethod }
    if (stateEncrypted) {
      const { data } = await axios.post(url, { stateEncrypted: stateEncrypted });
      return data;
    } else {
      const { data } = await axios.post(url, state);
      return data;
    }
  };

  async function verifyRegistration(publicKey: string, sessionId: string, registrationResponse: RegistrationResponseJSON) {
    const url = `${baseApiUrl}/agekey/verify-registration/${sessionId}?publicKey=${publicKey}`;
    const { data } = await axios.post(url, {
      registrationResponse: registrationResponse,
    });
    return data;
  };

  async function handleRegister(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Check for Firefox and redirect if needed
      if (window.navigator.userAgent.search("Firefox") > -1) {
        const state = JSON.stringify({ ageThreshold: ageThreshold, verificationMethod: verificationMethod });
        let targetUrl = `${authUrl}/origin-relay/register/?sessionId=${sessionId}&publicKey=${publicKey}`
        if (stateEncrypted) {
          targetUrl += `&stateEncrypted=${stateEncrypted}`
        } else {
          targetUrl += `&state=${encodeURIComponent(state)}`
        }

        if (authUrl !== window.location.origin) {
          window.location.href = targetUrl;
          return;
        };
      };

      const registrationOptions = await getRegistrationOptions(publicKey, sessionId, ageThreshold, verificationMethod);
      const startRegistrationOptions = {
        optionsJSON: registrationOptions
      };
      const registrationResponse = await startRegistration(startRegistrationOptions);
      const response = await verifyRegistration(publicKey, sessionId, registrationResponse);
      onResult(response);
    } catch (error: any) {
      onResult(createErrorResponse()(error));
    } finally {
      setIsLoading(false);
    };
  };

  return <AgeKeyStyleComponent ceremony={'register'}  onClick={handleRegister} disabled={isLoading} innerRef={ref}/>
};

