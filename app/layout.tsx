import type { Metadata } from "next";
import { Pixelify_Sans, Jersey_15, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ErrorComponent from "../src/components/ErrorComponent";
import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import { ErrorProvider } from "@/src/context/ErrorContext";
import SidebarMenu from "../src/components/SidebarMenu/SidebarMenu";
import {isAuthenticated} from "@/src/lib/auth";

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
    variable: "--font-pixelify-sans",
});

const jersey15 = Jersey_15({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-jersey-15",
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "GAMODOO",
  icons: "/logo/full_logo.png"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const isLoggedIn = await isAuthenticated();

  return (
    <html lang="fr">
      <body
        className={`${pixelifySans.variable} ${jersey15.variable} ${sourceCodePro.variable} antialiased`}
      >
        <AuthProvider>
          <ErrorProvider>
            {
              isLoggedIn ?
              <>
                  <Header />
                  <br/>
                <div className="grid grid-cols-[auto_1fr] h-screen gap-0">

                    <div className="col-start-1 col-end-2">
                        <SidebarMenu/>
                    </div>
                  <div className="col-start-2 col-end-3">
                    {children}
                  </div>
                </div>
              </> :
              <>
                <Header />

                  {children}
              </>
            }
            <ErrorComponent />
            <Footer />
          </ErrorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
