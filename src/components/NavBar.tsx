import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          {/* replace with your actual asset */}
          <img src="/logo.svg" alt="Flex Living" className={styles.logo} />
          <span className={styles.title}>Flex Living</span>
        </div>

        <nav className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
          >
            Listings
          </NavLink>
          <NavLink
            to="/reviews"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
          >
            Reviews
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
          >
            Team
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
          >
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
