import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { boolean, number, object, string } from "yup";

const itemValidationSchema = object({
  name: string()
    .min(3, "minimum 3 characters")
    .max(100, "maximum 100 characters")
    .required("item name is required"),
  description: string()
    .min(10, "minimum 10 characters")
    .max(250, "maximum 250 characters")
    .required("item description is required"),
  sale: number()
    .min(0, "cannot be lower than 0%")
    .max(100, "cannot exceed 100%")
    .required("sale percent is required"),
  price: number().min(0, "cannot be negative").required("price is required"),
  quantity: number()
    .min(0, "cannot be less than 0")
    .integer("sould be an integer")
    .required("quantity is required"),
  onShelf: boolean(),
});

export default function ItemSelection() {
  const queryClient = useQueryClient();
  const stores = queryClient.getQueryData(["stores"]); // for store selection in option
  const mutation = useMutation({
    mutationFn: (newStoreObj) => {
      return ax.post("/admin/item/", newStoreObj, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
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
  });
  return (
    <>
      <div className="d-inline">
        <select>
          {stores?.data?.map((store) => {
            return (
              <option key={store._id} value={store.name}>
                {store.name}
              </option>
            );
          })}
        </select>
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
                  <form action="" onSubmit={formik.handleSubmit}>
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
                          <small>creating new Store...</small>
                        </>
                      ) : mutation.isError ? (
                        <>
                          <small>{mutation.error.message}</small>
                        </>
                      ) : mutation.isSuccess ? (
                        <>
                          <small>created store successfully</small>
                        </>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary my-2"
                      data-bs-dismiss="modal"
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

function ItemModal() {
  // const {status,data,error} = useQuery({queryKey:"items", })
  return <></>;
}
