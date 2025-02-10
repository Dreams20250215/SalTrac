import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "./layout.module.css"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SalTrac",
  description: "健康意識を高めるSNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <header>
          <div className={styles.headerUpper}>
            <div className={styles.headerLogoWrapper}>
              <a href="/">
                <img src="./SalTrac-logo.png" className={styles.headerLogo} alt="header-logo" />
              </a>
            </div>
            <nav className={styles.nav}>
              <ul className={styles.listWrapper}>
                <li className={styles.navItem}><a href="/">Home</a></li>
                <li className={styles.navItem}><a href="/about">About</a></li>
                <li className={styles.navItem}><a href="/contact">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className={styles.headerLower}></div>
        </header>

        {children}
      </body>
    </html>
  );
}
