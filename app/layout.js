import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import MeshGradientBackground from "@/components/MeshGradientBackground";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test Maître-Chien - Compatibilité",
  description: "Découvrez la compatibilité entre vous et votre chien",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="flex flex-col min-h-screen relative">
            <MeshGradientBackground />
            <ThemeToggle className="relative z-10" />
            <main className="flex-1 relative z-10">{children}</main>
            <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-4 relative z-10">
              <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  &copy; {new Date().getFullYear()}{" "}
                  <Link
                    href="https://2803media.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    - 2803 MEDIA
                  </Link>{" "}
                  - Tous droits réservés
                </p>
              </div>
            </footer>
            <Script
              defer
              data-domain="dog.2803.ovh"
              src="https://analytics.2803media.fr/js/script.js"
              strategy="afterInteractive"
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
