import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "./config";
import {
  FileFilterRequest,
    FileRequest,
    FileResponse,
    ListFileResponse
} from "./types";

class FileServices {
  static async uploadFile(data?: FormData): Promise<AxiosResponse<FileResponse>> {
    return axios.post("/api/file",data,{
        ...getAxiosConfig(),
        headers: {
          ...getAxiosConfig().headers,
          "Content-Type": "multipart/form-data",
        },
      });
  }
  static async uploadFiles(data?: FormData): Promise<AxiosResponse<FileResponse[]>> {
    return axios.post("/api/file/list",data,{
        ...getAxiosConfig(),
        headers: {
          ...getAxiosConfig().headers,
          "Content-Type": "multipart/form-data",
        },
      });
  }
  static async filter(filter?: FileFilterRequest): Promise<AxiosResponse<ListFileResponse>> {
    return axios.get("/api/file",{
        ...getAxiosConfig(),
        params: filter,
        headers: {
          ...getAxiosConfig().headers,
        },
        
      });
  }
  static async updateFile(id?: number, request?: FileRequest): Promise<AxiosResponse<FileResponse>> {
    return axios.put(`/api/file/edit/${id}`,request,{
        ...getAxiosConfig(),
      });
  }
  static async delete(id?: number): Promise<AxiosResponse<FileResponse>> {
    return axios.delete(`/api/file/${id}/delete`,{
        ...getAxiosConfig(),
      });
  }
}

export default FileServices;
