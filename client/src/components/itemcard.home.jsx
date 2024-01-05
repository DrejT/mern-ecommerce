import { Link, useLocation } from "react-router-dom";

export function ItemCard({ itemObj, storeObj }) {
  const location = useLocation();
  return (
    <div className="">
      <Link
        to={
          location.pathname === "/"
            ? `store/${storeObj.slug}/item/${itemObj.slug}`
            : `item/${itemObj.slug}`
        }
      >
        <div className="item-card p-2 text-align-center">
          <img src="" alt="" style={{ width: "150px", height: "150px" }} />
          <p className="">{itemObj.name}</p>
        </div>
      </Link>
    </div>
  );
}
