import Providers from "@/store/providers";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
// import "../../../src/tailwind.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { theme } from "../../../theme";
import "./globals.css";
import "@mantine/dates/styles.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../public/fonts/ExpoArabic-Book.ttf",
});

export const metadata: Metadata = {
  title: "rowad task",
  description: " rowad task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={myFont.className}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Providers>
            <Navbar />
            <ToastContainer
              position="bottom-right"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {children}
            <Footer />
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
