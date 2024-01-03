import { useState } from "react";
import { useLocation } from "react-router-dom";
import ax from "../utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Profile() {
  const location = useLocation();
  const usernameParam = location.pathname.split("/u/")[1];
  const [currentActive, setCurrentActive] = useState("orders");
  const { status, data, error } = useQuery({
    queryKey: ["visitUser"],
    queryFn: fetchUserByUsername,
    staleTime: 30000,
  });

  async function fetchUserByUsername() {
    try {
      const res = await ax.get(`/user/${usernameParam}`, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12 fs-4">
            {data ? data.data?.username : "user does not exist"}
          </div>
          <div className="col col-6 p-0 button-container">
            <button
              id="orders"
              className="menu-button"
              onClick={(e) => setCurrentActive(e.currentTarget.id)}
            >
              Orders
            </button>
          </div>
          <div className="col col-6 p-0 button-container">
            <button
              id="reviews"
              className="menu-button"
              onClick={(e) => setCurrentActive(e.currentTarget.id)}
            >
              Reviews
            </button>
          </div>
          <Content currentActive={currentActive} />
        </div>
      </div>
    </>
  );
}

function Content({ currentActive }) {
  switch (currentActive) {
    case "orders":
      return <Orders />;
    case "reviews":
      return <Reviews />;
    default:
      break;
  }
}

function Orders() {
  const { status, data, error } = useQuery({
    queryKey: ["visitUserOrders"],
    queryFn: fetchUserByUsername,
    staleTime: 30000,
  });

  async function fetchUserByUsername() {
    try {
      const res = await ax.get("/user/order", { withCredentials: true });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  return <>order</>;
}

function Reviews() {
  return <>reviews</>;
}
