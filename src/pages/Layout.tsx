import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import api from "../clientApi/api";
import { saveCardData } from "../redux/reducer/AuthDataReducer";
import { authCookiesGet, setCC } from "@/src/redux/action/AuthToken";

const FooterImport = dynamic(() => import("@/src/components/footer/Footer"));
const HeaderImport = dynamic(() => import("@/src/components/header/Header"));
const IndexImport = dynamic(() => import("@/src/private/Index"));
const MobileBottomBarImport = dynamic(
  () => import("@/src/components/common/MobileBottomBar")
);

interface HomeProps {
  children: React.ReactNode;
}

export default function Home(props: HomeProps) {
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
      api.getCountryCode({ ip: res?.ip }).then((response) => {
        setCC(response?.countryCode);
      });
    });

    api.cardList().then((res) => {
      dispatch(saveCardData(res?.data?.data));
    });
  }, [dispatch]);

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
              className="main bg-[#00000081]"
              style={{ zIndex: "555555555555555555555555" }}
            >
              <span className="loader_span"></span>
            </main>
          )}
          {props?.children}

          <Box>
            {!token && router.pathname !== "/s/[searchValue]" && (
              <FooterImport />
            )}
          </Box>
        </Box>
      </Box>

      {token && <MobileBottomBarImport />}
      <IndexImport />
    </Box>
  );
}
