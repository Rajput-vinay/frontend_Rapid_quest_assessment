import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Web Clone",
  description: "Chat UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* enables dark mode */}
      <body className="h-dvh w-dvw flex bg-chat-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
