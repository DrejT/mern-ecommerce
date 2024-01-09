import React from "react";
import Carousel from "../components/carousel.landing";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ax from "../utils/axios";
import { Link } from "react-router-dom";
import { ItemCard } from "../components/itemcard.home";

export default function Home() {
  return (
    <>
      {/* <div>
        <Carousel />
      </div> */}

      <div className="container">
        <ShowStores />
      </div>
    </>
  );
}

function ShowStores() {
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    queryKey: ["userStores"],
    queryFn: fetchGetAllUserStores,
    staleTime: 30000,
  });
  async function fetchGetAllUserStores() {
    try {
      const res = await ax.get("/user/store");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("this is data", data);
  // console.log("this is status", status);
  return (
    <>
      {status === "pending" ? (
        <>loading</>
      ) : status === "success" && data.length === 0 ? (
        <>no stores to display </>
      ) : status === "success" ? (
        data.map(function (storeObj) {
          queryClient.setQueryData([storeObj.slug], storeObj);
          return (
            <div key={storeObj._id} className="row store-row py-2 mt-3">
              <h4>{storeObj.name}</h4>
              <div className="col">
                <div className="container">
                  <div className="row">
                    {storeObj.items.length ? (
                      <>
                        {storeObj?.items?.slice(0, 4).map((itemObj) => {
                          if (itemObj.onShelf) {
                            return (
                              <div
                                key={itemObj.slug}
                                className="col col-md-3 col-12 d-flex justify-content-center"
                              >
                                <ItemCard
                                  itemObj={itemObj}
                                  storeObj={storeObj}
                                />
                              </div>
                            );
                          }
                        })}
                        {storeObj.items.length >= 5 ? (
                          <div className="col-12 d-flex justify-content-center">
                            <Link to={`store/${storeObj.slug}`}>
                              <button className="btn btn-primary p-1 bg-white text-black">
                                see more
                              </button>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <>this store has no items</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : null}
    </>
  );
}
