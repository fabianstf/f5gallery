import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { TopNav } from "~/app/_components/topnav";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "F5 Gallery",
  description: "Test Gallery for some of my lifes highlights",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col gap-4">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
