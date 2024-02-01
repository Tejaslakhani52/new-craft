import { DashboardDataType } from "@/src/interface/dashboard";
import { PurchaseItemProps } from "@/src/interface/payment_props";
import { StripePaymentMethod } from "@/src/interface/stripePaymentMethod";
import { User } from "@/src/interface/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  templatesData: DashboardDataType[];
  tokenValue: boolean;
  userData: User | null;
  customerId: string;
  serverSideToken: string;
  setPurchaseItems: PurchaseItemProps[];
  saveCardData: StripePaymentMethod[];
}

const initialState: DataState = {
  templatesData: [],
  tokenValue: false,
  userData: null,
  customerId: "",
  serverSideToken: "",
  setPurchaseItems: [],
  saveCardData: [],
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
    templatesData: (state, action: PayloadAction<DashboardDataType[]>) => {
      state.templatesData = action.payload;
    },
    setPurchaseItems: (state, action: PayloadAction<PurchaseItemProps[]>) => {
      state.setPurchaseItems = action.payload;
    },
    saveCardData: (state, action: PayloadAction<StripePaymentMethod[]>) => {
      state.saveCardData = action.payload;
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
} = dataSlice.actions;
export default dataSlice.reducer;
