import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

import Header from "@/components/Header";
import ClientProviders from "@/components/ClientProviders";
import ClearFiltersOnPageChange from "@/components/ClearFiltersOnPageChange";

export const metadata: Metadata = {
  title: {
    template: "%s | Momentum",
    default: "Momentum",
  },
};

const firaGo = localFont({
  src: [
    {
      path: "../../public/fonts/FiraGO-ExtraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-Book.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraGO-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-firago",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaGo.variable}>
      <ClientProviders>
        <body className="">
          <ClearFiltersOnPageChange />
          <Header />
          <main className="max-w-[1920px] mx-auto px-[120px]">{children}</main>
        </body>
      </ClientProviders>
    </html>
  );
}
