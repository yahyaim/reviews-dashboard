import { NavLink } from "react-router-dom";
import { cn } from "../lib/cn";

const BRAND_NAME = "Company Living";

const NavBar = () => {
  const cls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex h-9 items-center rounded-md px-3 text-sm transition-colors",
      isActive ? "bg-brand-accent/10 font-semibold text-brand-accent" : "text-slate-700 hover:text-brand-accent"
    );

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-container items-center justify-between gap-3 px-4 md:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-2">
          <span className="h-7 w-7 shrink-0 rounded-md bg-brand-accent" aria-hidden />
          <span className="truncate font-semibold text-brand-text">{BRAND_NAME}</span>
        </NavLink>
        <nav className="flex items-center gap-1" aria-label="Main">
          <NavLink to="/" end className={cls}>
            Dashboard
          </NavLink>
          <NavLink to="/testimonials" className={cls}>
            Testimonials
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
