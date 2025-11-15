import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter,Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AdjustmentsProvider } from "@/lib/adjustmentsStore";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const  instrumentSerif = Instrument_Serif(
  {
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
  }
)

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cotton Cloud",
  description: "An video and image prettify app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${inter.variable}  antialiased`}
      >
        <AdjustmentsProvider>
          {children}
        </AdjustmentsProvider>
      </body>
    </html>
  );
}

