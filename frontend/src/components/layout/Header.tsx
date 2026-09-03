import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">HRMS</div>
      <nav className="app-header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "is-active" : undefined)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/lead-enquiries"
          className={({ isActive }) => (isActive ? "is-active" : undefined)}
        >
          Lead enquiries
        </NavLink>
      </nav>
    </header>
  );
}
