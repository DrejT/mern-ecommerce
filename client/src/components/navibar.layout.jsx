import "./navibar.styles.css";

import { Link, NavLink, redirect, useLocation } from "react-router-dom";
import { useAuth } from "../utils/authcontext";
import ax from "./../utils/axios";

export default function NavigationBar() {
  const { setIsLoggedIn, isLoggedIn, authUser, setAuthUser } = useAuth();
  console.log("logged in ?", isLoggedIn, authUser);
  const location = useLocation();
  async function handleLogout() {
    try {
      const res = await ax.delete("/auth/logout");
      setIsLoggedIn(false);
      setAuthUser(null);
      console.log(res);
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
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
                {isLoggedIn === true && authUser.role === "user" ? (
                  <>
                    <NavLink className="nav-link" to={"/u/"+authUser.username}>
                      {authUser.username}
                    </NavLink>
                  </>
                ) : isLoggedIn === true ? (
                  <>
                    <NavLink className="nav-link" to="/dashboard">
                      {authUser.username}
                    </NavLink>
                  </>
                ) : location.pathname === "/register" ? (
                  <NavLink className="nav-link" to="login">
                    Login
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="register">
                    Sign Up
                  </NavLink>
                )}
              </li>
              {isLoggedIn === true ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
