import { Link } from "react-router-dom";


export function ItemCard({ itemObj, storeObj }) {
  return (
    <div className="">
      <Link to={`s/${storeObj.name}/i/${itemObj.name}`}>
        <div className="item-card p-2 text-align-center">
          <img src="" alt="" style={{ width: "150px", height: "150px" }} />
          <p className="">{itemObj.name}</p>
        </div>
      </Link>
    </div>
  );
}
