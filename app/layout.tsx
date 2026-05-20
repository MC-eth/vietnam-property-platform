import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VietInvest Property | Vietnam Property Investment",
  description:
    "A responsive MVP platform for international buyers investing in Ho Chi Minh City and Hanoi residential property.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
