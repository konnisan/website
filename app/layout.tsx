import type { Metadata } from "next";
import "./globals.css";
import "./assets.css";

export const metadata: Metadata = {
  title: "Konni · 像素炼金工坊",
  description: "Konni 的像素魔法与炼金主题个人主页。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
