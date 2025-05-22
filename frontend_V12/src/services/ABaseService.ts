import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { API_URL } from "./api-config";

export function ABaseService<T>(resource: string) {
  return {
    async getAll(): Promise<ApiResponse<T[]>> {
      const response = await axios.get<ApiResponse<T[]>>(`${API_URL}/${resource}`);
      return response.data;
    },

    async getById(id: number): Promise<ApiResponse<T>> {
      const response = await axios.get<ApiResponse<T>>(`${API_URL}/${resource}/${id}`);
      return response.data;
    },

    async create(item: T): Promise<ApiResponse<T>> {
      const response = await axios.post<ApiResponse<T>>(`${API_URL}/${resource}`, item);
      return response.data;
    },

    async update(id: number, item: T): Promise<ApiResponse<T>> {
      const response = await axios.put<ApiResponse<T>>(`${API_URL}/${resource}/${id}`, item);
      return response.data;
    },

    async remove(id: number): Promise<ApiResponse<void>> {
      const response = await axios.delete<ApiResponse<void>>(`${API_URL}/${resource}/${id}`);
      return response.data;
    },
  };
}
