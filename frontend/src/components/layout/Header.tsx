import { NavLink } from "react-router-dom";
import "./Header.css";
import companyLogo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <img
          src={companyLogo}
          alt="Morad Yousuf Behbehani"
          className="app-header__logo"
        />
        <span className="app-header__name">
          Morad Yousuf Behbehani
        </span>
      </div>

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
