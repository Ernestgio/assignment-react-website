import { NavLink } from "react-router-dom";

import "./index.scss";

export default function PublicNavbar() {
  return (
    <nav>
      <div className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          DigiWallet
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-bs-target="#publicNavbar"
          aria-controls="publicNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse public__nav" id="publicNavbar">
          <div className="navbar-nav">
            <li className="nav__item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/register">Register</NavLink>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
