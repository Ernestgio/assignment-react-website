import { NavLink } from "react-router-dom";

import "./index.scss";

export default function Navbar() {
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <li className="nav__item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/transfer" className="nav-link">
                Transfer
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/topup" className="nav-link">
                Top Up
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
