import store from "@/src/redux/store";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

const LayoutImport = dynamic(() => import("./Layout"));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily} !important;
        }

        body {
          font-family: ${inter.style.fontFamily} !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        input,
        div,
        button,
        ul,
        li {
          font-family: ${inter.style.fontFamily} !important;
          color: "#1C3048";
        }
      `}</style>

      <Provider store={store}>
        <LayoutImport>
          <Component {...pageProps} />
        </LayoutImport>
      </Provider>
    </main>
  );
}
