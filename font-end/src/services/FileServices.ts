import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "./config";
import {
    FileResponse
} from "./types";

class FileServices {
  static async uploadFile(data?: FormData): Promise<AxiosResponse<FileResponse>> {
    return axios.post("/api/file",data,{
        ...getAxiosConfig(),
        headers: {
          ...getAxiosConfig().headers,
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
      });
  }
}

export default FileServices;
