import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ItemCard } from "../components/itemcard.home";
import ax from "../utils/axios";

export default function Store() {
  const params = useParams();
  const { status, data, error } = useQuery({
    queryKey: [params.storename],
    queryFn: fetchStore,
    staleTime: 30000,
  });
  async function fetchStore() {
    try {
      const res = await ax.get(`/user/store/${params.storename}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container">
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
                return (
                  <div
                    key={itemObj._id}
                    className="col col-md-3 col-12 d-flex justify-content-center"
                  >
                    <ItemCard itemObj={itemObj} storeObj={data} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
