import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/mode-toggle/theme-provider"

const montserrat = Montserrat({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Reana",
  description:"Advanced Property Analysis Platform - Analyze, predict, and optimize your real estate investments with AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
