import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from '@/components/ModalProvider';
import ToastProvider from '@/components/toast-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projectify",
  description: "Engineers favourite project management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider/>
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
