import { useQuery } from "@tanstack/react-query";
import { SelectStore } from "../../components/store.dashboard";
import ax from "../../utils/axios";
import { useState } from "react";

export function Orders({ storeSelection }) {
  const { data, error, status } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 30000,
  });
  async function fetchOrders() {
    try {
      const res = await ax.get(`/admin/order`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        {status === "pending" ? (
          <>loading</>
        ) : status === "error" ? (
          <>there was an error</>
        ) : (
          data?.map((orderObj) => {
            if (storeSelection === orderObj.storeId) {
              return (
                <div
                  key={orderObj._id}
                  className="border border-primary border-rounded rounded-2 p-2 mt-2"
                >
                  <p>user: {orderObj.by.username}</p>
                  <p>email: {orderObj.by.email}</p>
                  <p>item: {orderObj.for.name}</p>
                  <p>state: {orderObj.state}</p>
                  <p>city: {orderObj.city}</p>
                  <p>pincode: {orderObj.pincode}</p>
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
}

export function OrderSelection({ storeSelection, setStoreSelection }) {
  return (
    <>
      <div>
        <SelectStore
          storeSelection={storeSelection}
          setStoreSelection={setStoreSelection}
        />
      </div>
    </>
  );
}
