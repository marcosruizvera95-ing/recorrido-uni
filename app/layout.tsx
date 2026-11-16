import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

// Same typography as uni.edu.py: Poppins for headings/UI, Roboto for body text
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recorrido Virtual UNI",
  description: "Recorrido Virtual por la Universidad Nacional de Itapúa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
