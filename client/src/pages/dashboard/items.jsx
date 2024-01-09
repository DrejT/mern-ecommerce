import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { boolean, number, object, string } from "yup";
import ax from "../../utils/axios";
import { useState } from "react";
import {
  DashboardItem,
  DashboardItemDelete,
  DashboardItemEdit,
} from "../../components/item.dashboard";
import { SelectStore } from "../../components/store.dashboard";

export const itemNameSchema = string()
  .min(3, "minimum 3 characters")
  .max(100, "maximum 100 characters");

export const itemDescriptionSchema = string()
  .min(10, "minimum 10 characters")
  .max(250, "maximum 250 characters");
export const itemSaleSchema = number()
  .min(0, "cannot be lower than 0%")
  .max(100, "cannot exceed 100%");
export const itemPriceSchema = number().min(0, "cannot be negative");
export const itemQuantitySchema = number()
  .min(0, "cannot be less than 0")
  .integer("sould be an integer");
export const itemOnShelfSchema = boolean();

const itemValidationSchema = object().shape({
  name: itemNameSchema.required("item name is required"),
  description: itemDescriptionSchema.required("item description is required"),
  sale: itemSaleSchema.required("sale percent is required"),
  price: itemPriceSchema.required("price is required"),
  quantity: itemQuantitySchema.required("quantity is required"),
  onShelf: itemOnShelfSchema,
});

export function ItemSelection({ setStoreSelection, storeSelection }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newItemObj) => {
      return ax.post("/admin/item", newItemObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      sale: 0,
      price: 0,
      quantity: 0,
      onShelf: false,
    },
    validationSchema: itemValidationSchema,
    onSubmit: async function (value) {
      try {
        const formdata = new FormData();
        formdata.append("name", value.name);
        formdata.append("description", value.description);
        formdata.append("storeId", storeSelection);
        formdata.append("itemImage", itemImage);
        formdata.append("sale", value.sale);
        formdata.append("price", value.price);
        formdata.append("quantity", value.quantity);
        formdata.append("onShelf", value.onShelf);
        const res = await mutation.mutateAsync(formdata);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [itemImage, setItemImage] = useState("");
  console.log(itemImage);
  return (
    <>
      <div className="">
        <SelectStore
          storeSelection={storeSelection}
          setStoreSelection={setStoreSelection}
        />
        <button
          className="btn btn-primary"
          style={{ width: "100px" }}
          data-bs-toggle="modal"
          data-bs-target="#itemFormModal"
        >
          new Item
        </button>

        <div
          className="modal fade"
          id="itemFormModal"
          tabIndex="-1"
          aria-labelledby="itemFormModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-lg modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="itemFormModal">
                  create new Store
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <form
                    action=""
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="col">
                      <label htmlFor="name" className="input-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        className="form-control"
                        placeholder="my store"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <small className="error-message">
                          {formik.errors.name}
                        </small>
                      ) : null}
                    </div>
                    <div className="col">
                      <label htmlFor="description" className="input-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="A great place to hangout"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <small className="error-message">
                          {formik.errors.description}
                        </small>
                      ) : null}
                    </div>
                    <div className="col">
                      <label htmlFor="itemImage" className="form-label">
                        Images
                      </label>
                      <input
                        type="file"
                        id="itemImage"
                        name="itemImage"
                        className="form-control"
                        // accept="image/*"
                        onChange={(e) => setItemImage(e.target.files[0])}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.itemImage}
                        required
                      />
                      {/* {formik.touched.itemImage && formik.errors.itemImage ? (
                        <small className="error-message">
                          {formik.errors.itemImage}
                        </small>
                      ) : null} */}
                    </div>

                    <div className="col">
                      <label htmlFor="sale" className="input-label">
                        Sale
                      </label>
                      <input
                        type="number"
                        id="sale"
                        name="sale"
                        autoComplete="name"
                        className="form-control"
                        placeholder="my store"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sale}
                      />
                      {formik.touched.name && formik.errors.sale ? (
                        <small className="error-message">
                          {formik.errors.sale}
                        </small>
                      ) : null}
                    </div>

                    <div className="col">
                      <label htmlFor="price" className="input-label">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        autoComplete="name"
                        className="form-control"
                        placeholder="my store"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <small className="error-message">
                          {formik.errors.price}
                        </small>
                      ) : null}
                    </div>

                    <div className="col">
                      <label htmlFor="quantity" className="input-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        autoComplete="name"
                        className="form-control"
                        placeholder="my store"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                      />
                      {formik.touched.quantity && formik.errors.quantity ? (
                        <small className="error-message">
                          {formik.errors.quantity}
                        </small>
                      ) : null}
                    </div>

                    <div className="col">
                      <label
                        htmlFor="onShelf"
                        className="input-label form-check-label"
                      >
                        On Shelf?
                        <input
                          type="checkbox"
                          id="onShelf"
                          name="onShelf"
                          autoComplete="name"
                          className="form-control form-check-input"
                          placeholder="my store"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.onShelf}
                          // style={{width:"10px",height:"10px"}}
                        />
                      </label>

                      {formik.touched.onShelf && formik.errors.onShelf ? (
                        <small className="error-message">
                          {formik.errors.quantity}
                        </small>
                      ) : null}
                    </div>

                    <div>
                      {mutation.isPending ? (
                        <>
                          <small>creating new item...</small>
                        </>
                      ) : mutation.isError ? (
                        <>
                          <small>{mutation.error.message}</small>
                        </>
                      ) : mutation.isSuccess ? (
                        <>
                          <small>created item successfully</small>
                        </>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary my-2"
                      data-bs-dismiss={"modal"}
                      disabled={formik.isSubmitting}
                    >
                      Create
                    </button>
                    {/* <div className="modal-footer"> */}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    {/* </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemContent({ storeSelection }) {
  // const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    staleTime: 30000,
  });
  async function fetchItems() {
    try {
      console.log("sending req", storeSelection);
      const items = await ax.get("/admin/item/");
      return items;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {status === "pending" ? (
        <>
          <p>loading...</p>
        </>
      ) : status === "error" && storeSelection ? (
        <>
          <p>An error occured while fetching items</p>
        </>
      ) : typeof data.data === "string" ? (
        <>No stores to fetch data from </>
      ) : (
        data?.data?.map((obj) => {
          if (storeSelection === obj.storeId) {
            return (
              <div key={obj._id} className="col col-md-3 col-12 p-0 m-2">
                <div
                  className="p-2 border border-primary rounded-2"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#${obj.slug}`}
                >
                  <h5 className="">{obj.name}</h5>
                  <p>
                    description: {obj.description.slice(0, 10)}
                    <br />
                    price: {obj.price}
                    <br />
                    on shelf: {obj.onShelf ? "yes" : "no"}
                    <br />
                    quantity: {obj.quantity}
                  </p>
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-target={`#${obj.slug}Edit`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#${obj.slug}Delete`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <DashboardItemEdit itemObj={obj} />
                <DashboardItemDelete itemObj={obj} />
                <DashboardItem itemObj={obj} />
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </>
  );
}
