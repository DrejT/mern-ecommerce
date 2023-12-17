// import "./navbar.styles.css";

import { Link, NavLink, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Company Name
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="pricing">
                  Pricing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                {location.pathname === "/register" ? (
                  <NavLink className="nav-link" to="login">
                    Login
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="register">
                    Sign Up
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
