import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useParams, useResolvedPath } from "react-router-dom";
import { ItemCard } from "../components/itemcard.home";
import ax from "../utils/axios";

export default function Store() {
  const { pathname } = useResolvedPath();
  return (
    <>
      <div className="container">
        {pathname.split("item").length === 1 ? (
          <>
            <DisplayStore />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

function DisplayStore() {
  const params = useParams();
  const { status, data, error } = useQuery({
    queryKey: [params.storeslug],
    queryFn: fetchStore,
    staleTime: 30000,
  });
  async function fetchStore() {
    try {
      const res = await ax.get(`/user/store/${params.storeslug}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {status === "pending" ? (
        <>Loading</>
      ) : (
        <>
          <div className="row py-2 mt-3">
            <h4>{data.name}</h4>
            <p>{data.description}</p>
          </div>
          <div className="row">
            {data.items.map((itemObj) => {
              if (itemObj.onShelf) {
                return (
                  <div
                    key={itemObj._id}
                    className="col col-md-3 col-12 d-flex justify-content-center"
                  >
                    <ItemCard itemObj={itemObj} storeObj={data} />
                  </div>
                );
              } else {
                return <>this store has no items</>;
              }
            })}
          </div>
        </>
      )}
    </>
  );
}
