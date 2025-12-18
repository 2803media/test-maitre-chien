import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test Maître-Chien - Compatibilité",
  description: "Découvrez la compatibilité entre vous et votre chien",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
