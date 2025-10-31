import { Link, useLocation } from "react-router-dom";

/** Unified NavBar — matches Testimonials page */
const NavBar = () => {
  const { pathname } = useLocation();
  const cls = (to: string) =>
    `inline-flex items-center h-9 px-3 rounded-md text-sm no-underline transition-colors ${
      pathname === to
        ? "font-semibold text-[#284e4c]"
        : "hover:text-[#284e4c] text-gray-800"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md" style={{ backgroundColor: "#284e4c" }} />
          <span className="font-semibold text-gray-900">Company Living </span>

        </div>

        <nav className="flex items-center gap-2">
          <Link to="/" className={cls("/")}>Dashboard</Link>
          <Link to="/testimonials" className={cls("/testimonials")}>Testimonials</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
