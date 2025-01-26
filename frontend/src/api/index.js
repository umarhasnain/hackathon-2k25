import axios from 'axios';
import { store } from '../redux/store';

const apiClient = axios.create({
    baseURL: "https://hackathon-2k25-mj28.vercel.app/",
    timeout: 9000,
    headers: {
        'Content-Type': 'application/json',
    },
});


let token;
store.subscribe(()=>{
    const state = store.getState()
    token = state.user.token    
})

apiClient.interceptors.request.use(
    (config) => { 
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Axios Error:", error.message);
      return Promise.reject(error);
    }
  );


export default apiClient;
