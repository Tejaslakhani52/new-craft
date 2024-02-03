import { DashboardData } from "@/src/interface/dashboard";
import { PurchaseItemProps } from "@/src/interface/payment_props";
import { StripePaymentMethod } from "@/src/interface/stripePaymentMethod";
import { User } from "@/src/interface/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DataState {
  templatesData: DashboardData[];
  tokenValue: boolean;
  userData: User | null;
  customerId: string;
  serverSideToken: string;
  setPurchaseItems: PurchaseItemProps[];
  saveCardData: StripePaymentMethod[];
  dashboardPage: number;
}

const initialState: DataState = {
  templatesData: [],
  tokenValue: false,
  userData: null,
  customerId: "",
  serverSideToken: "",
  setPurchaseItems: [],
  saveCardData: [],
  dashboardPage: 1,
};

const dataSlice = createSlice({
  name: "templatesDatas",
  initialState,
  reducers: {
    tokenValue: (state, action: PayloadAction<boolean>) => {
      state.tokenValue = action.payload;
    },
    userData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    customerId: (state, action: PayloadAction<string>) => {
      state.customerId = action.payload;
    },
    serverSideToken: (state, action: PayloadAction<string>) => {
      state.serverSideToken = action.payload;
    },
    templatesData: (state, action: PayloadAction<DashboardData[]>) => {
      state.templatesData = action.payload;
    },
    setPurchaseItems: (state, action: PayloadAction<PurchaseItemProps[]>) => {
      state.setPurchaseItems = action.payload;
    },
    saveCardData: (state, action: PayloadAction<StripePaymentMethod[]>) => {
      state.saveCardData = action.payload;
    },
    dashboardPage: (state, action: PayloadAction<number>) => {
      state.dashboardPage = action.payload;
    },
  },
});

export const {
  templatesData,
  tokenValue,
  userData,
  customerId,
  serverSideToken,
  setPurchaseItems,
  saveCardData,
  dashboardPage,
} = dataSlice.actions;
export default dataSlice.reducer;
