import * as procoreIframeHelpers from '@procore/procore-iframe-helpers';

import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Auth() {
  let query = useQuery();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/me');
    }
  }, [history]);

  useEffect(() => {
    // console.log(query.get('code'));
    if (query.get('code')) {
      const fetchToken = async () => {
        const resp = await fetch(`.netlify/functions/exchange-token?code=${query.get('code')}`);
        const data = await resp.json();
        // console.log(data);
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
        procoreIframeHelpers.initialize().authentication.notifySuccess({});
      };
      fetchToken();
    }
  }, [query]);

  async function handleLogin() {
    const iframeHelperContext = procoreIframeHelpers.initialize();
    const authUrl = `
    ${process.env.REACT_APP_PROCORE_URL}/oauth/authorize?client_id=${process.env.REACT_APP_PROCORE_CLIENT}&response_type=code&redirect_uri=${process.env.REACT_APP_PROCORE_CALLBACK}
  `;

    iframeHelperContext.authentication.authenticate({
      url: authUrl,
      onSuccess() {
        // This function fires when a message is received from the child window that
        // authentication was a success.
        window.location = '/me';
      },
      onFailure() {
        // If the child authentication window exits without sending a success message,
        // this function will execute
        alert('authentication failed!');
      },
    });
  }
  return (
    <div>
      <button style={{ height: '500px', width: '300px' }} onClick={handleLogin}>
        Login with Procore
      </button>
    </div>
  );
}
