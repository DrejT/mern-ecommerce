// import "./navbar.styles.css";

import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pricing">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="register">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
