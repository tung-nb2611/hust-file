import { AxiosRequestConfig } from "axios";
import qs from "qs";

export const REACT_APP_API_BASE_URL = `http://localhost:8080`;
//export const REACT_APP_API_BASE_URL = `https://f5dc-42-113-130-94.ngrok-free.app/`;

export const getAxiosConfig = (): AxiosRequestConfig => {
    return {
      baseURL: REACT_APP_API_BASE_URL,
      timeout: 100000,
      responseType: "json",
      maxContentLength: 10000,
      validateStatus: (status: number) => status >= 200 && status < 300,
      maxRedirects: 5,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
      headers: {},
    };
  };