type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const request = <T>({
  url,
  tags,
  method = 'GET',
  data = null,
  noCache,
}: {
  url: string;
  method?: RequestMethod;
  data?: any;
  tags?: string[];
  noCache?: boolean;
}): Promise<T> => {
  const options: RequestInit = {
    method,
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (tags) {
    options.next = {
      tags,
    };
  }

  if (noCache) {
    options.cache = 'no-store';
  }

  return fetch(BASE_URL + url, options).then(async (res) => {
    if (!res.ok) {
      return Promise.reject(await res.json());
    }

    if (res.status === 204) {
      return Promise.resolve({ message: 'Recipe has been deleted' });
    }

    return res.json();
  });
};

export const client = {
  get: <T>({ url, tags, noCache }: { url: string; tags?: string[]; noCache?: boolean }) =>
    request<T>({ url, tags, noCache }),

  post: <T>({ url, data, tags }: { url: string; data?: any; tags?: string[] }) =>
    request<T>({ url, method: 'POST', data, tags }),

  put: <T>({ url, data, tags }: { url: string; data?: any; tags?: string[] }) =>
    request<T>({ url, method: 'PUT', data, tags }),

  patch: <T>({ url, data, tags }: { url: string; data: any; tags?: string[] }) =>
    request<T>({ url, method: 'PATCH', data, tags }),

  delete: ({ url, data, tags }: { url: string; data?: any; tags?: string[] }) =>
    request({ url, method: 'DELETE', data, tags }),
};
