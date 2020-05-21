import React, { useEffect } from 'react';
import queryString from 'query-string';
import { RequestManager } from '../../services/RequestManager';
import { AuthManager } from '../../services/AuthManager';

export default function FourtyTwo({ location }) {
  const code = queryString.parse(location.search).code;

  useEffect(() => {
    if (!code)
      return (null);
    RequestManager.token_42(code)
    .then((res) => {
      const { data } = res;
      AuthManager.setAsLogged(data);
    })
    .catch(() => {
      console.log('failed')
    })
  }, [code]);

  console.log(code);

  return (
    <div></div>
  )
}