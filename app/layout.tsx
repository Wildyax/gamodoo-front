import type { Metadata } from "next";
import { Pixelify_Sans, Jersey_15, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { AuthProvider } from "../src/context/AuthContext";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${pixelifySans.variable} ${jersey15.variable} ${sourceCodePro.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
            {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
