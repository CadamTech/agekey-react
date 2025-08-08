import React, { JSX, useEffect, useState } from 'react';
import axios from 'axios';
import { ManageProps } from './types';
import { AuthenticationResponseJSON, startAuthentication } from '@simplewebauthn/browser';
import { AgeKeyStyleComponent } from './Shared';
import { getEnvironmentUrls, createErrorResponse } from '../utils';
import { ageKeyButton } from "./style";

export const AgeKeyManage = ({ publicKey, sessionId, onResult, language, ref, encryptState }: ManageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ baseApiUrl }, setEnvironmentUrls] = useState({ baseApiUrl: "", authUrl: "" });

  useEffect(() => {
    if (!publicKey || !sessionId) return
    setEnvironmentUrls(getEnvironmentUrls(publicKey));
    setIsLoading(false);
  }, [publicKey, sessionId]);

  async function getManageOptions(publicKey: string, sessionId: string) {
    const url = `${baseApiUrl}/agekey/manage-options/${sessionId}/?publicKey=${publicKey}`;
    const { data } = await axios.post(url);
    return data;
  };

  async function verifyManage(publicKey: string, sessionId: string, authenticationResponse: AuthenticationResponseJSON) {
    const url = `${baseApiUrl}/agekey/verify-manage/${sessionId}/?publicKey=${publicKey}`;
    const { data } = await axios.post(url, {
      authenticationResponse: authenticationResponse,
      encryptState: encryptState
    });
    return data;
  };

  async function handleAuthenticate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const authenticationOptions = await getManageOptions(publicKey, sessionId);
      const startAuthenticationOptions = {
        optionsJSON: authenticationOptions
      };
      const authenticationResponse = await startAuthentication(startAuthenticationOptions);
      const response = await verifyManage(publicKey, sessionId, authenticationResponse);
      onResult(response);
    } catch (error) {
      console.log(error)
      onResult(createErrorResponse()(error));
    } finally {
      setIsLoading(false);
    }
  }

  return <button style={{ ...ageKeyButton }} onClick={handleAuthenticate} disabled={isLoading} ref={ref}>
    <AgeKeyStyleComponent ceremony='manage' language={language || 'en'} ageThreshold={-1} isLoading={isLoading} />
  </button>
}
