import "./navbar.style.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light navbar-expand-lg fixed-top shadow-sm bg-white">
        <a href="" className="navbar-brand px-4 fs-1 fw-bold">
          DrejT
        </a>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbarSupportedContent"
          className="d-flex justify-content-end collapse navbar-collapse"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Resources
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>
          <div className="navbar-text ml-lg-3 px-2">
            <a href="#" className="btn btn-primary text-white px-3 py-2">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
