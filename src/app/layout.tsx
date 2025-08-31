import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Yi He's Blog",
  description: "Sharing research insights, technical thoughts, and explorations in machine learning frontiers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          integrity="sha384-YDiAZ+4xPZgQDTlDNi7A8PTDe4JPBQO5jbpVo59TqKsxG9R3DKZG8LwPfn7Q8PGR"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased text-base sm:text-lg">
        <div className="min-h-screen liquid-bg-animated">
          <Header />
          
          <main className="relative">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
