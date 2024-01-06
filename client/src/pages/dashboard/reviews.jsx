import { useQuery } from "@tanstack/react-query";
import { SelectStore } from "../../components/store.dashboard";
import ax from "../../utils/axios";

export function Reviews({ itemSelection }) {
  const { data, error, status } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 30000,
  });
  async function fetchReviews() {
    try {
      const res = await ax.get("/admin/review/");
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
          data?.map((reviewObj) => {
            if (itemSelection === reviewObj.item) {
              return (
                <div
                  key={reviewObj._id}
                  className="border border-primary rounded-3 m-2 p-2"
                >
                  <p>{reviewObj.comment}</p>
                  rating: {reviewObj.rating}
                  <p>{reviewObj.username}</p>
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
}

export function ReviewSelection({
  setStoreSelection,
  storeSelection,
  itemSelection,
  setItemSelection,
}) {
  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await ax.get("/admin/item");
      return res.data;
    },
  });
  return (
    <>
      <div>
        <SelectStore
          setStoreSelection={setStoreSelection}
          storeSelection={storeSelection}
        />
        <SelectItem
          storeSelection={storeSelection}
          setItemSelection={setItemSelection}
          itemSelection={itemSelection}
          items={data}
        />
      </div>
    </>
  );
}

export function SelectItem({
  storeSelection,
  items,
  itemSelection,
  setItemSelection,
}) {
  return (
    <>
      <select name="" onChange={(e) => setItemSelection(e.target.value)}>
        <option value="">select an item</option>
        {items?.length > 0 ? (
          <>
            {items?.map((itemObj) => {
              if (storeSelection === itemObj.storeId) {
                return (
                  <option key={itemObj._id} value={itemObj._id}>
                    {itemObj.name}
                  </option>
                );
              }
            })}
          </>
        ) : null}
      </select>
    </>
  );
}
