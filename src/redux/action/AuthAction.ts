import api from "@/src/clientApi/api";
import toast from "react-hot-toast";
import { Dispatch } from "redux";
import { mainLoad, openSidebar } from "../reducer/actionDataReducer";
import { authCookiesSet } from "./AuthToken";

export const createUserApi =
  (props: any, router: any): any =>
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
        // router.push(`${"/"}`);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        // console.log("err: ", err);
      });
  };
