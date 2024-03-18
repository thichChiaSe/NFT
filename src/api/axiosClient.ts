import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';
import { Zoom, toast } from 'react-toastify';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('access_token') ?? ''}${
      localStorage.getItem('access_token') ?? ''
    }`,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('access_token') ?? ''}${
        localStorage.getItem('access_token') ?? ''
      }`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object') return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === 'object') handleDates(value);
  }
}

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    handleDates(response.data);
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.toString() == 'Error: Request failed with status code 401' ||
      error.toString() == 'Error: Request failed with status code 403'
    ) {
      // localStorage.removeItem('access_token');
      // sessionStorage.removeItem('access_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
//logout sau 15 phút
// let timeout: NodeJS.Timeout | undefined;
// let resetTime: number = 900;
// function resetLogoutTimer() {
//   if (timeout !== undefined) {
//     clearTimeout(timeout);
//   }
//   timeout = setTimeout(() => {
//     localStorage.removeItem('access_token');
//     sessionStorage.removeItem('access_token');
//     if (window.location.pathname !== '/login') {
//       window.location.href = '/login';
//     }
//     toast.info('Hết phiên đăng nhập, vui lòng đăng nhập lại')
//   }, 5000);
// }
// resetLogoutTimer();

//test
// const timeoutInMS = 900000;
// let timeoutId: NodeJS.Timeout | undefined;

// function handleInactive() {
//   localStorage.removeItem('access_token');
//   sessionStorage.removeItem('access_token');
//   if (window.location.pathname !== '/login') {
//     window.location.href = '/login';
//   }
//   toast.info('Hết phiên đăng nhập, vui lòng đăng nhập lại', {
//     position: 'top-center',
//     autoClose: 10000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: 0,
//     theme: 'light',
//     transition: Zoom,
//   });
// }

// function startTimer() {
//   timeoutId = setTimeout(handleInactive, timeoutInMS);
// }

// function resetTimer() {
//   clearTimeout(timeoutId);
//   startTimer();
// }

// export function setupTimers() {
//   document.addEventListener('keypress', resetTimer, false);
//   document.addEventListener('mousemove', resetTimer, false);
//   document.addEventListener('mousedown', resetTimer, false);
//   document.addEventListener('touchmove', resetTimer, false);

//   startTimer();
// }
export default axiosClient;
