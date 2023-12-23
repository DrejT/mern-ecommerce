import "./dashboard.style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { OrderSection, ReviewSection, SettingSection } from "./activeStatus";
import { StoreModalForm, Store } from "./stores";
import Item from "./items";
import ItemSelection from "./items";

export default function Dashboard() {
  const [currentlyActive, setCurrentlyActive] = useState("store");
  return (
    <>
      <div className="container-fluid p-5">
        <div className="row p-0 m-0">
          <div id="return" className="col p-0">
            <Link className="menu-button text-center" to="/">
              back
            </Link>
          </div>
          <div className="col-10">
            <h3>Admin Dashboard</h3>
          </div>
          <div className="col p-0">
            <button className="menu-button text-center py-3 px-3 w-100">
              settings
            </button>
          </div>
          <div id="menu" className="row text-center p-0 m-0">
            <DashboardMenu
              setCurrentlyActive={setCurrentlyActive}
              currentlyActive={currentlyActive}
            />
          </div>
          <div id="Selection" className="row  m-0">
            <Selection currentlyActive={currentlyActive} />
          </div>
          <div id="content" className="col">
            <DashboardContent currentlyActive={currentlyActive} />
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardMenu({ setCurrentlyActive, currentlyActive }) {
  function handleClick(e) {
    setCurrentlyActive(e.currentTarget.id);
  }
  return (
    <>
      <div className="col p-0 button-container">
        <button
          id="store"
          onClick={handleClick}
          className={`menu-button ${
            currentlyActive == "store" ? "active-link" : ""
          }`}
        >
          Store
        </button>
      </div>
      <div className="col p-0 button-container">
        <button
          id="items"
          onClick={handleClick}
          className={`menu-button ${
            currentlyActive == "items" ? "active-link" : ""
          }`}
        >
          Items
        </button>
      </div>
      <div className="col p-0 button-container">
        <button
          onClick={handleClick}
          id="orders"
          className={`menu-button ${
            currentlyActive === "orders" ? "active-link" : ""
          }`}
        >
          Orders
        </button>
      </div>
      <div className="col p-0 button-container">
        <button
          onClick={handleClick}
          id="reviews"
          className={`menu-button ${
            currentlyActive === "reviews" ? "active-link" : ""
          }`}
        >
          Reviews
        </button>
      </div>
    </>
  );
}

function DashboardContent({ currentlyActive }) {
  switch (currentlyActive) {
    case "items":
      return <></>;
    case "orders":
      return <OrderSection />;
    case "reviews":
      return <ReviewSection />;
    case "settings":
      return <SettingSection />;
    default:
      return <Store />;
  }
}

function Selection({ currentlyActive }) {
  switch (currentlyActive) {
    case "items":
      return <ItemSelection />;
    case "orders":
      return <></>;
    case "reviews":
      return <></>;
    case "settings":
      return <></>;
    default:
      return <StoreModalForm />;
  }
}