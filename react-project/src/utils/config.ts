import axios from 'axios';

// express
export const axiosInstanceExpress = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 5000, 
});

axiosInstanceExpress.interceptors.request.use(
  (config) => {
    // console.log('Request Interceptor', config);
    console.log('Request Interceptor run ');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceExpress.interceptors.response.use(
  (response) => {
    // console.log('Response Interceptor', response);
    console.log('Response Interceptor');
    return response;
  },
  (error) => {
    console.log('Error Interceptor', error.response);
    return Promise.reject(error);
  }
);


// nest js
export const axiosInstanceNest = axios.create({
  baseURL: 'http://localhost:5000', 
  timeout: 5000, 
});

axiosInstanceNest.interceptors.request.use(
  (config) => {
    // console.log('Request Interceptor', config);
    console.log('Request Interceptor run ');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceNest.interceptors.response.use(
  (response) => {
  // console.log('Response Interceptor', response);
    console.log('Response Interceptor');
    return response;
  },
  (error) => {
    console.log('Error Interceptor', error.response);
    return Promise.reject(error);
  }
);


