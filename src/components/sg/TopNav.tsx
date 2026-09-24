import { NavLink } from "react-router-dom";

export function TopNav() {
  return (
    <header className="sg-topnav">
      <div className="sg-topnav__inner">
        <span className="sg-topnav__brand">JOLEEN</span>
        <nav className="sg-topnav__links" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sg-topnav__link${isActive ? " is-active" : ""}`
            }
          >
            Resume
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `sg-topnav__link${isActive ? " is-active" : ""}`
            }
          >
            Portfolio
          </NavLink>
        </nav>
        <span className="sg-topnav__accent" aria-hidden="true">🎋</span>
      </div>
    </header>
  );
}
