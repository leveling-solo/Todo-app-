import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Home from "./page";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactElement } from "react";
import AuthProvider from "@/providers/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement<Element> {
  return (
    <html lang="en">
      {" "}
      <body className={inter.className}>
        <AuthProvider>
          <div className="bg-[#252222] text-white h-screen flex ">
            <div>
              <Sidebar />
            </div>

            <div className="w-[80%]">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
