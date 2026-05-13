import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import Analytics from "@/components/Analytics"; // TODO: Uncomment when GA_ID is configured

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DefiVenezuela — Hub de Blockchain, Web3 & DeFi",
  description:
    "El hub de educación y recursos sobre blockchain, Web3, DeFi e Inteligencia Artificial para Venezuela y la diáspora venezolana.",
  keywords: ["blockchain venezuela", "defi venezuela", "web3 venezuela", "crypto venezuela", "bitcoin venezuela"],
  openGraph: {
    title: "DefiVenezuela — Hub de Blockchain, Web3 & DeFi",
    description: "Aprende, construye y prospera en el ecosistema descentralizado.",
    locale: "es_VE",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <head>
        {/* <Analytics /> TODO: Uncomment when GA_ID is configured */}
      </head>
      <body className="min-h-full flex flex-col bg-[#0D1117] text-[#9DA5B4]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
