import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ItemCard } from "../components/itemcard.home";

export default function Store() {
  const queryClient = useQueryClient();
  const params = useParams();
  let userStore = queryClient.getQueryData([params.storename]);
  if (!userStore) {
    userStore = queryClient.invalidateQueries({
      queryKey: [params.storename],
      exact: true,
    });
  }
  console.log("userstore is", userStore);
  return (
    <>
      <div className="container">
        <div className="row py-2 mt-3">
          <h4>{userStore.name}</h4>
        </div>
        <div className="row">
          {userStore.items.map((itemObj) => {
            return (
              <div
                key={itemObj._id}
                className="col col-md-3 col-12 d-flex justify-content-center"
              >
                <ItemCard itemObj={itemObj} storeObj={userStore} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// function StoreItems({ itemObj }) {
//   return (
//     <>
//       <div className="col col-md-3 col-12">{itemObj.name}</div>
//     </>
//   );
// }
