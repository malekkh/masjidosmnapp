import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "مسجد عثمان بن عفان رضي الله عنه | برقايل - عكار",
  description: "مواقيت الصلاة، الأذكار، القرآن الكريم، والفتاوى لمسجد عثمان بن عفان رضي الله عنه في برقايل - عكار.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
