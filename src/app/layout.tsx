import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Livestar",
  description: "Seguros y ahorros entre personas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />

      <body className={`${openSans.className} flex h-screen flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
