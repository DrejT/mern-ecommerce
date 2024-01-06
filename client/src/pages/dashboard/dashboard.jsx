import "./dashboard.style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StoreModalForm, Store } from "./stores";
// import Item from "./items";
import { ItemSelection, ItemContent } from "./items";
import { OrderSelection, Orders } from "./orders";
import { ReviewSelection, Reviews } from "./reviews";

export default function Dashboard() {
  const [currentlyActive, setCurrentlyActive] = useState("store");
  const [storeSelection, setStoreSelection] = useState("");
  const [itemSelection, setItemSelection] = useState("");
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
          <div id="Selection" className="col col-12 m-0">
            <Selection
              currentlyActive={currentlyActive}
              storeSelection={storeSelection}
              setStoreSelection={setStoreSelection}
              itemSelection={itemSelection}
              setItemSelection={setItemSelection}
            />
          </div>
          <div id="content" className="col">
            <div className="row p-0">
              <DashboardContent
                currentlyActive={currentlyActive}
                storeSelection={storeSelection}
                itemSelection={itemSelection}
              />
            </div>
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

function DashboardContent({ currentlyActive, storeSelection, itemSelection }) {
  switch (currentlyActive) {
    case "items":
      return <ItemContent storeSelection={storeSelection} />;
    case "orders":
      return <Orders storeSelection={storeSelection} />;
    case "reviews":
      return <Reviews itemSelection={itemSelection} />;
    case "settings":
      return <SettingSection />;
    default:
      return <Store />;
  }
}

function Selection({
  currentlyActive,
  setStoreSelection,
  storeSelection,
  itemSelection,
  setItemSelection,
}) {
  switch (currentlyActive) {
    case "items":
      return (
        <ItemSelection
          setStoreSelection={setStoreSelection}
          storeSelection={storeSelection}
        />
      );
    case "orders":
      return (
        <OrderSelection
          setStoreSelection={setStoreSelection}
          storeSelection={storeSelection}
        />
      );
    case "reviews":
      return (
        <ReviewSelection
          setStoreSelection={setStoreSelection}
          storeSelection={storeSelection}
          itemSelection={itemSelection}
          setItemSelection={setItemSelection}
        />
      );
    case "settings":
      return <></>;
    default:
      return <StoreModalForm />;
  }
}

export function ReviewSection() {
  return <></>;
}

export function SettingSection() {
  return <></>;
}
