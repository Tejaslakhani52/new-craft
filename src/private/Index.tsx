import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import {
  EditorTools,
  Product,
  Templates,
} from "@/src/components/header/headerComponents/Menu";
import { authCookiesGet } from "@/src/redux/action/AuthToken";
import { tokenValue } from "@/src/redux/reducer/AuthDataReducer";
import {
  enterAccount,
  mainLoader,
  openSidebar,
} from "@/src/redux/reducer/actionDataReducer";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";

export default function Index() {
  const screenWidth = useScreenWidth();
  const dispatch = useDispatch();
  const router = useRouter();
  const token = authCookiesGet();
  const hasEffectRun = useRef(false);
  const mainLoading = useSelector((state: RootState) => state.actions.mainLoad);

  const productPaths = Product.subName.flatMap((category) =>
    category.allName.map((item) => item.path)
  );

  const editorToolsPaths = EditorTools.subName.flatMap((category) =>
    category.allName.map((item) => item.path)
  );

  const templatesPaths = Templates.subName.flatMap((category) =>
    category.allName.map((item) => item.path)
  );

  useEffect(() => {
    dispatch(mainLoader(true));

    const timeoutId = setTimeout(() => {
      if (!hasEffectRun.current) {
        if (token) {
          if (router?.pathname === "/login" || router?.pathname === "/signup") {
            router.push("/");
          }
          if (
            screenWidth > 991 &&
            router?.pathname !== "/your-account" &&
            router?.pathname !== "/subscriptions" &&
            router?.pathname !== "/about-us" &&
            router?.pathname !== "/aboutus" &&
            !productPaths.includes(router?.pathname) &&
            !editorToolsPaths.includes(router?.pathname) &&
            !templatesPaths.includes(router?.pathname)
          ) {
            dispatch(openSidebar(true));
          }
          dispatch(tokenValue(true));
        } else if (
          router?.pathname === "/your-account" ||
          router?.pathname === "/subscriptions" ||
          router?.pathname === "/draft" ||
          router?.pathname === "/trash" ||
          router?.pathname === "/upload"
        ) {
          router.push("/login");
        }
        hasEffectRun.current = true;
        if (
          !token ||
          productPaths.includes(router?.pathname) ||
          editorToolsPaths.includes(router?.pathname) ||
          templatesPaths.includes(router?.pathname)
        ) {
          dispatch(openSidebar(false));
        }

        setTimeout(() => {
          dispatch(mainLoader(false));
        }, 100);
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [token, screenWidth]);

  useEffect(() => {
    if (
      router?.pathname === "/your-account" ||
      router?.pathname === "/subscriptions" ||
      productPaths.includes(router?.pathname) ||
      editorToolsPaths.includes(router?.pathname) ||
      templatesPaths.includes(router?.pathname)
    ) {
      dispatch(enterAccount(true));
    } else dispatch(enterAccount(false));
  }, [router]);

  return (
    <div>
      {mainLoading && (
        <main className="main" style={{ zIndex: "555555555555555555555555" }}>
          <span className="loader"></span>
        </main>
      )}
    </div>
  );
}
