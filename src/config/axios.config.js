import axios from "axios";
// import { getToken } from "../utils/helper";
const VITE_API_ENDPOINT = "http://127.0.0.1:8000/api/";
 
const publicRequest = axios.create({
    baseURL: VITE_API_ENDPOINT,
});

const privateRequest = axios.create({
    baseURL: VITE_API_ENDPOINT,
}); 

/* Public request config */
publicRequest.interceptors.request.use(
    async (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        return config;
    },
    (err) => {
      
        Promise.reject(err);
    }
);

/* Private request config */
// privateRequest.interceptors.request.use(
//     async (config) => {
//         const token = getToken();
//         if (config.headers === undefined) {
//             config.headers = {};
//         }
//         if (token) {
           
//             config.headers["Authorization"] = "Bearer " + token || "";
//         }
//         return config;
//     },
//     (err) => {
 
//         Promise.reject(err);
//     }
// );
privateRequest.interceptors.request.use(
    async (config) => {
        // const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        // if (token) {
        //     //config.headers["content-type"] = 'multipart/form-data';
        //     config.headers["Authorization"] = "Bearer " + token || "";
        // }
        return config;
    },
    (err) => {
       
        Promise.reject(err);
    }
);

export { publicRequest, privateRequest };