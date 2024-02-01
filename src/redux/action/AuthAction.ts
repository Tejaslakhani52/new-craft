import api from "@/src/clientApi/api";
import toast from "react-hot-toast";
import { Dispatch } from "redux";
import { mainLoad, openSidebar } from "../reducer/actionDataReducer";
import { authCookiesSet } from "./AuthToken";
import { consoleLog } from "@/src/commonFunction/console";
import { CreateUserPayload } from "@/src/interface/createUser";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export const createUserApi =
  (props: CreateUserPayload): any =>
  async (dispatch: Dispatch<any>) => {
    api
      .createUser({
        name: props?.name,
        email: props?.email,
        photo_uri: props?.photo_uri,
        user_id: props?.user_id,
        login_type: props?.login_type,
      })
      .then((res) => {
        toast.success("Success Login");
        dispatch(mainLoad(false));

        authCookiesSet(res?.user?.uid);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        consoleLog("createUser: ", err);
      });
  };
