import { decryptData, encryptData } from "@/src/aes-crypto";
import Cookies from "js-cookie";

export const authCookiesSet = (value: any) => {
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

export const userPremium = (value: any) => {
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

export function removeUnusedSessions(): void {
  Cookies.remove("_pdf");
}

export function setSessionVal(key: string, val: string): void {
  Cookies.set(key, encryptData(val), { secure: true });
}

export function getSessionVal(
  key: string,
  defaultVal?: string | undefined
): string | undefined {
  return decryptData(Cookies.get(key), defaultVal) || defaultVal;
}

export const setCC = (value: any) => {
  Cookies.set("CC", encryptData(value));
};

export const getCC = () => {
  const value = Cookies.get("CC");
  return decryptData(value);
};
