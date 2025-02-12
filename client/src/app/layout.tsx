import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import styles from "./layout.module.css"
import "./globals.css";

const MPLUSRounded1C = M_PLUS_Rounded_1c({
  weight: "400",
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
      <body className={`${MPLUSRounded1C.className}`}>

        <header>
          <div className={styles.upperHeader}>
            <div className={styles.headerLogoWrapper}>
              <a href="/">
                <img src="./SalTrac_logo.png" className={styles.headerLogo} alt="header-logo" />
              </a>
            </div>
            <nav className={styles.upperNav}>
              <ul className={styles.listWrapper}>
                <li className={styles.navItem}><a href="/">Home</a></li>
                <li className={styles.navItem}><a href="/about">About</a></li>
                <li className={styles.navItem}><a href="/logout">Logout</a></li>
              </ul>
            </nav>
          </div>
          <div className={styles.lowerHeader}>
            <nav className={styles.lowerNav}>
              <ul className={styles.listWrapper}>
                <li className={styles.navItem}><a href="/search">Search</a></li>
                <li className={styles.navItem}><a href="/post">Post</a></li>
                <li className={styles.navItem}><a href="/profile">Profile</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
