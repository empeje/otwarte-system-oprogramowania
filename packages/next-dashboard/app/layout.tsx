import type {Metadata} from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

import React from "react";
import SidebarLayout from "@/components/sidebar/sidebar-layout";

const data = {
  title: 'Title Dashboard Admin',
  content: 'Content Dashboard Admin',
};

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: data.content,
  openGraph: {
    title: data.title,
    description: data.content,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: data.content,
    images: [
      {
        url: "http://localhost:3000/vercel.svg",
        width: 500,
        height: 500,
      },
    ],
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
    <body className={`${inter.variable} antialiased h-full bg-white`} suppressHydrationWarning={true}>
    <SidebarLayout>
      {children}
    </SidebarLayout>
    </body>
    </html>
  );
}
