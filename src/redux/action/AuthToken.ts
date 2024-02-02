import { decryptData, encryptData } from "@/src/aes-crypto";
import Cookies from "js-cookie";

export const authCookiesSet = (value: string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // Cookies.set("_sdf", encryptData(value), {
  //   domain: ".craftyartapp.com",
  //   expires: expirationDate,
  // });

  Cookies.set("_sdf", encryptData(value), { expires: expirationDate });
};

export const authCookiesGet = () => {
  const value = Cookies.get("_sdf");
  return decryptData(value);
};

export const userPremium = (value: string) => {
  // Cookies.set("_pmf", encryptData(value), {
  //   domain: ".craftyartapp.com",
  // });
  Cookies.set("_pmf", encryptData(value));
};

export const userPremiumGet = () => {
  const premium = decryptData(Cookies.get("_pmf"));
  if (premium) {
    return premium === "1";
  }
  return false;
};

export const setCC = (value: string) => {
  Cookies.set("cc", encryptData(value));
};

export const getCC = () => {
  const value = Cookies.get("cc");
  return decryptData(value);
};
