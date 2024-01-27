import { authCookiesGet, setCC } from "@/src/redux/action/AuthToken";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import api from "../clientApi/api";
import { saveCardData } from "../redux/reducer/AuthDataReducer";

const FooterImport = dynamic(() => import("@/src/components/footer/Footer"));
const HeaderImport = dynamic(() => import("@/src/components/header/Header"));
const IndexImport = dynamic(() => import("@/src/private/Index"));
const MobileBottomBarImport = dynamic(
  () => import("@/src/components/common/MobileBottomBar")
);

export async function getInitialProps(context: any) {
  const cookiesString = context.req.headers.cookie || "";
  const sessionId = extractCookieValue(cookiesString, "_sdf");

  return {
    props: {
      sessionId: sessionId || null,
    },
  };
}

const extractCookieValue = (cookiesString: any, cookieName: any) => {
  const cookieRegex = new RegExp(
    `(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );

  const match = cookiesString.match(cookieRegex);
  return match ? match[1] || null : null;
};

export default function Home(Props: any) {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>("default");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(authCookiesGet());
    }

    api.getIp().then((res) => {
      api.getCountryCode({ ip: res?.ip }).then((response: any) => {
        setCC(response?.countryCode);
      });
    });

    api.cardList().then((res) => {
      dispatch(saveCardData(res?.data?.data));
    });
  }, []);

  useEffect(() => {
    const handleRouteChangeError = () => setLoading(false);
    const handleRouteChangeStart = () => setLoading(false);
    const handleRouteChangeComplete = () =>
      setTimeout(() => {
        setLoading(true);
      }, 300);

    router.events.on("routeChangeError", handleRouteChangeError);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeError", handleRouteChangeError);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <Box>
      <Box>
        <HeaderImport
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Box
          sx={{
            marginLeft: sidebarOpen ? "250px" : "0",
            marginTop: "70px",
          }}
          className={`max-lg:ml-0 ${token && "max-sm:mb-[80px]"} `}
        >
          <div style={{ zIndex: "5000000000000000", position: "fixed" }}>
            <Toaster />
          </div>

          {!loading && (
            <main
              className="main"
              style={{ zIndex: "555555555555555555555555" }}
            >
              <span className="loader_span"></span>
            </main>
          )}
          {Props?.children}

          <Box>{!token && <FooterImport />}</Box>
        </Box>
      </Box>

      {token && <MobileBottomBarImport />}
      <IndexImport />
    </Box>
  );
}
