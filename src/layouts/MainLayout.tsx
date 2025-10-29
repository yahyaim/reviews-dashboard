import { ReactNode } from "react";
import styles from "../styles/MainLayout.module.css";

type Props = {
  children: ReactNode;
  pageTitle?: string;
};

export default function MainLayout({ children, pageTitle }: Props) {
  return (
    <div className={styles.page}>
      {/* Top Navigation */}
      <header className={styles.navbar}>
        <div className={styles.logoGroup}>
          <img src="/logo.png" alt="Flex Living logo" className={styles.logo} />
          <span className={styles.brand}>Flex Living</span>
        </div>

        <nav className={styles.navLinks}>
          <a className={styles.link} href="#">Dashboard</a>
          <a className={styles.link} href="#">Listings</a>
          <a className={`${styles.link} ${styles.active}`} href="#">Reviews</a>
          <a className={styles.link} href="#">Team</a>
          <a className={styles.link} href="#">Settings</a>
        </nav>

        <div className={styles.profile}>
          <img src="/avatar.png" alt="Profile" className={styles.avatar} />
        </div>
      </header>

      {/* Centered Content Container */}
      <main className={styles.content}>
        {pageTitle ? <h1 className={styles.pageTitle}>{pageTitle}</h1> : null}
        {children}
      </main>
    </div>
  );
}
