import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icons from "@/src/assets";
import { auth } from "@/src/firebase";
import { authCookiesSet } from "@/src/redux/action/AuthToken";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "./Input";
import LoginPlatform from "./LoginPlatform";
import Password from "./Password";
import { useDispatch } from "react-redux";
import { mainLoad } from "@/src/redux/reducer/actionDataReducer";
import api from "@/src/clientApi/api";
import { decryptData, encryptData } from "@/src/aes-crypto";

export default function LoginContentBox(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [remember, setRemember] = useState<boolean>(false);
  const [emailPassword, setEmailPassword] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedCredentialsEmail = Cookies.get("rememberMeCredentialsEmail");
    const storedCredentialsPassword = Cookies.get(
      "rememberMeCredentialsPassword"
    );
    if (storedCredentialsEmail && storedCredentialsPassword) {
      const email = decryptData(storedCredentialsEmail);
      const password = decryptData(storedCredentialsPassword);

      setEmailPassword({ ...emailPassword, email: email, password: password });
      setRemember(true);
    }
  }, []);

  const handleSignIn = async () => {
    dispatch(mainLoad(true));

    if (!emailPassword?.email || !emailPassword?.password) {
      toast.error("Please fill out all required fields.");
      dispatch(mainLoad(false));
      return;
    }

    const data = await api.getUserData({ user_id: emailPassword?.email });

    if (!data?.user) {
      toast.error("User not found. Please sign up to create an account.");
      dispatch(mainLoad(false));
      props.setOpenLogin(false);
      props.setOpenSignUp(true);
      props?.setOpen(false);
      return;
    }

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password
      );

      toast.success("Success Login");
      authCookiesSet(userCredential?.user?.uid);
      router.push(`${router.pathname}`);

      if (remember) {
        Cookies.set(
          "rememberMeCredentialsEmail",
          encryptData(emailPassword.email),
          { expires: 30 }
        );
        Cookies.set(
          "rememberMeCredentialsPassword",
          encryptData(emailPassword.password),
          { expires: 30 }
        );
      } else {
        Cookies.remove("rememberMeCredentialsEmail");
        Cookies.remove("rememberMeCredentialsPassword");
      }
      dispatch(mainLoad(false));
      window.location.reload();
    } catch (error: any) {
      dispatch(mainLoad(false));
      toast.error(error?.code.split("auth/")[1]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div>
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          textAlign: "center",
          color: "#1C3048",
          fontWeight: "600",
          p: "35px 30px 5px ",
          fontSize: "24px",
        }}
        className=" max-2sm:text-[18px]"
      >
        <Button
          onClick={props?.handleClose}
          className="min-w-[auto] relative left-[-10px] top-[-3px] max-sm:left-[-3px]"
          sx={{ display: props?.handleClose ? "inline-block" : "none" }}
        >
          <Icons.leftArrowIcon />
        </Button>
        {"Welcome Back to CraftyArt!"}
      </DialogTitle>
      <DialogContent sx={{ padding: "35px" }}>
        <DialogContentText
          sx={{ color: "#1C3048", fontSize: "14px", textAlign: "center" }}
        >
          It sure is great to see you again.
        </DialogContentText>
        <LoginPlatform />
        <Box className="flex items-center justify-between">
          <Box className="w-[45%] h-[1px] bg-[#ABB2C7]"></Box>
          <Typography className="text-black">or</Typography>
          <Box className="w-[45%] h-[1px] bg-[#ABB2C7]"></Box>
        </Box>

        <Box className="flex flex-col gap-4 my-5">
          <Input
            label="Email"
            value={emailPassword?.email}
            onChange={(e: any) =>
              setEmailPassword({
                ...emailPassword,
                email: e.target.value,
              })
            }
          />
          <Password
            label="Password"
            value={emailPassword?.password}
            onChange={(e: any) =>
              setEmailPassword({
                ...emailPassword,
                password: e.target.value,
              })
            }
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box className="flex items-start mb-6">
          <Box
            className="flex justify-between items-center"
            sx={{ minWidth: { xs: "100%", sm: "380px" } }}
          >
            <Box className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 text-[15px]"
                required
              />
              <label className="ml-2 text-sm font-medium text-black   max-2sm:text-[13px]">
                Remember me
              </label>
            </Box>

            <Typography
              className="text-[#5961F8] cursor-pointer text-[14px]  max-2sm:text-[13px]"
              onClick={() => props?.setForgot(true)}
            >
              Forgot your Password?
            </Typography>
          </Box>
        </Box>

        <Button
          sx={{
            textTransform: "unset",
            fontSize: "14px",
            fontWeight: "400",
            color: "white",
            whiteSpace: "nowrap",
            opacity: "1",
            width: "100%",
            borderRadius: "8px",
            padding: "12px 10px",
          }}
          className="bg_linear"
          onClick={handleSignIn}
        >
          Log in
        </Button>

        <Typography className="text-black text-center my-2  max-2sm:text-[13px]">
          New to CraftyArt?
          <span
            className="text-[#5961F8] cursor-pointer"
            onClick={() => {
              if (props.setOpenLogin && props.setOpenSignUp && props?.setOpen) {
                props.setOpenLogin(false);
                props.setOpenSignUp(true);
                props?.setOpen(false);
              } else router.push("/signup");
            }}
          >
            Create an account
          </span>
        </Typography>
      </DialogContent>
    </div>
  );
}
