import axios, { AxiosResponse } from "axios";
import { decryptData } from "../aes-crypto";
import { DashboardDataType } from "../interface/dashboard";
import { CreateUserPayload } from "../interface/createUser";
import { BillingDetails } from "../interface/stripePaymentMethod";
import { PaymentProps } from "../interface/payment_props";

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

  getCountryCode: async (payload: { ip: string }) => {
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

  getUserData: async (payload: { user_id: string }) => {
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

  createUser: async (payload: CreateUserPayload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/create`, payload);
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  updateUser: async (userData: {
    name: string;
    updateDp: number | any;
    photo_uri: string;
  }): Promise<void> => {
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

  getCurrentPlan: async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_BASE_URL}/user/account/currentPlan`
      );
      return JSON.parse(decryptData(response?.data));
    } catch (error) {
      return error;
    }
  },

  getUserTemplate: async (payload: { page: number }) => {
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

  getCategoryData: async (payload: { cat_id: string; page: number }) => {
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

  getDashboardData: async (payload: { page: number }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/dashboard/getData`,
        payload
      );
      const res: DashboardDataType = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  getSingleTemplate: async (payload: { id_name: string }) => {
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

  getKeywordData: async (payload: { key_name: string; page: number }) => {
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

  searchTemplate: async (payload: { keywords: string; page: number }) => {
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

  getDraftData: async (payload: { type: string; page: number }) => {
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

  draftAction: async (payload: { id: string; type: string }) => {
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

  getUploadData: async (payload: {
    key: string;
    type: string;
    page: number;
  }) => {
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

  uploadAction: async (payload: { id: string; type: string }) => {
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

  getPlanData: async (payload: { currency: string }) => {
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

  razorpay: async (payload: { _paf: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/razorPay`,
        payload
      );
      const res = JSON.parse(decryptData(response?.data));
      return res;
    } catch (error) {
      return error;
    }
  },

  stripe: async (payload: { pi: string; _paf: string }) => {
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

  webhook: async (payload: { _paf: string; _pdf: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/webhook`,
        payload
      );
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

  detach: async (payload: { pm: string }) => {
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

  updateCard: async (payload: {
    pm: string | undefined;
    billing_details: BillingDetails;
    month: number | undefined;
    year: number | undefined;
  }) => {
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

  removeBackground: async (payload: { image: File }): Promise<Blob> => {
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
