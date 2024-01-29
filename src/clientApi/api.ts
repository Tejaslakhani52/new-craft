import axios, { AxiosResponse } from "axios";
import { decryptData } from "../aes-crypto";
import { DashboardDataType } from "../interface/dashboard";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}`;
const API_BASE_URL_1 = `${process.env.NEXT_PUBLIC_API_BASE_URL_1}`;

const api = {
  getIp: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL_1}/get-ip`);
      const res = response?.data;
      return res;
    } catch (error) {
      return error;
    }
  },

  getCountryCode: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get/getCountryCode`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getUserData: async (payload: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_BASE_URL}/user/getData`,
        payload
      );
      const decryptedData = JSON.parse(decryptData(response.data));
      return decryptedData;
    } catch (error) {
      return error;
    }
  },

  createUser: async (payload: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/create`, payload);
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  updateUser: async (userData: any): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("updateDp", userData.updateDp || "");
      formData.append("file", userData.photo_uri || "");

      const response: any = await axios.post(
        `${API_BASE_URL}/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  getCurrentPlan: async (): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_BASE_URL}/user/account/currentPlan`
      );
      return JSON.parse(decryptData(response?.data));
    } catch (error) {
      return error;
    }
  },

  getUserTemplate: async (payload: any): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_BASE_URL}/user/account/template`,
        payload
      );
      return JSON.parse(decryptData(response?.data));
    } catch (error) {
      return error;
    }
  },

  getCategoryData: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category/getData`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getDashboardData: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/dashboard/getData`);
      const res: DashboardDataType = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getSingleTemplate: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get/getSingleTemplate`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getKeywordData: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/special/getKeywordData`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  searchTemplate: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/search/templates`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getDraftData: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/draft/getData`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  draftAction: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/draft/action`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getUploadData: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/getData`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  uploadAction: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/action`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getPlanData: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/plans/getData`,
        payload
      );
      return JSON.parse(decryptData(response?.data));
    } catch (error) {
      return error;
    }
  },

  razorpay: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/razorPay`);
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  stripe: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/stripe`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  webhook: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/webhook`);
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  cardList: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/list`);
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  detach: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/detach`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  updateCard: async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/update`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  removeBackground: async (payload: any): Promise<Blob> => {
    try {
      const formData = new FormData();
      formData.append("file", payload.image);

      const response: AxiosResponse<Blob> = await axios.post(
        `${API_BASE_URL}/tools/bgRemove`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
