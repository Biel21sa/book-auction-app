import { parseCookies } from 'nookies';

const getApiHost = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
  const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost';
  const apiPort = process.env.NEXT_PUBLIC_API_PORT || 3001;

  return `${apiHost}:${apiPort}`;
};

const envAwareFetch = (url: string, options?: Record<string, unknown>) => {
  const token = parseCookies()['lpm-app.token'];
  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  if (!options?.headers) {
    options = {
      ...options,
      headers: {
        ...authHeader,
      },
    };
  } else {
    options.headers = {
      ...options.headers,
      ...authHeader,
    };
  }

  const fetchUrl = url.startsWith('/') ? `${getApiHost()}${url}` : url;

  return fetch(fetchUrl, options).then((response) => response.json());
};

export { getApiHost, envAwareFetch };
