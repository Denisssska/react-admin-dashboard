import { getCookie } from './getCookie';

export const PORT = import.meta.env.VITE_REACT_APP_API_URL;


export async function customFetch(

  url: string,
  options: { method?: string; body?: FormData | any; headers?: any }
) {
  const defaultHeaders = {
    Authorization: getCookie('session'),
    // Authorization: window.localStorage.getItem('token'),
  };

  const opts = {
    ...options,
    headers: {
      ...options.headers,
      ...defaultHeaders,
    },
  };

  const loginUrl = '/login'; // url страницы для авторизации
  const tokenData = null; // объявляем локальную переменную tokenData
  const response = await fetch(`${PORT}${url}`, opts);
  console.log(getCookie('session'));
  if (!getCookie('session') && localStorage.getItem('persist:root')) {

      localStorage.removeItem('persist:root');
    
    // если в sessionStorage присутствует tokenData, то берем её
    return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
  }
  if (response.ok) {
    if (response.status === 204) {
      // обработка ответа 'no-content'
      return null;
    }
    return response;
  } else {
    return Promise.reject(response);
  }
}

export default customFetch;
