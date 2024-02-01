import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

interface HomeProps {
  sessionId: string | null;
}

const extractCookieValue = (cookiesString: string, cookieName: string) => {
  const cookieRegex = new RegExp(
    `(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );

  const match = cookiesString.match(cookieRegex);
  return match ? match[1] || null : null;
};

const CustomHead = dynamic(() => import("@/src/components/common/CustomHead"));
const Dashboard = dynamic(
  () => import("@/src/components/Home/dashboard/Dashboard")
);
const LandingPage = dynamic(
  () => import("@/src/components/Home/landingPage/LandingPage")
);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const cookiesString = context.req.headers.cookie || "";
  const sessionId = extractCookieValue(cookiesString, "_sdf");

  return {
    props: {
      sessionId: sessionId || null,
    },
  };
};

export default function Home({ sessionId }: HomeProps) {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  return (
    <main>
      <CustomHead
        image={`${assetsUrl}/w_assets/images/landingPageMainVideo.png`}
        heading={
          "Unlock Your Creative Potential with Our All-in-One Graphic Design Tool"
        }
        text={
          "Our powerful all-in-one graphic design tool that streamlines your creative process. Create stunning designs like invitation, logos, social media posts and more."
        }
      />
      {sessionId ? <Dashboard /> : <LandingPage />}
    </main>
  );
}
