import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
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
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-[#9DA5B4]" style={{ background: 'hsl(201,100%,6%)' }} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#161B24",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F0F1F5",
            },
          }}
        />
      </body>
    </html>
  );
}
