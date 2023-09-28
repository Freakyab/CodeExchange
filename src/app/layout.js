"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "./context/session";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeExchange",
  description: "Platform to share code snippets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId="890009287717-ebtr62n0sv4mf3gn84p1su46d8a7hlcq.apps.googleusercontent.com">
          <Provider children={children}>
            <link rel="stylesheet" href={inter.stylesheet} />
            {children}
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
