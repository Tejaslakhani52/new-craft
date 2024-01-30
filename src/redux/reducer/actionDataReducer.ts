import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateData {
  id: string;
  type: number;
  usdAmount: string;
  usdVal: number;
  inrAmount: string;
  inrVal: number;
}

interface DataState {
  openSidebar: boolean;
  openMobileMenubar: boolean;
  openTempModal: boolean;
  enterAccount: boolean;
  mainLoader: boolean;
  mainLoad: boolean;
  modalClosePath: any;
  tempId: string;
  openLogin: boolean;
  _paf: TemplateData | any;
  clearTemplateCookie: boolean;
}

const initialState: DataState = {
  openSidebar: false,
  openMobileMenubar: false,
  openTempModal: false,
  enterAccount: false,
  mainLoader: true,
  mainLoad: false,
  modalClosePath: "",
  tempId: "",
  openLogin: false,
  _paf: [],
  clearTemplateCookie: false,
};

const dataActions = createSlice({
  name: "actions",
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    openMobileMenubar: (state, action: PayloadAction<boolean>) => {
      state.openMobileMenubar = action.payload;
    },
    openTempModal: (state, action: PayloadAction<boolean>) => {
      state.openTempModal = action.payload;
    },
    enterAccount: (state, action: PayloadAction<boolean>) => {
      state.enterAccount = action.payload;
    },
    mainLoader: (state, action: PayloadAction<boolean>) => {
      state.mainLoader = action.payload;
    },
    mainLoad: (state, action: PayloadAction<boolean>) => {
      state.mainLoad = action.payload;
    },
    modalClosePath: (state, action: PayloadAction<any>) => {
      state.modalClosePath = action.payload;
    },
    tempId: (state, action: PayloadAction<any>) => {
      state.tempId = action.payload;
    },
    openLogin: (state, action: PayloadAction<boolean>) => {
      state.openLogin = action.payload;
    },
    _paf: (state, action: PayloadAction<any>) => {
      state._paf = action.payload;
    },
    clearTemplateCookie: (state, action: PayloadAction<boolean>) => {
      state.clearTemplateCookie = action.payload;
    },
  },
});

export const {
  openSidebar,
  openMobileMenubar,
  openTempModal,
  modalClosePath,
  enterAccount,
  mainLoader,
  tempId,
  mainLoad,
  openLogin,
  _paf,
  clearTemplateCookie,
} = dataActions.actions;
export default dataActions.reducer;
