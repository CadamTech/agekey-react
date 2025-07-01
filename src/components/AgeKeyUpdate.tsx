import React, { JSX, useEffect, useState } from 'react';
import axios from 'axios';
import { UpdateProps } from './types';
import { AuthenticationResponseJSON, startAuthentication } from '@simplewebauthn/browser';
import { AgeKeyStyleComponent } from './Shared';
import { getEnvironmentUrls, createErrorResponse } from '../utils';
import { ageKeyButton } from "./style";

export const AgeKeyUpdate = ({ publicKey, sessionId, ageThreshold = 18, verificationMethod, onResult, language, ref, stateEncrypted, encryptState }: UpdateProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [{baseApiUrl, authUrl }, setEnvironmentUrls] = useState({baseApiUrl: "", authUrl: ""});

  useEffect(() => {
    if (!publicKey || !sessionId) return
    setEnvironmentUrls(getEnvironmentUrls(publicKey));
    setIsLoading(false);
  }, [publicKey, sessionId]);

  async function getUpdateOptions(publicKey: string, sessionId: string, ageThreshold: number, verificationMethod: string) {
    const url = `${baseApiUrl}/agekey/update-options/${sessionId}/?publicKey=${publicKey}`;
    const state = { ageThreshold: ageThreshold, verificationMethod: verificationMethod }
    if (stateEncrypted) {
        const { data } = await axios.post(url, { stateEncrypted: stateEncrypted });
        return data;
    } else {
      const { data } = await axios.post(url, state);
      return data;
    }
  };

  async function verifyUpdate(publicKey: string, sessionId: string, authenticationResponse: AuthenticationResponseJSON) {
    const url = `${baseApiUrl}/agekey/verify-update/${sessionId}?publicKey=${publicKey}`;
    const { data } = await axios.post(url, {
      authenticationResponse: authenticationResponse,
      encryptState: encryptState
    });
    return data;
  };

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Check for Firefox and redirect if needed
      if (window.navigator.userAgent.search("Firefox") > -1) {

        const state = JSON.stringify({ ageThreshold: ageThreshold, verificationMethod: verificationMethod });
        let targetUrl = `${authUrl}/origin-relay/update/?sessionId=${sessionId}&publicKey=${publicKey}`
        if (stateEncrypted) {
          targetUrl += `&stateEncrypted=${stateEncrypted}&encryptState=true`
        } else {
          targetUrl += `&state=${encodeURIComponent(state)}`
        }

        if (authUrl !== window.location.origin) {
          window.location.href = targetUrl;
          return;
        }
      };

      const authenticationnOptions = await getUpdateOptions(publicKey, sessionId, ageThreshold, verificationMethod);
      const startAuthenticationOptions = {
        optionsJSON: authenticationnOptions
      };
      const authenticationResponse = await startAuthentication(startAuthenticationOptions);
      const response = await verifyUpdate(publicKey, sessionId, authenticationResponse);
      onResult(response);
    } catch (error: any) {
      onResult(createErrorResponse()(error));
    } finally {
      setIsLoading(false);
    };
  };

  return <button style={{...ageKeyButton}} onClick={handleUpdate} disabled={isLoading} ref={ref}>
    <AgeKeyStyleComponent ceremony='update' language={language || 'en'} ageThreshold={ageThreshold || 18} isLoading={isLoading}/>
  </button>
};
